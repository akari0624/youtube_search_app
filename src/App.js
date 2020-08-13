import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./css/App.css";

const MainPage = lazy(() => import("pages/MainPage"));
const CollectionsPage = lazy(() => import("pages/Collections"));

const routerBaseName = "";

const CodeSplitFallbackComponentFunc = () => <div> loading.... </div>;

export const AppEasyContext = React.createContext();

function AppRoutes() {
  return (
    <Suspense fallback={CodeSplitFallbackComponentFunc()}>
      <BrowserRouter basename={routerBaseName}>
        <Switch>
          <Route path="/collections" component={CollectionsPage} />
          <Route path="/" component={MainPage} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

const ProviderWrappedApp = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <AppEasyContext.Provider value={{ searchText, setSearchText }}>
      <AppRoutes />
    </AppEasyContext.Provider>
  );
};

export default ProviderWrappedApp;
