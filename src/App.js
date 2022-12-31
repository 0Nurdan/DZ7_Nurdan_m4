import React, { useState, useEffect } from 'react';

function Timer() {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [isActive, setIsActive] = useState(false);

    function toggle() {
        setIsActive(!isActive);
    }

    function reset() {
        setSeconds(0);
        setMinutes(0);
        setHours(0);
        setIsActive(false);
    }

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => {
                    if (seconds === 59) {
                        setMinutes(minutes + 1);
                        return 0;
                    }
                    return seconds + 1;
                });
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    useEffect(() => {
        if (minutes === 59) {
            setHours(hours + 1);
            setMinutes(0);
        }
    }, [minutes]);

    return (
        <div>
            <div>
                {hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>
            <button onClick={toggle}>
                {isActive ? 'Пауза' : 'Начать'}
            </button>
            <button onClick={reset}>Перезапуск</button>
        </div>
    );
}

export default Timer;
