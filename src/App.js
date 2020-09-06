import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const MainPage = lazy(() => import("pages/MainPage"));
const CollectionsPage = lazy(() => import("pages/Collections"));
const VideoPlayerPage = lazy(() => import("pages/VideoPlayer"));

const routerBaseName = "";

const CodeSplitFallbackComponentFunc = () => <div> loading.... </div>;

export const AppEasyContext = React.createContext();

function AppRoutes() {
  return (
    <Suspense fallback={CodeSplitFallbackComponentFunc()}>
      <BrowserRouter basename={routerBaseName}>
        <Switch>
          <Route path="/collections" component={CollectionsPage} />
          <Route path="/player" component={VideoPlayerPage} />
          <Route path="/" component={MainPage} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

const ProviderWrappedApp = () => {
  const [searchText, setSearchText] = useState("");
  const [mainPageCurrPageNumber, setMainPageCurrPageNumber] = useState(1)

  return (
    <AppEasyContext.Provider value={{ searchText, setSearchText, mainPageCurrPageNumber, setMainPageCurrPageNumber }}>
      <AppRoutes />
    </AppEasyContext.Provider>
  );
};

export default ProviderWrappedApp;
