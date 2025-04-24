import { HashRouter, Route, Routes } from "react-router";
import { EditionPage } from "./components/translator/EditionPage";
import { NewProfile } from "./components/translator/pages/profile/NewProfile";
import { Profile } from "./components/translator/pages/profile/Profile";
import { NavBar } from './components/translator/navbar/NavBar';

export const AppRouter = () => {


  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<NavBar />} />
          <Route path="translators">
            <Route path="board" element={<NewProfile />} />
            <Route path="edition" element={<EditionPage />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          
        </Routes>
      </HashRouter>
    </>
  );
};

//