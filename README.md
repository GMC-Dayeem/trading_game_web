# Stock Trading Game - Project Overview

This project implements a stock trading game as a web application. The game simulates a stock trading environment where players compete to achieve the highest portfolio value by trading stocks using current NYSE prices. 

## Features

The server/application supports the following core features:

- **Player Registration**: Allows new players to register for the game.
- **Cash Account Initialization**: Provides all players with a starting cash balance in their portfolio.
- **Stock Transactions**: Supports buy and sell actions at current NYSE prices.
- **Portfolio Tracking**: Monitors each player's portfolio and its value.
- **Winner Declaration**: Declares the winner at the end of the game.
- **Player Authentication**: Manages player login sessions and profile information.
- **Admin Features**: Permits admin users to create and manage games.

Additional features include:

- **Portfolio Viewing**: Option to view competitor's portfolios.
- **Game Configuration**: Allows setting the game duration and starting amounts.

## Project Structure

- `controllers/`: Contains controller modules like `adminController.mjs` and `userController.mjs` for handling requests.
- `doc/`: Documentation files and instructions.
- `images/`: Stores image files used in the application.
- `models/`: Mongoose models such as `gameModel.mjs` and `userModel.mjs`.
- `routes/`: Route definitions for user and admin-related endpoints.
- `testcases/`: Contains test cases for the application.
- `utils/`: Utility scripts including `stockDataFetcher.mjs`.
- `public/`: css, js and html filers are all included
- `app.mjs`: The main application file to start the server.
- `package.json` & `package-lock.json`: npm configuration files.
- `README.md`: Project documentation.

## Architecture

The JavaScript codebase follows an MVC-like pattern:

- **Models**: Define the data structures for the application.
- **Public**: Consists of frontend files.
- **Controllers**: Handle incoming requests, interact with models, and return responses.

## API/HTTP Services (out of scope for project task 3)

Each API endpoint corresponds to a feature and is tested with a set of unit tests. 

For example:
- **POST /api/users/register**: Registers a new player. It is tested by `testUserRegistration` in `tests/user.test.mjs`.

(Repeat the above format for each endpoint.)

### Frontend Features

The frontend supports interactive features that allow users to:

- Register for a new player account.
- Log in to an existing player account.
- Provides cash initially.
- View and manage their stock portfolio.
- Buy and sell stocks.
- View competitor's portfolios
- Permits admins to create games
- Participate in a game and track progress toward winning.
- Declare a Winner.

## Frontend Structure

The frontend of the application is organized within the `public/` directory, which contains all static files served by the Express.js server.

- `css/`: Holds CSS files that apply styling across the application.
- `js/`: JavaScript files adding functionality and handling interactions:
  - `createGame.js`: Manages the creation of new games and admin interactions.
  - `main.js`: Contains the main functionality for user interactions.
  - `trade.js`: Handles the stock trading functionality.
  - `utilities.js`: Provides utility functions for common tasks.

- `html/`: HTML files that represent the various pages and views of the application:
  - `home.html`: The main landing page that users first interact with.
  - `dashboard.html`: Where users can view and manage their stock portfolios and game status.
  - `game.html`: Admin page for game creation, configuration, and winner declaration.
  - `profile.html`: Allows users to view their personal profile information.
  - `competitorsPortfolio.html`: Enables viewing of competitor portfolios.
  - `registration.html`: Sign up page for new user registration.
  - `signin.html`: Login page for existing users to access their accounts.
  - `trade.html`: Page for users to make stock trades.
  - `access.html`, `loggedOut.html`: Pages for special user flows such as gaining access to admin areas or logging out.


## Setup and Running

To set up and run the server:

1. Change the file extension `install_dependencies.txt` to `install_dependencies.ps1`
2. Run `powershell -ExecutionPolicy Bypass -File .\install_dependencies.ps1`
3. Run the server using `node app.mjs`.
4. Open a web browser and navigate to `http://localhost:3000/`.



## Attributions

Refer to `doc/attributions.md` for an attributions statement.

## Video Presentation

https://drive.google.com/file/d/1hW_TY8572cdEYsEDGpSU_vruosN4yc1n/view?usp=sharing



