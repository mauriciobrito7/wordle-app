/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from 'react';
import Icon, { IconType, IconSize } from '../Icon';
import Modal, { ModalSize } from '../Modal';

interface HeaderProps {
  className?: string;
  toggleDarkMode?: () => void;
  isDarkMode?: boolean;
}

const firstExample = [
  { key: 1, letter: 'g', style: 'green' },
  { key: 2, letter: 'a', style: 'default' },
  { key: 3, letter: 't', style: 'default' },
  { key: 4, letter: 'o', style: 'default' },
  { key: 5, letter: 's', style: 'default' },
];

const secondExample = [
  { key: 1, letter: 'v', style: 'default' },
  { key: 2, letter: 'o', style: 'default' },
  { key: 3, letter: 'c', style: 'yellow' },
  { key: 4, letter: 'a', style: 'default' },
  { key: 5, letter: 'l', style: 'default' },
];

const thirdExample = [
  { key: 1, letter: 'c', style: 'default' },
  { key: 2, letter: 'a', style: 'default' },
  { key: 3, letter: 'n', style: 'default' },
  { key: 4, letter: 't', style: 'default' },
  { key: 5, letter: 'o', style: 'gray' },
];

const getLetterStyle = (style?: string) => {
  switch (style) {
    case 'green':
      return 'bg-primary';
    case 'gray':
      return 'bg-gray-500';
    case 'yellow':
      return 'bg-secondary';
    default:
      return 'border border-black bg-white dark:bg-dark-200 dark:border-gray-400';
  }
};

function Header({ className, toggleDarkMode, isDarkMode }: HeaderProps) {
  const [showModal, setShowModal] = useState(true);
  return (
    <div
      className={`flex w-full justify-between items-center px-5 py-4 rounded-2xl bg-white-300 mb-20 dark:bg-dark-gray-300 dark:text-dark-base-100 ${
        className ?? ''
      }`}
    >
      <button type="button" onClick={() => setShowModal((prev) => !prev)}>
        <Icon
          className="text-gray-500 dark:text-dark-base-100"
          type={'circle-question' as IconType}
        />
      </button>
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
          tabIndex={0}
        >
          <input
            checked={isDarkMode}
            className="hidden"
            name="switch"
            type="checkbox"
            onChange={toggleDarkMode}
          />
          <span className="slider" />
        </label>
      </div>
      <Modal
        size={ModalSize.MEDIUM}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <h2 className="text-center text-lg md:text-subtext mb-8">Cómo jugar</h2>
        <p className="leading-6	mb-4">
          Adivina la palabra oculta en cinco intentos.
        </p>

        <p className="leading-6	mb-4">
          {' '}
          Cada intento debe ser una palabra válida de 5 letras.{' '}
        </p>

        <p className="leading-6	mb-4">
          Después de cada intento el color de las letras cambia para mostrar qué
          tan cerca estás de acertar la palabra.
        </p>
        <h3 className="mb-5 text-base md:text-lg">Ejemplos</h3>
        <div className="flex gap-4 mb-5">
          {firstExample.map((example) => (
            <div
              key={example.key}
              className={`flex justify-center items-center rounded-md uppercase text-subtext font-bold w-[4.75rem] h-[4.75rem] ${getLetterStyle(
                example.style
              )}`}
            >
              {example.letter}
            </div>
          ))}
        </div>
        <p className="leading-6	mb-4">
          La letra <strong>G</strong> está en la palabra y en la posición
          correcta.
        </p>
        <div className="flex gap-4 mb-5">
          {secondExample.map((example) => (
            <div
              key={example.key}
              className={`flex justify-center items-center rounded-md uppercase text-subtext font-bold w-[4.75rem] h-[4.75rem] ${getLetterStyle(
                example.style
              )}`}
            >
              {example.letter}
            </div>
          ))}
        </div>
        <p className="leading-6	mb-4">
          La letra <strong>C</strong> está en la palabra pero en la posición
          incorrecta.
        </p>
        <div className="flex gap-4 mb-5">
          {thirdExample.map((example) => (
            <div
              key={example.key}
              className={`flex justify-center items-center rounded-md uppercase text-subtext font-bold w-[4.75rem] h-[4.75rem] ${getLetterStyle(
                example.style
              )}`}
            >
              {example.letter}
            </div>
          ))}
        </div>
        <p className="leading-6	mb-4">
          La letra <strong>O</strong> no está en la palabra.
        </p>
        <p className="leading-6	mb-4">
          Puede haber letras repetidas. Las pistas son independientes para cada
          letra.
        </p>
        <p className="text-center leading-6	mb-8">
          ¡Una palabra nueva cada 5 minutos!
        </p>
        <div className="w-full flex justify-center">
          <button
            className="bg-primary text-white px-8 py-2 rounded-md uppercase font-bold tracking-wider"
            type="button"
            onClick={() => setShowModal(false)}
          >
            ¡Jugar!
          </button>
        </div>
      </Modal>
    </div>
  );
}

Header.displayName = 'Header';

export default Header;
