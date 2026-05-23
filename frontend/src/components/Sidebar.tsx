import { Megaphone, Landmark } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="h-full w-72 bg-blue-50">
      <div>
        <div className="flex h-15 w-65 items-center gap-4 ml-3 font-bold">
          <Landmark size={18} className="text-green-700 ml-3" />
          <p className="font-bold">Test city</p>
        </div>
        <Link
          to="/announcements"
          className="cursor-pointer flex h-15 w-65 items-center gap-4 ml-3 bg-amber-100 font-bold"
        >
          <Megaphone size={18} strokeWidth={1.5} className="ml-3" />
          <p>Announcements</p>
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
