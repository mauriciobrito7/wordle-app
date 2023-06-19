export type Color = 'gray' | 'green' | 'yellow';
export type KeyColor = { [key: string]: Color };
export type Guess = { key: string; color: Color }[];
