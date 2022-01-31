# Crypto Paper Trader
Crypto Paper Trader allows users to create and track crypto-currency investments without making any actual financial trades. Crypto Currency prices are kept up to date with the latest data from the CoinBase API. Users can track and 'invest' in any crypto-currency on the market, constantly updated with the latest stock prices. They will be shown statistics such as profit percentages, cost-averages, and much more for their overall portfolio as well as for each individual trade they made. 

# Technology
* React.js frontend connected with Node.js and Express.js
* CoinBase API used to access Crypto Currency values
* PostgreSQL database 
* Redis for server side session storage.

# Screenshots

### Portfolio Page
![](https://imgur.com/nQPdTVJ.png)
### Example Coin Data Page
![](https://imgur.com/Bh7u6L7.png)

# Instructions:
* Run `npm install` inside both the frontend and backend folders.
* Make sure you have PostgreSQL and Redis installed on your device.
* To use the app, run the `server.js` file in the `backend/src` folder, and then run `npm start` inside the frontend folder. Then go to localhost:3000. 



