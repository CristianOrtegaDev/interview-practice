export const TYPE = {
    RADIO: 'radio',
    CHECKBOX: 'checkbox'
}

export const data = {
    title: 'Questionnaire Test',
    steps: [
        {
            type: TYPE.RADIO,
            question: 'Which one is A?',
            options: ['A', 'B', 'C'],
            correct: 0,
            value: 10
        },
        {
            type: TYPE.CHECKBOX,
            question: 'Which ones are not A?',
            options: ['A', 'B', 'C'],
            correct: [1, 2],
            value: 5
        },
        {
            type: TYPE.RADIO,
            question: 'Which one is C?',
            options: ['A', 'B', 'C'],
            correct: 2,
            value: 10
        },
    ]
}