import { createGlobalStyle } from "styled-components";
import background from "../assets/background.jpg";

const GlobalStyles = createGlobalStyle`
body {
  background-color: white;
  
  
  &:after {
    background: url(${background});
    background-size: cover;
    content: "";
    opacity: 0.2;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: -1;   
  }
    
}
`;

export default GlobalStyles;
