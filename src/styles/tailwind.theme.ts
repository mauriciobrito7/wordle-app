const customTheme = {
  screens: {
    sm: '480px',
    md: '720px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1440px',
    '3xl': '1920px',
  },
  extend: {
    colors: {
      primary: 'var(--primary)',
      secondary: 'var(--secondary)',
      'gray-100': 'var(--gray-100)',
      'gray-200': 'var(--gray-200)',
      'gray-300': 'var(--gray-300)',
      'gray-400': 'var(--gray-400)',
      'gray-500': 'var(--gray-500)',
      black: 'var(--black)',
      white: 'var(--white)',
      'white-100': 'var(--white-100)',
      'white-200': 'var(--white-200)',
      'white-300': 'var(--white-300)',
      'base-100': 'var(--base-100)',
      'base-200': 'var(--base-200)',
      'dark-100': 'var(--dark-100)',
      'dark-200': 'var(--dark-200)',
      'dark-gray-100': 'var(--dark-gray-100)',
      'dark-gray-200': 'var(--dark-gray-200)',
      'dark-gray-300': 'var(--dark-gray-300)',
      'dark-base-100': 'var(--dark-base-100)',
    },
    fontFamily: {
      roboto: ['var(--font-roboto)'],
    },
    fontSize: {
      '8xl': 'var(--8xl)',
      '7xl': 'var(--7xl)',
      '6xl': 'var(--6xl)',
      '4xl': 'var(--4xl)',
      h2xl: 'var(--h2xl)',
      '3xl': 'var(--3xl)',
      subtext: 'var(--subtext)',
      '2xl': 'var(--2xl)',
      xl: 'var(--xl)',
      lg: 'var(--lg)',
      base: 'var(--base)',
      sm: 'var(--sm)',
      xs: 'var(--xs)',
    },
    height: {
      100: '28rem', // 448px
      104: '32rem', // 512px
      108: '36rem', // 576px
      112: '40rem', // 640px
      116: '44rem', // 704px
      120: '48rem', // 768px
      124: '52rem', // 832px
      128: '56rem', // 896px
    },
    width: {
      100: '28rem', // 448px
      104: '32rem', // 512px
      108: '36rem', // 576px
      112: '40rem', // 640px
      116: '44rem', // 704px
      120: '48rem', // 768px
      124: '52rem', // 832px
      128: '56rem', // 896px
    },
    minHeight: {
      100: '28rem', // 448px
      104: '32rem', // 512px
      108: '36rem', // 576px
      112: '40rem', // 640px
      116: '44rem', // 704px
      120: '48rem', // 768px
      124: '52rem', // 832px
      128: '56rem', // 896px
    },
    maxHeight: {
      100: '28rem', // 448px
      104: '32rem', // 512px
      108: '36rem', // 576px
      112: '40rem', // 640px
      116: '44rem', // 704px
      120: '48rem', // 768px
      124: '52rem', // 832px
      128: '56rem', // 896px
    },
  },
};

// eslint-disable-next-line import/prefer-default-export
export const theme = customTheme;
