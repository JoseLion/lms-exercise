import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html, body, #root {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    margin: 0;
    width: 100%;
  }
`;
