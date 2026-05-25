import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { CATEGORY_LABELS } from "../lib/categories";

type AnnouncementData = {
  id: string;
  title: string;
  body: string;
  categories: string[];
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  announcement: AnnouncementData;
  onDeleted: () => void;
};

const Announcement = ({ announcement, onDeleted }: Props) => {
  const handleDelete = async () => {
    await fetch(`http://localhost:3000/announcements/${announcement.id}`, {
      method: "DELETE",
    });
    onDeleted();
  };

  return (
    <div className="mb-3 space-y-2 rounded-lg border border-gray-200 p-4 text-sm md:mb-0 md:grid md:grid-cols-5 md:items-center md:gap-4 md:space-y-0 md:rounded-none md:border-0 md:border-b md:p-0 md:py-4 md:text-xs">
      <div className="flex justify-between gap-4 md:block md:text-center">
        <span className="font-semibold text-gray-500 md:hidden">Title</span>
        <span className="text-right md:text-center">{announcement.title}</span>
      </div>
      <div className="flex justify-between gap-4 md:block md:text-center">
        <span className="font-semibold text-gray-500 md:hidden">
          Publication date
        </span>
        <span className="text-right md:text-center">
          {format(new Date(announcement.publishedAt), "MM/dd/yyyy HH:mm")}
        </span>
      </div>
      <div className="flex justify-between gap-4 md:block md:text-center">
        <span className="font-semibold text-gray-500 md:hidden">
          Last update
        </span>
        <span className="text-right md:text-center">
          {format(new Date(announcement.updatedAt), "MM/dd/yyyy HH:mm")}
        </span>
      </div>
      <div className="flex justify-between gap-4 md:block md:text-center">
        <span className="font-semibold text-gray-500 md:hidden">Categories</span>
        <span className="text-right md:text-center">
          {announcement.categories.map((c) => CATEGORY_LABELS[c]).join(", ")}
        </span>
      </div>
      <div className="flex justify-end gap-2 border-t border-gray-100 pt-2 md:justify-center md:border-t-0 md:pt-0">
        <Link to={`/announcements/${announcement.id}`}>
          <button className="p-2 rounded hover:bg-yellow-200 cursor-pointer">
            <Pencil size={16} />
          </button>
        </Link>
        <button
          onClick={handleDelete}
          className="p-2 rounded hover:bg-red-200 cursor-pointer"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default Announcement;
