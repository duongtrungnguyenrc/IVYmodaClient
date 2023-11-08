import { ReactNode, Fragment } from "react";
import "./GlobalStyles.scss";

const GlobalStyles = ({ children } : { children: ReactNode }) => {
    return  <Fragment>{ children }</Fragment>
}

export default GlobalStyles;