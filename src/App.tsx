import { useEffect, useState } from 'react';

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

  return (
    <div className="h-full w-full transition-color transition-500 text-black bg-white-200 dark:bg-dark-200 dark:text-white">
      <h1>Hello, world!</h1>
    </div>
  );
}

export default App;
