
async function buyStock(symbol, quantity) {
    const username = localStorage.getItem('username');
    const response = await fetch(`/api/users/buy/${username}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({ symbol, quantity })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to buy stock');
    return data;
}

async function sellStock(symbol, quantity) {
    const username = localStorage.getItem('username');
    const response = await fetch(`/api/users/sell/${username}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify({ symbol, quantity })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to sell stock');
    return data;
}

export { buyStock, sellStock };
