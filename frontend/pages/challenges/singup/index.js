import { useState } from "react"
import { STATUS } from '@/constants/form'
import { postResolved, postRejected } from '@/helpers/form'
import styles from './index.module.css'
import SingupForm from "@/components/SingupForm"

export default function SignupForm() {
    const [state, setState] = useState({
        status: STATUS.IDLE,
        data: null,
        error: null
    })

    const { status, error } = state

    const handleSubmit = async (formData) => {
        const body = JSON.stringify(formData)

        setState({ status: STATUS.PENDING })

        try {
            // Simulating server error (switching between mock functions) for demo purposes
            const post = !error ? postRejected : postResolved
            const data = await post(body)
            alert(data.message)
            setState({ data, status: STATUS.RESOLVED })
        } catch (error) {
            setState({ error, status: STATUS.REJECTED })
        }
    };

    const { pageWrapper, formContainer, title, errorMessage, } = styles

    const isPending = status === STATUS.PENDING

    return (
        <div className={pageWrapper}>
            <div className={formContainer}>
                <h2 className={title}>Create your account</h2>
                <SingupForm onSubmit={handleSubmit} isLoading={isPending} />
                {status === STATUS.REJECTED && <p className={errorMessage}>{error.message}</p>}
            </div>
        </div >
    )
}
