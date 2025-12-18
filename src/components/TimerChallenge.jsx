import { useEffect, useRef, useState } from 'react';
import ResultModal from './ResultModal.jsx';

export default function TimerChallenge({ title, targetTime }) {
  const timerRef = useRef(null);
  const intervalRef = useRef(null);
  const dialog = useRef(null);

  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const [remainingTime, setRemainingTime] = useState(targetTime * 1000);

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
      clearInterval(intervalRef.current);
    };
  }, []);

  function resetTimer() {
    clearTimeout(timerRef.current);
    clearInterval(intervalRef.current);
    setTimerStarted(false);
    setTimerExpired(false);
    setRemainingTime(targetTime * 1000);
  }

  function handleStart() {
    if (timerStarted) return;

    setTimerStarted(true);
    setTimerExpired(false);
    const endTime = Date.now() + targetTime * 1000;

    timerRef.current = setTimeout(() => {
      setTimerExpired(true);
      setTimerStarted(false);
      setRemainingTime(0);
      dialog.current?.open();
      clearInterval(intervalRef.current);
    }, targetTime * 1000);

    intervalRef.current = setInterval(() => {
      const msRemaining = endTime - Date.now();
      setRemainingTime(msRemaining);
    }, 50);
  }

  function handleStop() {
    if (!timerStarted) return;

    clearTimeout(timerRef.current);
    clearInterval(intervalRef.current);
    setTimerStarted(false);
    dialog.current?.open();
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        result={timerExpired ? 'lost' : 'won'}
        remainingTime={remainingTime}
        onReset={resetTimer}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? 'Stop Challenge' : 'Start Challenge'}
          </button>
        </p>
        <p className={timerStarted ? 'active' : 'inactive'}>
          {timerStarted ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  );
}
