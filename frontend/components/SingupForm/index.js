import { INPUT_TYPE } from '@/constants/form'
import { hasSpecialCharacter } from '@/helpers/form'
import Form from '../Form'

const fields = [
    {
        id: 'email',
        label: 'Email',
        type: INPUT_TYPE.TEXT
    },
    {
        id: 'password',
        label: 'Password',
        type: INPUT_TYPE.PASSWORD
    },
]

const validateField = (name, value) => {
    switch (name) {
        case "email":
            const splitStr = value.split('@')
            if (splitStr.length <= 1) {
                return 'The email must contain an @ character'
            }
            const hasDot = splitStr[1].includes('.')
            if (!hasDot) {
                return 'The email must contain a .'
            }
            break;
        case "password":
            if (value.length < 8) {
                return 'The password must be at least 8 characters long'
            }
            if (!hasSpecialCharacter(value)) {
                return 'The password must include at least one special character'
            }
            break;
        default:
            return ''
            break;
    }
    return '';
}

function SingupForm({ onSubmit, isLoading }) {
    return (
        <div>
            <Form fields={fields} onSubmit={onSubmit} validator={validateField} isLoading={isLoading} />
        </div>
    )
}

export default SingupForm