import { HashRouter, Route, Routes } from "react-router";
import { useState } from "react";

import { EditionPage } from "./components/translator/EditionPage";
import { NewProfile } from "./components/translator/pages/profile/NewProfile";
import { Profile } from "./components/translator/pages/profile/Profile";
import { NavBar } from './components/translator/navbar/NavBar';
import { Login } from "./components/translator/pages/login/Login";

import {ProctecdRouter} from "./components/auth/ProctecdRouter"

export const AppRouter = () => {


  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<NavBar />} />
          <Route path="login" element={<Login onLogin={handleLogin} />} /> 

          <Route element={<ProctecdRouter isAuthenticated={isAuthenticated} redirectPath="/login" />}>
          <Route path="translators">
            <Route path="board" element={<NewProfile />} />
            <Route path="edition" element={<EditionPage />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          </Route>   
           
        </Routes>
      </HashRouter>
    </>
  );
};

//