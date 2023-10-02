import Input from '@/components/Input'
import { useState } from 'react'
import styles from './index.module.css'
import SubmitButton from '../SubmitButton'

function getInitialState(fields) {
    const state = {}
    fields.forEach(({ id, options }) => {
        state[id] = options ? options[0] : ''
    })
    return state
}

function OrderForm({ fields, onSubmit, validator, isLoading }) {
    const [formData, setFormData] = useState(() => getInitialState(fields))
    const [errorData, setErrorData] = useState({})

    const handleOnSubmit = e => {
        e.preventDefault()
        onSubmit(formData)
    }

    const handleOnChange = e => {
        const name = e.target.name
        const value = e.target.value

        updateValue(name, value)
        updateError(name, value)
    }

    const updateValue = (name, value) => setFormData(formData => ({ ...formData, [name]: value }))

    const updateError = (name, value) => {
        const error = validator(name, value)
        if (error) setErrorData(errorData => ({ ...errorData, [name]: error }))
        else {
            setErrorData(errorData => {
                delete errorData[name]

                return errorData
            })
        }
    }

    const hasErrors = Object.keys(errorData).length > 0
    const hasResponses = Object.values(formData).every(value => value);
    const isSubmitDisabled = hasErrors || !hasResponses || isLoading

    const { form } = styles

    return (
        <form className={form} onSubmit={(handleOnSubmit)}>
            {fields.map(({ id, label, type, options }, index) => (
                <Input
                    key={id + index}
                    id={id}
                    label={label}
                    value={formData[id]}
                    error={errorData[id]}
                    options={options}
                    onChange={handleOnChange}
                    type={type}
                />
            ))}
            <SubmitButton disabled={isSubmitDisabled} isLoading={isLoading}>Add Order</SubmitButton>
        </form>
    )
}

export default OrderForm