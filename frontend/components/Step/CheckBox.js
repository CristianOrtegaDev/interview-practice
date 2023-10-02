import { useEffect, useState } from "react"
import styles from './index.module.css'

function CheckBox({ question, options, onChange }) {
    const [selected, setSelected] = useState({})

    const handleOnChange = e => {
        const value = e.target.value
        setSelected(selected => ({ ...selected, [value]: !selected[value] }))
    }

    useEffect(() => onChange(selected), [selected])

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
                                type="checkbox"
                                value={option}
                                checked={selected[option] === true}
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

export default CheckBox