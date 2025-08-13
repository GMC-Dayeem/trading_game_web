// adminController.mjs
import Game from '../models/gameModel.mjs';
import User from '../models/userModel.mjs';
import { fetchStockData } from '../utils/stockDataFetcher.mjs';

// Admin creates a new game
export async function createGame(req, res) {
  try {
    const { name, description, startTime, endTime, initialCash, transactionFee, createdBy } = req.body;

    // Validate the admin user
 
    const adminUser = await User.findOne({username: createdBy});
    console.log(adminUser);
    if (!adminUser) {
      return res.status(404).json({ message: 'Admin user not found' });
    }

    const newGame = new Game({ 
      name, 
      description, 
      startTime, 
      endTime, 
      initialCash, 
      transactionFee, 
      createdBy: adminUser.id
    });

    const savedGame = await newGame.save();
    res.status(201).json(savedGame);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export async function listGames(req, res) {
  try {
    const games = await Game.find().populate('createdBy', 'username');
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



export async function configureGame(req, res) {
    try {
      const { adminId, gameSettings } = req.body;
  
      // Check if admin exists and validate the admin (this is just a placeholder)
      const adminUser = await User.findById(adminId);
      if (!adminUser || !adminUser.isAdmin) {
        return res.status(404).json({ message: 'Admin user not found or not authorized' });
      }
  

      const settingsUpdate = await GameSettings.updateOne({ gameId: gameSettings.gameId }, { $set: gameSettings }, { upsert: true });
  
      res.status(200).json({ message: 'Game settings updated successfully', settings: settingsUpdate });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }



 
  // Admin ends a game manually and declares a winner
  export async function endGame(req, res) {
    try {
      const { gameId } = req.params;
      const game = await Game.findById(gameId).populate('players');
      if (!game) {
        return res.status(404).json({ message: 'Game not found' });
      }
  
      let highestValue = 0;
      let winner = null;
  
      // Collect all promises to fetch the current stock prices
      const portfolioPromises = game.players.map(async player => {
        const portfolioValue = await player.portfolio.reduce(async (totalPromise, stock) => {
          const total = await totalPromise; // Make sure previous value is resolved
          const currentPrice = await fetchStockData(stock.symbol); // Fetch current stock price
          return total + (stock.quantity * currentPrice);
        }, Promise.resolve(player.cash)); // Initial value is a promise resolved with the player's cash
  
        if (portfolioValue > highestValue) {
          highestValue = portfolioValue;
          winner = player;
        }
      });
  
      // Wait for all stock price fetches to complete
      await Promise.all(portfolioPromises);
  
      game.isActive = false;
      await game.save();
  
      res.status(200).json({ message: 'Game ended successfully', winner: winner ? winner.username : 'No winner' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  
  

export default { createGame, listGames, configureGame, endGame };
