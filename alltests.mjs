// Import necessary libraries and modules
import request from 'supertest';
import assert from 'assert';
import app from './app.mjs'; // Adjust this path to import the Express app
import { fetchStockData } from './utils/stockDataFetcher.mjs'; // Utility for fetching stock data


// Base URL for API endpoints
const BASE_URL = '/api';

// Main describe block for User API tests
describe('User API', function() {
    this.timeout(10000000); // Increase the timeout for all tests in this describe block

    // Variable to store token for authenticated routes
    let userToken;

    // Test suite for user registration
    describe('POST /users/register', () => {
        it('should register a user', async () => {
            const res = await request(app)
                .post(`${BASE_URL}/users/register`)
                .send({
                    username: 'testuser',
                    password: 'kettering',
                    initialCash: 100000,
                });
            assert.strictEqual(res.status, 201);
            assert.strictEqual(res.body.username, 'testuser');
        });
    });

    // Test suite for user login
    describe('POST /users/login', () => {
        it('should log in a user', async () => {
            const res = await request(app)
                .post(`${BASE_URL}/users/login`)
                .send({
                    username: 'testuser',
                    password: 'kettering',
                });
            assert.strictEqual(res.status, 200);
            // Since you're removing token system, you can't assert token existence
        });
    });



    // Test suite for user logout
    describe('POST /users/logout', () => {
        // Test case for successful logout
        it('should logout a user', async () => {
            // Assume user is logged in and token is stored in userToken
            const res = await request(app)
                .post(`${BASE_URL}/users/logout`)
                .set('Authorization', `Bearer ${userToken}`);
            assert.strictEqual(res.status, 200); // Check for HTTP status code 200
        });

        // Test case for logout attempt with an invalid token
        it('should not logout a user with an invalid token', async () => {
            const res = await request(app)
                .post(`${BASE_URL}/users/logout`)
                .set('Authorization', `Bearer invalidtoken123`);
            assert.strictEqual(res.status, 401); // Unauthorized access should result in HTTP 401
        });
    });

  describe('Buy Stock API', () => {
    let userToken;
    let mockStockSymbol = 'AAPL';
    let mockBuyQuantity = 10; 

    before(async () => {
        const res = await request(app)
            .post(`${BASE_URL}/login`)
            .send({
                username: 'testuser',
                password: 'kettering',
            });
        assert.strictEqual(res.status, 200);
        userToken = res.body.token;
    });

    it('should allow a user to buy stock if they have enough cash', async () => {
        const res = await request(app)
            .post(`${BASE_URL}/buy`)
            .set('Authorization', `Bearer ${userToken}`)
            .send({
                symbol: mockStockSymbol,
                quantity: mockBuyQuantity,
            });
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.message, 'Stock purchased');
        
    });

    it('should not allow a user to buy stock if they have insufficient cash', async () => {
        const res = await request(app)
            .post(`${BASE_URL}/buy`)
            .set('Authorization', `Bearer ${userToken}`)
            .send({
                symbol: mockStockSymbol,
                quantity: 1000000, 
            });
        assert.strictEqual(res.status, 400);
        assert.strictEqual(res.body.message, 'Not enough cash');
        
    });
});


describe('Sell Stock API', () => {
    let userToken;
    let mockStockSymbol = 'AAPL';
    let mockSellQuantity = 5;

    before(async () => {
        
    });

    it('should allow a user to sell stock if they own the stock', async () => {
        const res = await request(app)
            .post(`${BASE_URL}/sell`)
            .set('Authorization', `Bearer ${userToken}`)
            .send({
                symbol: mockStockSymbol,
                quantity: mockSellQuantity,
            });
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.message, 'Stock sold');
       
    });

    it('should not allow a user to sell stock if they do not own enough of the stock', async () => {
        const res = await request(app)
            .post(`${BASE_URL}/sell`)
            .set('Authorization', `Bearer ${userToken}`)
            .send({
                symbol: mockStockSymbol,
                quantity: 1000000,
            });
        assert.strictEqual(res.status, 400);
        assert.strictEqual(res.body.message, 'Not enough stock to sell');
       
    });
});

describe('Portfolio API', () => {
    let userToken;

    before(async () => {
        // Perform user login and set the userToken
        const loginResponse = await request(app)
            .post(`${BASE_URL}/users/login`) 
            .send({
                username: 'testuser', 
                password: 'kettering'
            });

        if (loginResponse.status === 200 && loginResponse.body.token) {
            userToken = loginResponse.body.token;
        } else {
            throw new Error('Failed to log in for tests');
        }
    });

    it('should retrieve the user\'s portfolio when authorized', async () => {
        const res = await request(app)
            .get(`${BASE_URL}/portfolio`)
            .set('Authorization', `Bearer ${userToken}`);
        assert.strictEqual(res.status, 200);
        
    });

    it('should not retrieve the user\'s portfolio when unauthorized', async () => {
        const res = await request(app)
            .get(`${BASE_URL}/portfolio`);
        assert.strictEqual(res.status, 401);
      
    });
});


describe('Create Game API', () => {
    let adminToken;
    let createdGameId;

    before(async () => {
      
        const res = await request(app)
            .post(`${BASE_URL}/admin/login`) 
            .send({
                username: 'adminuser',
                password: 'adminpassword',
            });
        assert.strictEqual(res.status, 200);
        adminToken = res.body.token;
    });

    it('should create a game when admin is authorized', async () => {
        const res = await request(app)
            .post(`${BASE_URL}/admin/create-game`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                name: 'New Game',
                description: 'A new test game',
                startTime: new Date(),
                endTime: new Date(Date.now() + 86400000), 
                initialCash: 100000,
                transactionFee: 10
            });
        assert.strictEqual(res.status, 201);
        createdGameId = res.body._id;
    });

    it('should not create a game when admin is unauthorized', async () => {
        const res = await request(app)
            .post(`${BASE_URL}/admin/create-game`)
            .send({
               
            });
        assert.strictEqual(res.status, 401);
    });
});


describe('End Game and Declare Winner API', () => {
    let adminToken;
    let gameId;

    before(async () => {
       
        const loginRes = await request(app)
            .post(`${BASE_URL}/admin/login`)
            .send({
                username: 'adminuser',
                password: 'adminpassword',
            });
        assert.strictEqual(loginRes.status, 200);
        adminToken = loginRes.body.token;

       
    });

    it('should end a game when admin is authorized and game ID is valid', async () => {
        const res = await request(app)
            .post(`${BASE_URL}/admin/end-game`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ gameId });
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.message, 'Game ended successfully');
        assert.ok(res.body.winner, 'The response should include a winner');
        
    });

    it('should return an error if the game ID is invalid', async () => {
        const res = await request(app)
            .post(`${BASE_URL}/admin/end-game`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ gameId: 'invalid_game_id' });
        assert.strictEqual(res.status, 404);
        assert.strictEqual(res.body.message, 'Game not found');
    });

    it('should not allow ending the game when admin is unauthorized', async () => {
        const res = await request(app)
            .post(`${BASE_URL}/admin/end-game`)
            .send({ gameId });
        assert.strictEqual(res.status, 401);
        assert.strictEqual(res.body.message, 'Unauthorized access');
    });

});


describe('Configure Game Settings API', () => {
    let adminToken;

    before(async () => {
       
    });

    it('should update game settings when admin is authorized', async () => {
        createdGameId = res.body._id;
        const res = await request(app)
            .post(`${BASE_URL}/admin/configure-game`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                adminId: 'validAdminId',

                gameSettings: {
                    gameId, 
                    
                }
            
            });
        assert.strictEqual(res.status, 200);
    });

    it('should not update game settings when admin is unauthorized', async () => {
        const res = await request(app)
            .post(`${BASE_URL}/admin/configure-game`)
            .send({
                adminId: 'invalidAdminId',
                gameSettings: {
                    gameId, 
                }
            });
        assert.strictEqual(res.status, 404);
    });
});



describe('Stock Data Fetcher', () => {
    const validSymbol = 'AAPL';
    const invalidSymbol = 'INVALID';

    it('should fetch the latest stock price', async () => {
        const price = await fetchStockData(validSymbol);
        assert.strictEqual(typeof price, 'number', 'Price should be a number');
        assert(price > 0, 'Price should be greater than zero');
    });

    it('should throw an error for an invalid symbol', async () => {
        try {
            await fetchStockData(invalidSymbol);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert(error.message.includes('Error fetching stock price'), 'Error message should indicate fetching issue');
        }
    });
});



});


