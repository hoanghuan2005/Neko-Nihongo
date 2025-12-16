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
import FlashcardsPage from "./pages/FlashcardsPage.jsx";
import ChatSupportPage from "./pages/ChatSupportPage.jsx";
import FriendsPage from "./pages/FriendsPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ManageLessonsPage from "./pages/admin/ManageLessons.jsx";
import ManageUsers from "./pages/admin/ManageUsers.jsx";
import CreateLesson from "./pages/admin/CreateLesson.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/flashcards" element={<FlashcardsPage />} />
        <Route path="/pet" element={<PetZonePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/support" element={<ChatSupportPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/lessons" element={<ManageLessonsPage />} />
          <Route path="/admin/create" element={<CreateLesson />} />
        </Route>
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
