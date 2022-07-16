import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        font-family: "Open Sans", sans-serif;
    }
    
    :root {
        --primary-color: #495057;
        --primary-hover: #5B636A;
        --secondary-color: #f99c23;
        --secondary-hover: #faaa25;
        --background: #343a40;
    }
`;
