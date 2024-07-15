const { RestClientV5 } = require('bybit-api');

class ByBit {
    constructor() {
        this.client = new RestClientV5({
            testnet: false,
            key: process.env.BYBIT_API_KEY,
            secret: process.env.BYBIT_API_SECRET,
        });
    }

    async getTickers() {
        return await this.client
            .getTickers({
                category: 'linear',
                symbol: 'TONUSDT',
            })
    }
}

module.exports = ByBit;