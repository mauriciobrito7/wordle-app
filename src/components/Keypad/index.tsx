import Key from '../../types/key';
import LETTERS from '../../constants/letters';

import Icon, { IconType, IconSize } from '../Icon';

const getAlignmentClass = (index: number) => {
  if (index === 0) {
    return 'justify-center';
  }
  if (index === 1) {
    return 'justify-center md:justify-end md:-ml-8';
  }

  return 'justify-center md:justify-start md:ml-5';
};

const getButtonClass = (state?: string) => {
  switch (state) {
    case 'active':
      return 'bg-primary text-white';
    case 'disabled':
      return 'bg-gray-500 text-white';
    default:
      return 'bg-gray-300 dark:bg-dark-gray-100';
  }
};

export default function Keypad() {
  const handleClick = () => {
    // eslint-disable-next-line no-console
    console.log('Click!');
  };

  const lastRow = LETTERS[LETTERS.length - 1].concat([{ key: 'delete' }]);
  const rows = [
    ...LETTERS.slice(0, LETTERS.length - 1),
    [{ key: 'enter' }, ...lastRow],
  ];

  return (
    <div className="flex flex-wrap w-full px-5 py-8 rounded-2xl bg-white-300 text-base-100 dark:bg-dark-gray-300 dark:text-dark-base-100">
      {rows.map((row: Key[], index: number) => {
        const rowKey = row.map((letter) => letter.key).join('');

        return (
          <div
            className={`flex w-full ${getAlignmentClass(index)}`}
            key={rowKey}
          >
            {row.map((letter: Key) => {
              return (
                <button
                  className={`flex justify-center items-center px-2 h-[3.18rem] m-1 rounded-md uppercase font-medium sm:px-3 md:min-w-[2.79rem] ${getButtonClass()}`}
                  key={letter.key}
                  onClick={handleClick}
                  type="button"
                >
                  {letter.key === 'delete' ? (
                    <Icon type={'delete' as IconType} size={IconSize.SMALL} />
                  ) : (
                    letter.key
                  )}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
