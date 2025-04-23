import { HashRouter, Route, Routes } from "react-router";
import { EditionPage } from "./components/translator/EditionPage";
import { Profiel1 } from "./components/translator/pages/Profiel1";
import { NavBar } from './components/translator/navbar/NavBar';

export const AppRouter = () => {


  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<NavBar />} />
          <Route path="translators">
            <Route path="board" element={<Profiel1 />} />
            <Route path="edition" element={<EditionPage />} />
            {/* <Route path="profiel1" element={<Profiel1 />} /> */}
          </Route>
          
        </Routes>
      </HashRouter>
    </>
  );
};

//