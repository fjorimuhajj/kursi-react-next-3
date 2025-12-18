import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, result, onReset },
  ref
) {
  const dialogRef = useRef(null);

  useImperativeHandle(ref, () => ({
    open() {
      dialogRef.current?.showModal();
    },
  }));

  const formattedRemainingTime =
    remainingTime != null
      ? (Math.max(remainingTime, 0) / 1000).toFixed(2)
      : '0.00';

  return createPortal(
    <dialog ref={dialogRef} className="result-modal">
      <h2>You {result}</h2>
      <p>The target time was {targetTime} seconds.</p>
      <p>
        You stopped the timer with <strong>{formattedRemainingTime}</strong>{' '}
        seconds left.
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default ResultModal;
