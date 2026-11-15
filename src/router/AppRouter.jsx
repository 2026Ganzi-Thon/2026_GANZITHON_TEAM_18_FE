import { Route, Routes } from "react-router-dom";

import IntroPage from "../features/introPage/IntroPage";
import MainPage from "../features/mainPage/MainPage";
import MessagePage from "../features/messagePage/MessagePage";
import RequestPage from "../features/requestPage/RequestPage";
import { ROUTES } from "./routes.constant";

function AppRouter() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<IntroPage />} />
      <Route path={ROUTES.MAIN} element={<MainPage />} />
      <Route path={ROUTES.MESSAGE} element={<MessagePage />} />
      <Route path={ROUTES.REQUEST} element={<RequestPage />} />
    </Routes>
  );
}

export default AppRouter;
