import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { io } from "socket.io-client";
import { Toaster, toast } from "sonner";
import Layout from "./components/Layout";
import AnnouncementsList from "./pages/AnnouncementsList";
import AnnouncementForm from "./pages/AnnouncementForm";

type Announcement = { title: string };

function App() {
  useEffect(() => {
    const socket = io("http://localhost:3000");
    socket.on("announcement:created", (announcement: Announcement) => {
      toast.success(`New announcement: ${announcement.title}`);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
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
