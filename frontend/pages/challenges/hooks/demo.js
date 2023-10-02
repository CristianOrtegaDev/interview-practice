import { useState } from 'react'
import { useInterval, useDebounce } from './index'

// Examples extracted from Documentation link

const IntervalDemo = () => {
    const [count, setCount] = useState(0);
    const [delay, setDelay] = useState(1000);
    const [isRunning, setIsRunning] = useState(true);

    const toggleIsRunning = () => setIsRunning(isRunning => !isRunning)

    useInterval(
        () => {
            setCount(count => count + 1);
        },
        isRunning ? delay : null
    );

    return (
        <div>
            <br />
            <div>
                delay: <input value={delay} onChange={event => setDelay(Number(event.target.value))} />
            </div>
            <h1>count: {count}</h1>
            <div>
                <button onClick={toggleIsRunning}>{isRunning ? 'stop' : 'start'}</button>
            </div>
            <br />
        </div>
    );
};

const DebounceDemo = () => {
    const [state, setState] = useState('Typing stopped');
    const [val, setVal] = useState('');
    const [debouncedValue, setDebouncedValue] = useState('');

    const [, cancel] = useDebounce(
        () => {
            setState('Typing stopped');
            setDebouncedValue(val);
        },
        2000,
        [val]
    );

    return (
        <div>
            <input
                type="text"
                value={val}
                placeholder="Debounced input"
                onChange={({ currentTarget }) => {
                    setState('Waiting for typing to stop...');
                    setVal(currentTarget.value);
                }}
            />
            <div>{state}</div>
            <div>
                Debounced value: {debouncedValue}
                <button onClick={cancel}>Cancel debounce</button>
            </div>
        </div>
    );
};

export { DebounceDemo, IntervalDemo }