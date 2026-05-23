import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import AnnouncementsList from "./pages/AnnouncementsList";
import AnnouncementForm from "./pages/AnnouncementForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/announcements" element={<AnnouncementsList />} />
          <Route path="/announcements/new" element={<AnnouncementForm />} />
          <Route path="/announcements/:id" element={<AnnouncementForm />} />
        </Route>
        <Route path="/" element={<Navigate to="/announcements" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
