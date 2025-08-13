// createGame.js
document.addEventListener('DOMContentLoaded', async function () {
    const createGameForm = document.getElementById('createGameForm');
    const messageElement = document.getElementById('message');

    const adminUserId = await fetchAdminUserId();
    console.log(adminUserId);
    if (!adminUserId) {

        messageElement.textContent = 'Admin user ID not found. Please log in.';
        messageElement.style.display = 'block';
    }

    createGameForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Construct the game data from the form fields
        const gameData = {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            startTime: document.getElementById('startTime').value,
            endTime: document.getElementById('endTime').value,
            initialCash: parseFloat(document.getElementById('initialCash').value),
            transactionFee: parseFloat(document.getElementById('transactionFee').value),
            createdBy: adminUserId
        };

        // Call the server to create the game
        try {
            const response = await fetch('/api/admin/create-game', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(gameData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Handle successful game creation
            const result = await response.json();
            messageElement.textContent = `Game created successfully with ID: ${result._id}`;
            messageElement.style.display = 'block';
        } catch (error) {
            console.error('There was a problem creating the game:', error);
            messageElement.textContent = 'Error creating game. Please try again.';
            messageElement.style.display = 'block';
        }
    });

    // Navigate back to the dashboard
    document.getElementById('homeButton').addEventListener('click', () => {
        window.location.href = 'dashboard.html';
    });
});

async function fetchAdminUserId() {
    try {
        const username = localStorage.getItem('username');
        console.log(username);
        const response = await fetch(`/api/users/data/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

            },
        
        });
        console.log(response);

        if (!response.ok) {
            throw new Error('Failed to fetch user data.');
        }

        const userData = await response.json();
        return userData._id;
    } catch (error) {
        console.error('Error fetching admin user ID:', error);
        return null;
    }
}