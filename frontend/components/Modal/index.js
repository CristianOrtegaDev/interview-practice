import styles from './index.module.css'

function Modal({ children }) {
    const { container, wrapper } = styles

    return (
        <div className={container}>
            <div className={wrapper} onClick={() => { }}>
                {children}
            </div>
        </div>
    )
}

export default Modal