import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

const MainPage = lazy(() => import("pages/MainPage"));

const routerBaseName = "";

const CodeSplitFallbackComponentFunc = () => (
  <div> loading.... </div>
)

function App() {
  return (
    <Suspense
      fallback={CodeSplitFallbackComponentFunc()}
    >
      <BrowserRouter basename={routerBaseName}>
        <Switch>
          <Route path="/" component={MainPage} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
