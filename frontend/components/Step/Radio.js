import { useState } from "react"
import styles from './index.module.css'

function Radio({ question, options, onChange }) {
    const [selected, setSelected] = useState()

    const handleOnChange = e => {
        const value = e.target.value
        setSelected(value)
        onChange(value)
    }

    const { container, title, inputLabel } = styles

    return (
        <div className={container}>
            <p className={title}>{question}</p>
            <div>
                {options.map((option, index) => {
                    const id = option + index
                    return (
                        <label className={inputLabel} key={id} htmlFor={id}>
                            <input
                                id={id}
                                type="radio"
                                name={question}
                                value={option}
                                checked={option === selected}
                                onChange={handleOnChange}
                            />
                            {option}
                        </label>
                    )
                })}
            </div>
        </div>
    )
}

export default Radio