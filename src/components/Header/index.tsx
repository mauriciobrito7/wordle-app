/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import Icon, { IconType, IconSize } from '../Icon';

interface HeaderProps {
  className?: string;
  toggleDarkMode?: () => void;
  isDarkMode?: boolean;
}

function Header({ className, toggleDarkMode, isDarkMode }: HeaderProps) {
  return (
    <div
      className={`flex w-full justify-between items-center px-5 py-4 rounded-2xl bg-white-300 mb-20 dark:bg-dark-gray-300 dark:text-dark-base-100 ${
        className ?? ''
      }`}
    >
      <Icon
        className="text-gray-500 dark:text-dark-base-100"
        type={'circle-question' as IconType}
      />
      <h1 className="text-xl sm:text-subtext md:text-3xl font-medium tracking-wider uppercase">
        Wordle
      </h1>
      <div className="flex items-center">
        <Icon
          className="text-gray-500 mr-3 dark:text-dark-base-100 dark:stroke-black"
          type={'chart' as IconType}
          size={IconSize.LARGE}
        />
        <label
          htmlFor="switch"
          className={`switch ${isDarkMode ? 'dark' : 'light'}`}
          onClick={toggleDarkMode}
          onKeyDown={toggleDarkMode}
          tabIndex={0}
        >
          <input
            checked={isDarkMode}
            className="hidden"
            name="switch"
            type="checkbox"
          />
          <span className="slider" />
        </label>
      </div>
    </div>
  );
}

Header.displayName = 'Header';

export default Header;
