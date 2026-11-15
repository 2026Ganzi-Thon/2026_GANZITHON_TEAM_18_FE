import { Route, Routes } from "react-router-dom";

import IntroPage from "../features/introPage/IntroPage";
import MainPage from "../features/mainPage/MainPage";
import MessagePage from "../features/messagePage/MessagePage";
import RequestPage from "../features/requestPage/RequestPage";
import ResponseSelectionPage from "../features/responseSelectionPage/ResponseSelectionPage";
import ConversationPage from "../features/conversationPage/ConversationPage";
import { ROUTES } from "./routes.constant";

function AppRouter() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<IntroPage />} />
      <Route path={ROUTES.MAIN} element={<MainPage />} />
      <Route path={ROUTES.REQUEST} element={<RequestPage />} />
      <Route path={ROUTES.RESPONSE_SELECTION} element={<ResponseSelectionPage />} />
      <Route path={ROUTES.MESSAGE} element={<MessagePage />} />
      <Route path={ROUTES.CONVERSATION} element={<ConversationPage />} />
    </Routes>
  );
}

export default AppRouter;
