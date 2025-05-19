import { BrowserRouter, Routes, Route } from "react-router-dom";
import History from "./pages/history";
import Home from "./pages/home";
import Login from "./pages/register";
import Record from "./pages/record";
import { Routes as RouteNames } from "./constants/routes";

import "./App.css";
import Navbar from "./components/navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path={RouteNames.HOME} element={<Home />} />
        <Route path={RouteNames.HISTORY} element={<History />} />
        <Route path={RouteNames.LOGIN} element={<Login />} />
        <Route path={RouteNames.RECORD} element={<Record />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
