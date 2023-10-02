import { useEffect, useRef } from 'react';

function useTimeout(callback, delay) {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delay === null) {
            return;
        }

        const timerId = setTimeout(() => {
            callbackRef.current();
        }, delay);

        return () => {
            clearTimeout(timerId);
        };
    }, [delay]);
}

export default useTimeout;
