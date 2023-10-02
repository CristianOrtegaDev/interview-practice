import styles from './index.module.css'

const Input = ({ id, label, value, error, options, onChange, type }) => {
    const { inputWrapper, inputTitle, inputElement, errorLabel } = styles

    return (
        <div className={inputWrapper}>
            <label className={inputTitle} htmlFor={id}>{label}</label>
            {
                options &&
                <select className={inputElement} value={value} name={id} id={id} onChange={onChange}>
                    {options.map((option, index) => <option key={option + index} value={option}>{option}</option>)}
                </select>
            }
            {
                !options && <input className={inputElement} id={id} name={id} value={value} type={type} onChange={onChange} />
            }
            <label className={errorLabel}>{error}</label>
        </div>
    )
}

export default Input