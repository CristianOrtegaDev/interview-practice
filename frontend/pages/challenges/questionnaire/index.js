import { useState } from "react"
import Step from "@/components/Step"
import { data, TYPE } from "@/constants/questionnaire"
import styles from './index.module.css'

const computeCheckBoxResponse = (step, response) => {
  let correctAmount = 0
  const correctAnswers = step.correct

  correctAnswers.forEach(element => {
    const correctValue = step.options[element]
    if (response && response[correctValue]) correctAmount++
  })

  if (correctAmount === correctAnswers.length) return step.value

  return 0
}

const computeRadioResponse = (step, response) => {
  const correctAnswer = step.options[step.correct]
  if (correctAnswer === response) return step.value

  return 0
}

export default function Questionnaire() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({});

  const { title, steps } = data
  const currentStep = steps[step]

  const nextStep = () => setStep(step => step + 1)

  const handleOnChange = e => {
    setFormData(formData => ({ ...formData, [step]: e }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    evaluate()
  };

  const evaluate = () => {
    let grade = 0;
    let correctAnswers = 0

    steps.forEach((step, stepIndex) => {
      const response = formData[stepIndex]
      const val = step.type === TYPE.CHECKBOX ? computeCheckBoxResponse(step, response) : computeRadioResponse(step, response)
      if (val) {
        grade += val
        correctAnswers++
      }
    });

    alert(`Grade: ${grade}, Correct answers: ${correctAnswers}`)
  }

  const showSubmit = step >= steps.length - 1

  const { pageWrapper, contentWrapper, heading, stepContainer, button } = styles

  return (
    <div className={pageWrapper}>
      <form className={contentWrapper} onSubmit={handleSubmit}>
        <h1 className={heading}>{title}</h1>
        {currentStep &&
          <div className={stepContainer}>
            <Step data={currentStep} onChange={handleOnChange} />
            {!showSubmit && <button className={button} type="button" onClick={nextStep}>Next Step</button>}
            {showSubmit && <button className={button} type="submit">Submit</button>}
          </div>
        }
        {step === steps.length && <button type="submit">Submit</button>}
      </form>
    </div>
  )
}
