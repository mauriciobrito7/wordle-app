/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect } from 'react';

export enum ModalSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  XLARGE = 'xlarge',
  XXLARGE = '2xlarge',
  XXXLARGE = '3xlarge',
  FULL = 'full',
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: ModalSize;
  className?: string;
}

const ModalSizeCss: Record<ModalSize, string> = {
  [ModalSize.SMALL]: 'w-full md:w-96 lg:w-100 xl:w-104',
  [ModalSize.MEDIUM]: 'w-full md:w-100 lg:w-104 xl:w-108',
  [ModalSize.LARGE]: 'w-full md:w-104 lg:w-108 xl:w-112',
  [ModalSize.XLARGE]: 'w-full md:w-108 lg:w-112 xl:w-116',
  [ModalSize.XXLARGE]: 'w-full md:w-112 lg:116 xl:w-120',
  [ModalSize.XXXLARGE]: 'w-full md:w-116 lg:w-120 xl:w-124',
  [ModalSize.FULL]: ' w-full',
};

export default function Modal({
  isOpen,
  onClose,
  children,
  size = ModalSize.XXXLARGE,
  className,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.body.style.overflow = 'auto';

      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleClickOutside = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed z-50 inset-0 flex items-center justify-center backdrop-blur"
      onClick={handleClickOutside}
      tabIndex={0}
      role="button"
      aria-label="Close modal"
    >
      <div
        className={`
          z-50 h-full p-6 lg:p-8 xl:p-12
          rounded-2xl md:h-auto border border-black bg-white-300 dark:border-gray-400 dark:bg-dark-200 overflow-auto max-h-[calc(100vh-3rem)] ${
            className ?? ''
          }
          ${ModalSizeCss[size]}
        `}
      >
        {children}
      </div>
    </div>
  );
}

Modal.displayName = 'Modal';
