import { useEffect, useState, useCallback } from 'react';

import Header from './components/Header';
import Keypad from './components/Keypad';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;

    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(!darkMode);
  }, [darkMode]);

  return (
    <div className="flex flex-col items-center h-full w-full transition-color transition-500 text-black bg-white-200 dark:bg-dark-200 dark:text-white">
      <div className="flex flex-col w-full px-4 md:max-w-2xl mt-20 md:p-0">
        <Header toggleDarkMode={toggleDarkMode} isDarkMode={darkMode} />
      </div>
      <div className="flex flex-col w-full px-4 md:max-w-2xl md:p-0">
        <Keypad />
      </div>
    </div>
  );
}

export default App;
