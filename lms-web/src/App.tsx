import { ReactElement, StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";

import { MainErrorBoundary } from "./MainErrorBoundary";
import { GlobalStyles } from "./components/common/Global.styles";
import { MainNavigator } from "./navigation/MainNavigator.component";

export function App(): ReactElement {

  return (
    <StrictMode>
      <GlobalStyles />

      <BrowserRouter>
        <MainErrorBoundary>
          <MainNavigator />
        </MainErrorBoundary>
      </BrowserRouter>
    </StrictMode>
  );
}
