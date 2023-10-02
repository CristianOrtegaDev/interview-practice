import styles from './index.module.css'

function BestOrder({ symbol, price, quantity, type, status }) {
    const { container, bestOrderWrapper, symbolWrapper, typeWrapper, statusWrapper } = styles

    return (
        <div className={container}>
            <h2>BEST OFFER</h2>
            <div className={bestOrderWrapper}>
                <div>
                    <div className={symbolWrapper}>{symbol}</div>
                    <div>
                        <div></div>
                        <div>{quantity} x USD {price}</div>

                    </div>
                </div>
                <div className={typeWrapper}>{type}</div>
                <div className={statusWrapper}>{status}</div>
            </div>
        </div>
    )
}

export default BestOrder