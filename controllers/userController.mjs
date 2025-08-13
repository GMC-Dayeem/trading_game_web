// userController.mjs
import User from '../models/userModel.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { fetchStockData } from '../utils/stockDataFetcher.mjs';



const JWT_SECRET = process.env.JWT_SECRET;

export async function getUserData(req, res) {
  try {
      const { username } = req.params;
      const user = await User.findOne({ username: username }, '-password'); // Exclude the password field
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

export async function register(req, res) {

  try {
    const { username, password, confirmPassword } = req.body;


    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ message: 'username already in use' });
    }
    if (password!=confirmPassword){
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const newUser = new User({
      username,
      password,

    });

    const savedUser = await newUser.save();
    res.status(201).json({ userId: savedUser._id, username: savedUser.username });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



export async function login(req, res) {
    try {

      // console.log(req.body)
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      // console.log(user)

      const isPasswordCorrect = await user.comparePassword(password);
      // console.log(isPasswordCorrect)
      if (!user) {
        return res.status(401).json({ message: 'Invalid email' });
      }
      if (!isPasswordCorrect) {
        console.error('User and password combination incorrect');
        return res.status(401).json({message: 'Invalid credentials'});
      }
    res.status(200).json({ message: 'Login successful' });}
    catch (error) {
      console.error('Login error:', error.message);
      res.status(500).json({ message: error.message });
    }
  }


  export async function logout(req, res) {
    res.status(200).send("Logout Successful");
  }

    
  
export async function buyStock(req, res) {
 
    try {
      const {username} = req.params;
      console.log(username);
      const { symbol, quantity } = req.body;
      console.log(symbol);
      console.log(quantity);
      const stockData = await fetchStockData(symbol);
      console.log(stockData);
      if (!stockData) {
        return res.status(404).send('Stock data not found');
      }
      
      const user = await User.findOne({ username });
      console.log(user.cash)
      if (!user) {
        return res.status(404).send('User not found');
      }

      console.log(stockData);
      const totalCost = quantity * stockData;
      if (totalCost > user.cash) {

        return res.status(400).send('Not enough cash');
      }
      
      user.cash -= totalCost;
      console.log(totalCost);
      const stockIndex = user.portfolio.findIndex(stock => stock.symbol === symbol.toUpperCase());
      
      if (stockIndex !== -1) {
        user.portfolio[stockIndex].quantity += quantity;
        console.log(user.portfolio[stockIndex].purchasePrice);
        user.portfolio[stockIndex].purchasePrice += totalCost;
        console.log(user.portfolio[stockIndex].purchasePrice);
      } else {
        user.portfolio.push({ symbol: symbol.toUpperCase(), quantity, purchasePrice: totalCost });
      }
      
      await user.save();
      res.status(200).json({ message: 'Stock purchased', user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
  export async function sellStock(req, res) {

    try {
      const {username} = req.params
      const { symbol, quantity } = req.body;
      const stockData = await fetchStockData(symbol);
      console.log(stockData);
      
      if (!stockData) {
        return res.status(404).send('Stock data not found');
      }
      
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).send('User not found');
      }
      
      const stock = user.portfolio.find(stock => stock.symbol === symbol.toUpperCase());
      
      if (!stock || stock.quantity < quantity) {
        return res.status(400).send('Not enough stock to sell');
      }
      
      const saleRevenue = quantity * stockData;
      user.cash += saleRevenue;
      stock.quantity -= quantity;
      
      if (stock.quantity === 0) {
        user.portfolio = user.portfolio.filter(stock => stock.quantity > 0);
      }
      
      await user.save();
      res.status(200).json({ message: 'Stock sold', user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
    
  export async function getPortfolio(req, res) {
    try {
      const { username } = req.params;
      const currentUser = await User.findOne({ username });
      if (!currentUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  

      const competitors = await User.find({ _id: { $ne: currentUser._id } });
  
      // Retrieve and format portfolios of competitors
      const competitorPortfolios = await Promise.all(competitors.map(async (competitor) => {
        try {
          if (!competitor){
            return null;
          } 
          if(!competitor.portfolio) {
            return null;
          }
  

          let totalValue = 0;
  

          for (const holding of competitor.portfolio) {

            const currentPrice = await fetchStockPrice(holding.symbol);
            const holdingValue = currentPrice * holding.quantity;
            totalValue += holdingValue;
          }
  
          return {
            userId: competitor._id,
            username: competitor.username,
            portfolioValue: totalValue
          };
  
        } catch (error) {
          console.error('Error processing competitor:', error);
          return null;
        }
      }));
  
      // Filter out null competitor portfolios
      const validCompetitorPortfolios = competitorPortfolios.filter(portfolio => portfolio !== null);
  
      res.status(200).json({ message: 'Competitor portfolios retrieved successfully', competitorPortfolios: validCompetitorPortfolios });
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve competitor portfolios', error: error.toString() });
    }
  }
  