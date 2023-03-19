import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Frame from "./component/Frame/Frame";
import AdminPage from "./component/Pages/adminPage/adminPage";
import ChafPage from "./component/Pages/ChefPage/ChefPage";
import HomePage from "./component/Pages/HomePage/HomePage";
import RestaurantProfilePages from "./component/Pages/ProfileResturantPage/ProfileResturantPage";
import Resturants from "./component/Pages/ResturantsPage/ResturantsPage";
import SingINPage from "./component/Pages/SingInPage/SingInPage";
import SingUpPage from "./component/Pages/SingUpPage/SingUpPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Frame />}>
            <Route index element={<HomePage />} />
            <Route path="resturants" element={<Resturants />} />
            <Route path="resturants/:id" element={<RestaurantProfilePages />} />
            <Route path="chefs" element={<ChafPage />} />
            <Route path="singIn" element={<SingINPage />} />
            <Route path="singUp" element={<SingUpPage />} />
            <Route path="admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
