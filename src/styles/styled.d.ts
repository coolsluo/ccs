import 'styled-components';
declare module 'styled-components' {
  export interface DefaultTheme {
    mode: 'light' | 'dark';
    bg: string;
    card: string;
    text: string;
    primary: string;
  }
}