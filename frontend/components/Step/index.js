import CheckBox from "./CheckBox"
import Radio from "./Radio"
import { TYPE } from "@/constants/questionnaire"

function Step({ data, onChange }) {
    const isCheckbox = data.type === TYPE.CHECKBOX

    return isCheckbox ? <CheckBox {...data} onChange={onChange} /> : <Radio {...data} onChange={onChange} />
}

export default Step