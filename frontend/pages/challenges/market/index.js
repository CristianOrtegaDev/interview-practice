import { INITIAL_ORDERS, ADD_ORDER, STATUS, TYPE } from '@/constants/market'
import { useEffect, useState } from 'react'
import Modal from '@/components/Modal'
import OrderForm from '@/components/OrderForm'
import OrdersTable from '@/components/OrdersTable'
import BestOrder from '@/components/BestOrder'
import { useInterval } from '../hooks'
import styles from './index.module.css'
import useTimeout from '@/helpers/market'

export default function Market() {
  const [orders, setOrders] = useState(INITIAL_ORDERS)
  const [bestOrder, setBestOrder] = useState(null)
  const [matchingOrders, setMatchingOrders] = useState([])
  const [showForm, setShowForm] = useState(false)

  // Adding extra order for DEMO purposes only
  useTimeout(() => {
    addOrder(ADD_ORDER)
    evaluateMarket(ADD_ORDER)
  }, 100)

  useEffect(() => {
    const bestOrder = getBestOffer()
    setBestOrder(bestOrder)
  }, [orders])

  const getBestOffer = () => {
    let bestOffer = orders.find(order => order.type === TYPE.SELL && order.status === STATUS.OPEN);

    orders.forEach(order => {
      if (order.type === TYPE.SELL && order.price < bestOffer.price && order.status === STATUS.OPEN) {
        bestOffer = order
      }
    })

    return bestOffer
  }

  const toggleForm = () => setShowForm(showForm => !showForm)

  const addOrder = order => setOrders(orders => [...orders, order])

  const handleOnSubmit = (order) => {
    toggleForm()
    addOrder(order)
    evaluateMarket(order)
  }

  const evaluateMarket = (order) => {
    const matchingOrderIndex = getMatchingOrderIndex(order)
    if (matchingOrderIndex >= 0) {
      const actualType = order.type
      const matchingType = actualType === TYPE.BUY ? TYPE.SELL : TYPE.BUY
      const match = { [matchingType]: matchingOrderIndex, [actualType]: orders.length }

      setMatchingOrders(matchingOrders => [...matchingOrders, match])
    }
  }

  const getMatchingOrderIndex = ({ symbol, type }) => {
    return orders.findIndex(order => order.status === STATUS.OPEN && symbol === order.symbol && type !== order.type)
  }

  const operateMarket = () => {
    console.log(matchingOrders)
    const tempOrders = [...orders]
    const tempMatchingOrders = [...matchingOrders]

    for (let i = tempMatchingOrders.length - 1; i >= 0; i--) {
      const buyIndex = tempMatchingOrders[i][TYPE.BUY]
      const buyOrder = tempOrders[buyIndex]

      const sellIndex = tempMatchingOrders[i][TYPE.SELL]
      const sellOrder = tempOrders[sellIndex]

      if (buyOrder.quantity === 0 || sellOrder.quantity === 0) {
        buyOrder.status = buyOrder.quantity === 0 ? STATUS.FULFILLED : buyOrder.status
        sellOrder.status = sellOrder.quantity === 0 ? STATUS.FULFILLED : sellOrder.status
        tempMatchingOrders.splice(i, 1);
      } else {
        buyOrder.quantity -= 1
        sellOrder.quantity -= 1
      }
    }

    setOrders(tempOrders)
    setMatchingOrders(tempMatchingOrders)
  }

  useInterval(operateMarket, 2000)

  const { ordersContainer, plusButton } = styles

  return (
    <div>
      <h2>MARKET</h2>
      <div className={ordersContainer}>
        <OrdersTable orders={orders} />
        {bestOrder && <BestOrder {...bestOrder} />}
      </div>
      <button className={plusButton} onClick={toggleForm}>+</button>
      {
        showForm &&
        <Modal>
          <OrderForm onSubmit={handleOnSubmit} />
        </Modal>
      }
    </div>
  )
}
