import { useEffect, useState } from "react";
import Announcement from "../components/Announcement";

type AnnouncementData = {
  id: string;
  title: string;
  body: string;
  categories: string[];
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};

type ListResponse = {
  data: AnnouncementData[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

const AnnouncementsList = () => {
  const [response, setResponse] = useState<ListResponse | null>(null);

  useEffect(() => {
    const getAnnouncements = async () => {
      const res = await fetch("http://localhost:3000/announcements");
      const data = await res.json();
      setResponse(data);
    };
    getAnnouncements();
  }, []);
  console.log(response);

  return (
    <div className="h-screen w- flex justify-center items-center flex-col">
      <div className="h-[80%] w-full">
        <h1>Announcements</h1>
        <div>
          <div className="flex gap-35">
            <p>Title</p>
            <p>Publication date</p>
            <p>Last update</p>
            <p>Categories</p>
          </div>
          <div>
            {response === null
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex gap-35 py-3 animate-pulse">
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                  </div>
                ))
              : response.data.map((announcement) => (
                  <Announcement
                    key={announcement.id}
                    announcement={announcement}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsList;
