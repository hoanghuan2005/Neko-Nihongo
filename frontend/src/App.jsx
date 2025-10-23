import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import LearnPage from "./pages/LearnPage.jsx";
import PetZonePage from "./pages/PetZonePage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import LessonListPage from "./pages/LessonListPage.jsx";
import NekoChatPage from "./pages/NekoChatPage.jsx";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/pet" element={<PetZonePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/learn/:skill" element={<LessonListPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/neko-chat" element={<NekoChatPage />} />
    </Routes>
  );
}

export default App;
