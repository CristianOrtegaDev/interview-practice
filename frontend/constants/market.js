export const TYPE = {
    BUY: 'BUY',
    SELL: 'SELL'
}

export const STATUS = {
    OPEN: 'OPEN',
    CANCELLED: 'CANCELLED',
    FULFILLED: 'FULFILLED'
}

export const ADD_ORDER = { price: 100, quantity: 20, symbol: 'FB', type: TYPE.BUY, status: STATUS.OPEN }

export const INITIAL_ORDERS = [
    { price: 100, quantity: 10, symbol: 'AAPL', type: TYPE.BUY, status: STATUS.OPEN },
    { price: 150, quantity: 8, symbol: 'GOOGL', type: TYPE.SELL, status: STATUS.FULFILLED },
    { price: 75, quantity: 15, symbol: 'MSFT', type: TYPE.BUY, status: STATUS.OPEN },
    { price: 200, quantity: 5, symbol: 'AMZN', type: TYPE.SELL, status: STATUS.FULFILLED },
    { price: 50, quantity: 12, symbol: 'TSLA', type: TYPE.BUY, status: STATUS.FULFILLED },
    { price: 110, quantity: 10, symbol: 'FB', type: TYPE.SELL, status: STATUS.OPEN },
    { price: 90, quantity: 20, symbol: 'NFLX', type: TYPE.BUY, status: STATUS.FULFILLED },
    { price: 120, quantity: 6, symbol: 'GOOG', type: TYPE.SELL, status: STATUS.OPEN },
    { price: 110, quantity: 8, symbol: 'AAPL', type: TYPE.BUY, status: STATUS.FULFILLED },
    { price: 160, quantity: 10, symbol: 'MSFT', type: TYPE.SELL, status: STATUS.OPEN }
];