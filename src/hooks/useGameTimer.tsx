import { useEffect, useState, useRef, useCallback } from 'react';

type UseGameTimerProps = {
  initialCountdown: number;
  onTimeEnd: () => void;
};

export default function useGameTimer({
  initialCountdown,
  onTimeEnd,
}: UseGameTimerProps) {
  const [countdown, setCountdown] = useState(initialCountdown);
  const [isPaused, setIsPaused] = useState(true);
  const intervalId = useRef<number | null>(null);

  const startTimer = useCallback(() => {
    setIsPaused(false);
  }, []);

  const pauseTimer = useCallback(() => {
    if (intervalId.current) {
      clearTimeout(intervalId.current);
    }
    setIsPaused(true);
  }, []);

  const resetTimer = useCallback(() => {
    setCountdown(initialCountdown);
  }, [initialCountdown]);

  useEffect(() => {
    if (!isPaused) {
      intervalId.current = setTimeout(() => {
        if (countdown > 0) {
          setCountdown(countdown - 1);
        } else {
          onTimeEnd();
          resetTimer();
        }
      }, 1000);
    } else if (intervalId.current) {
      clearTimeout(intervalId.current);
    }

    return () => {
      if (intervalId.current) {
        clearTimeout(intervalId.current);
      }
    };
  }, [isPaused, countdown, onTimeEnd, resetTimer]);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const minutesStr = `0${minutes}`.slice(-2);
  const secondsStr = `0${seconds}`.slice(-2);
  const countdownStr = `${minutesStr}:${secondsStr}`;

  return {
    countdown: countdownStr,
    startTimer,
    pauseTimer,
    resetTimer,
    isPaused,
  };
}
