import { INPUT_TYPE } from '@/constants/form'
import { STATUS, TYPE } from '@/constants/market'
import Form from '../Form'

const fields = [
    {
        id: 'symbol',
        label: 'Symbol',
        type: INPUT_TYPE.TEXT
    },
    {
        id: 'price',
        label: 'Price',
        type: INPUT_TYPE.NUMBER
    },
    {
        id: 'quantity',
        label: 'Quantity',
        type: INPUT_TYPE.NUMBER
    },
    {
        id: 'type',
        label: 'Type',
        type: INPUT_TYPE.SELECT,
        options: Object.values(TYPE)
    },
    {
        id: 'status',
        label: 'Status',
        type: INPUT_TYPE.SELECT,
        options: Object.values(STATUS)
    }
]

const validateField = (name, value) => {
    if (!value) return 'The value cannot be empty'

    return ''
}

function OrderForm({ onSubmit }) {

    const handleOnSubmit = (order) => {
        const formatterOrder = { ...order, quantity: parseInt(order.quantity, 10), price: parseFloat(order.price) }
        onSubmit(formatterOrder)
    }

    return (
        <div>
            <Form fields={fields} onSubmit={handleOnSubmit} validator={validateField} />
        </div>
    )
}

export default OrderForm