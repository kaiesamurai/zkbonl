import * as https from 'https';
const fetchCryptoPrice = (symbol: string): Promise<number> => {
    return new Promise((resolve, reject) => {
	fetch(`/api/${symbol}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
	})
	.then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.text();
      })
      .then(data => {
        resolve(parseFloat(data));
      })
      .catch(err => {
        reject(err);
      });
    });
  };
export function getAddressBalance(ethAddress: string | null): Promise<any> {
    return fetch(`http://localhost:8000/web3/recoverAddressInfo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ethAddress }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
    })
    .then(async (data: any) => {
        const cryptos = data;
        const addressdata = {};
        for (const address in cryptos) {
            const crypto = cryptos[address];
            try {
                const price = await fetchCryptoPrice(crypto.symbol);
                const balances = parseFloat(crypto.balance);
                addressdata[address] = {
                    symbol: crypto.symbol,
                    balances: crypto.balance,
                    prix: price,
                    total: balances * price
                };
            } catch (error) {
                console.error(`Error when getting the price ${crypto.symbol}:`, error);
            }
        }
        return fetch(`http://localhost:8000/web3/calculateWeb3Balance`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ addressdata }),
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
    })
    .then((data: any) => {
        return data;
    })
    .catch(error => {
        console.error('Error:', error);
        throw error; // Re-throwing error so it can be caught by the caller
    });
}