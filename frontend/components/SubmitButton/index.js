import Image from 'next/image'
import loading from '@/images/loading.png'
import styles from './index.module.css'

function SubmitButton({ isLoading, disabled, children }) {
    const { submitButton, loadingImg } = styles
    return (
        <button className={submitButton} type="submit" disabled={disabled}>
            {isLoading ? <Image className={loadingImg} src={loading} width={20} height={20} alt={'loading'} /> : children}
        </button>
    )
}

export default SubmitButton