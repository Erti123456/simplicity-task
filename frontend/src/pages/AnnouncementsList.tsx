import { useEffect, useState } from "react";
import Announcement from "../components/Announcement";
import Pagination from "../components/Pagination";
import Toolbar from "../components/Toolbar";

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
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [refetchKey, setRefetchKey] = useState(0);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleCategoryChange = (val: string) => {
    setCategory(val);
    setPage(1);
  };

  useEffect(() => {
    const getAnnouncements = async () => {
      const categoryParam = category ? `&category=${category}` : "";
      const res = await fetch(
        `http://localhost:3000/announcements?page=${page}&search=${encodeURIComponent(search)}${categoryParam}`,
      );
      const data = await res.json();
      setResponse(data);
    };
    getAnnouncements();
  }, [page, search, category, refetchKey]);

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <div className="h-[82%] w-full overflow-y-auto border-t border-gray-200">
        <h1 className="text-2xl font-bold ml-4 md:ml-10 pt-3">Announcements</h1>
        <div className="p-4 md:p-5">
          <Toolbar
            search={search}
            onSearchChange={handleSearchChange}
            category={category}
            onCategoryChange={handleCategoryChange}
          />
          <div className="hidden md:grid grid-cols-5 gap-2 py-4 border-b border-t border-gray-200 text-sm font-bold">
            <p className="text-center">Title</p>
            <p className="text-center">Publication date</p>
            <p className="text-center">Last update</p>
            <p className="text-center">Categories</p>
            <p className="text-center">Actions</p>
          </div>
          <div>
            {response === null
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="mb-3 flex flex-col gap-3 rounded-lg border border-gray-200 p-4 animate-pulse md:mb-0 md:grid md:grid-cols-5 md:gap-4 md:rounded-none md:border-0 md:border-b md:p-0 md:py-4"
                  >
                    <div className="h-4 w-32 bg-gray-200 rounded" />
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
                    onDeleted={() => setRefetchKey((k) => k + 1)}
                  />
                ))}
          </div>
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={response?.totalPages ?? 1}
      />
    </div>
  );
};

export default AnnouncementsList;
