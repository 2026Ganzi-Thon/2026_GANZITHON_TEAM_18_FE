import { Route, Routes } from "react-router-dom";

import introPage from "../features/introPage/pages/introPage";


import { ROUTES } from "./routes.constant";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<introPage />} />
    </Routes>
  );
}

export default AppRouter;
