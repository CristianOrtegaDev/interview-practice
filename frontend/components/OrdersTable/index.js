import { STATUS, TYPE } from '@/constants/market';
import styles from './index.module.css'

function OrdersTable({ orders }) {

    const { table, headCellContainer, headCell, rowContainer, cell, BUY, SELL, statusElement, FULFILLED } = styles

    return (
        <table className={table}>
            <thead>
                <tr className={headCellContainer}>
                    <th className={headCell}>Symbol</th>
                    <th className={headCell}>Type</th>
                    <th className={headCell}>Quantity</th>
                    <th className={headCell}>Price</th>
                    <th className={headCell}>Status</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order, index) => {
                    const typeClass = `${cell} ${order.type === TYPE.BUY ? BUY : SELL}`
                    const statusClass = `${cell} ${statusElement} ${order.status === STATUS.FULFILLED ? FULFILLED : ''}`

                    return (
                        <tr key={index} className={rowContainer}>
                            <td className={cell}>{order.symbol}</td>
                            <td className={typeClass}>{order.type}</td>
                            <td className={cell}>{order.quantity}</td>
                            <td className={cell}>{order.price}</td>
                            <td className={statusClass}>{order.status}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}

export default OrdersTable