/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import store from "./store.js";
import { Provider } from "react-redux";
import PrivateRoute from "./components/PrivateRoute.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import GameListPage from "./pages/GameListPage.jsx";
import LeaderBoardPage from "./pages/LeaderBoardPage.jsx";
import GamePage from "./pages/GamePage.jsx";
// import { DashbaordPage } from "./pages/DashbaordPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/game-list" element={<GameListPage />} />
      <Route path="/leader-board" element={<LeaderBoardPage />} />
      <Route path="/game-page/:gameRoute" element={<GamePage />} />
      <Route path="*" element={<ErrorPage />} />

      {/* Private Route */}
      <Route path="" element={<PrivateRoute />}>
        {/* <Route path="/dashbaord" element={<DashbaordPage />} /> */}
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <RouterProvider router={router} />
    {/* </React.StrictMode> */}
  </Provider>
);
