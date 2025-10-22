import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import LearnPage from "./pages/LearnPage.jsx";
import PetZonePage from "./pages/PetZonePage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/learn" element={<LearnPage />} />
      <Route path="/pet" element={<PetZonePage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
