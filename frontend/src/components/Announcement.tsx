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
    <div className="grid grid-cols-5 gap-4 py-4 border-b border-gray-200 text-xs">
      <p className=" text-center">{announcement.title}</p>
      <p className="text-center">
        {format(new Date(announcement.publishedAt), "MM/dd/yyyy HH:mm")}
      </p>
      <p className="text-center">
        {format(new Date(announcement.updatedAt), "MM/dd/yyyy HH:mm")}
      </p>
      <p className="text-center">
        {announcement.categories.map((c) => CATEGORY_LABELS[c]).join(", ")}
      </p>
      <div className="flex gap-2 justify-center">
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
