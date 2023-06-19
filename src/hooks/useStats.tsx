import { useCallback } from 'react';
import useLocalStorageState from './useLocalStorageState';

const useStats = () => {
  const [gamesPlayed, setGamesPlayed] = useLocalStorageState<number>(
    'gamesPlayed',
    0
  );
  const [victories, setVictories] = useLocalStorageState<number>(
    'victories',
    0
  );

  const incrementGamesPlayed = useCallback(() => {
    setGamesPlayed((games) => games + 1);
  }, [setGamesPlayed]);

  const incrementVictories = useCallback(() => {
    setVictories((victory) => victory + 1);
  }, [setVictories]);

  return { gamesPlayed, victories, incrementGamesPlayed, incrementVictories };
};

export default useStats;
