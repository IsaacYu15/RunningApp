import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import History from "./pages/history";
import Home from "./pages/home";
import Login from "./pages/login";
import Record from "./pages/record";
import {Route as RouteNames} from "./constants/routes";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteNames.HOME} element={<Home/>} />
        <Route path={RouteNames.HISTORY} element={<History/>} />
        <Route path={RouteNames.LOGIN} element={<Login/>} />
        <Route path={RouteNames.RECORD} element={<Record/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
