import { useState, useEffect, useRef } from 'react'
import { DebounceDemo, IntervalDemo } from './demo'

export function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  const timeoutRef = useRef(null);

  const cancel = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    cancel();

    timeoutRef.current = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => {
      cancel();
    };
  }, [value, delay]);

  return [debounced, cancel];
}

export function useInterval(callback, delay) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (delay) {
      const id = setInterval(callbackRef.current, delay)

      return () => clearInterval(id)
    }
  }, [callback, delay])
}

export default function Hooks() {
  return (
    <>
      <h1>
        Hooks
      </h1>
      <ol>
        <li>Build a useInterval hook. See Documentation [here](https://github.com/streamich/react-use/blob/master/docs/useInterval.md)</li>
        <IntervalDemo />
        <li>Build a useDebounce hook. See Documentation [here](https://github.com/streamich/react-use/blob/master/docs/useDebounce.md)</li>
        <br />
        <DebounceDemo />
      </ol>
    </>
  )
}
