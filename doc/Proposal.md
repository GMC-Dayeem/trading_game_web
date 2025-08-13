###### Name: Md Golam Mahmud Chowdhury
###### ID: 202164141
###### Project Proposal - COMP3100 Web Programming

## Web Development of Trading Mania, a stock trading game

## Abstract
In the immersive and entertaining online stock trading game Trading Mania, players strive to become the sharpest stock trader by entering a virtual stock market arena. The game provides a risk-free environment to test your financial skill and advance through the ranks. Players carry out simple buy and sell operations aided by a user-friendly interface and a dynamic leaderboard. Player experience is increased by performance and number of wins. Administrators monitor the competition and guarantee fair play, which amplifies the excitement of this virtual trading experience.

## Player's Perspective
Players maneuver real-time stock prices with a virtual budget in hand, making calculated purchases and sales to optimize the worth of their portfolio where their progress will be tracked on a leaderboard. The game offers a user-friendly interface for viewing portfolio performance, placing buy and sell orders, and getting access to real-time market data. The dashboard contains statistics like their daily gains, the value of their portfolio, holdings, investments etc. The leaderboard showcases top-performing players. Players can join recent or upcoming games, that span for weeks, months, quarters or even years. These games are real experiences that players can learn more about investments and trading.

![Player GUI - Investopedia.com](/images/player.png)
Fig: Player GUI - Investopedia.com

## Admin's Perspective
Administrators create, manage, and virtually fund the game. They have access to a dashboard that allows them to oversee player activities, set game parameters, and can also view analytics, such as player rankings, transaction history, and overall game statistics. The admin interface ensures smooth game operation and the ability to address any issues that may arise. Some players can also be admins. They have a ‘create game’ option that lets them set up a new game and then become the admins of that particular game.

![Admin GUI - Investopedia.com](/images/admin.png)
Fig: Admin GUI - Investopedia.com

## Features

| ID | Name                   | Access By | Short Description                                      | Expected Implementation | Source of Idea                      |
|----|------------------------|-----------|--------------------------------------------------------|-------------------------|------------------------------------|
| 01 | Player Registration    | Player    | Players register for a specific game                    | Must Implement          | Project Instructions               |
| 02 | Game Duration          | Admin     | Configure start/end of each game individually          | Likely to be Done       | Project instructions        |
| 03 | Starting Cash Account  | System    | Provide players with a starting cash account in portfolio | Must Implement       | Project instructions    |
| 04 | Buy and Sell Actions   | Player    | Allow players to buy and sell at current NYSE prices    | Must Implement          | Project instructions   |
| 05 | Portfolio Tracking     | Player    | Keep track of each player's portfolio and its value     | Must Implement          | Project instructions  |
| 06 | Leaderboard        | System    | Show player ranks and declare a winner at the end of the game                 | Must Implement          | Project instructions   |
| 07 | Account settings | Player    | Maintain player login and profile information           | Must Implement          | Project instructions  |
| 08 | Create games   | Admin     | Only admin users can create games                            | Must Implement          | Project instructions|
| 09 | View Competitor's Portfolios | Player | Optional viewing of competitor's portfolios         | Optional Implementation | Project instructions            |
| 10 | Transaction Costs      | Player    | Optional costs for buy/sell transactions (fees)        | Optional Implementation | Project instructions      |
| 11 | Trade Tracking and History        | System    | Tracking all trades and activities of a player during the game | Must Implement | Project instructions         |
| 12 | Game Configuration     | Admin     | Time, starting amount, players selected configuration             | Must Implement          | Project instructions     |
| 13 | Notifications       | Player    | Notify players of important events or updates                 | Can be implement if news and updates are implemented | Self            |
| 14 | Dashboard       | Player, Admin    | Provide users with a comprehensive game dashboard             | Must Implement |   Investopedia     |
| 15 | Chat/Communication Feature  | Player    | Enable players to communicate with each other during the game | Optional Implementation | Self      |
| 16 | News Feed      | System    | Integrate a news feed for relevant market and game updates    | Optional Implementation | moneycontrol.com  |
| 17 | Themes        | Player, Admin    | Allow users to customize the visual theme of their interface  | Optional Implementation | self |
| 18 | In-Game Achievements       | Player    | Display achievements for players based on their performance | Optional Implementation | ChatGpt      |
| 19 | Withdrawal/Exit Mechanism  | Player    | Implement a mechanism for players to withdraw or exit the game | Optional Implementation | self    |
| 20 | Customer Support      | Player    | Offer real-time customer support during the game              | Optional Implementation | Investopedia           |
| 21 | Risk Management Features   | Admin     | Integrate features for risk management in the game            | Optional Implementation | ChatGpt        |
| 22 | Advertisement Features | System | Display advertisements showcasing platform features        | Optional Implementation | Self   |
| 23 | Stock Screener             | Player    | Shows the current best and performing stocks of the player  | An important Implementation | Investopedia    |
| 24 | Calendar Integration | Player    | Integrate an economic calendar for displaying upcoming market events | Optional Implementation | ChatGPT   |
| 25 | Stock Market Algorithms | System | Toolkit to implement algorithms simulating stock market behavior      | Optional Implement | ChatGPT        |
| 26 | Data Encryption | System | Incorporate encryption measures to secure sensitive data      | Must  Implement | ChatGPT       |
| 27 | Daily Stock Tips           | Player    | Offer daily stock tips or recommendations based on market trends | Optional Implementation | moneycontrol.com  |
| 28 | Updates        | Player, Admin | Provide regular updates to the game with new features, improvements, or challenges | Optional Implementation | Self  |
| 29 | Research Resources       | System   | Provide tutorials, articles, and videos to educate players on stock market concepts | Optional Implementation | Investopedia            |
| 30 | Social Trading              | Player    | Feature where players can follow and replicate the trades of successful traders within the game. | Optional Implementation | ChatGPT|

## Tools and Packages
#### Frontend:
- HTML5: Used to structure the content of web pages.
- CSS3: Used for styling HTML elements and enhancing the visual presentation of web pages.
- JavaScript: Enhances interactivity and user experience.

#### Backend:
- Node.js, Express.js

#### Database:
- MongoDB/SQL: Used to store user data and history.

#### Real-time Data:
- WebSocket: Enables full-duplex communication channels over a single TCP connection for real-time data updates.

## API Calls
- Player Registration (ID 01):
  - Endpoint: POST /api/register
  - Description: Registers a player for a specific game.
- Buy and Sell Actions (ID 04):
  - Endpoint: POST /api/buy
  - Description: Initiates a pretend stock purchase within the game.
  - Endpoint: POST /api/sell
  - Description: Initiates a pretend stock sale within the game.
- Create Games (ID 08):
  - Endpoint: POST /api/create-game
  - Description: Creates a new game. Only accessible by admin users.
- View Competitor's Portfolios (ID 09):
  - Endpoint: GET /api/portfolio?player=competitorName&game=gameID
  - Description: Retrieves the portfolio of a competitor in a specific game.
- Withdrawal/Exit Mechanism (ID 19):
  - Endpoint: POST /api/exit-game
  - Description: Allows a player to withdraw or exit the game.
- Customer Support (ID 20):
  - Endpoint: POST /api/customer-support
  - Description: Enables real-time customer support during the game.
- Stock Screener (ID 23):
  - Endpoint: GET /api/stock-screener
  - Description: Fetches data for the stock screener, showing the best-performing stocks.
- Calendar Integration (ID 24):
  - Endpoint: GET /api/economic-calendar
  - Description: Retrieves data from the economic calendar for displaying upcoming market events.
- Social Trading (ID 31):
  - Endpoint: POST /api/follow-trader
  - Description: Allows a player to follow and replicate the trades of another successful trader.

## Stock Price API
### Alpha Vantage
For the project, I am going to use Alpha Vantage's API. It is a powerful tool for developers seeking financial market data integration. Developers make HTTP requests to specific endpoints, including functions like TIME_SERIES_INTRADAY for real-time data and TIME_SERIES_DAILY for daily historical data. The data is typically returned in JSON format, making it easy parsing for seamless integration into applications. The data typically includes various details such as opening, closing, high, and low prices for each day, forming a time series dataset.

