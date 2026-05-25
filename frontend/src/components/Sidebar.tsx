import { Megaphone, Landmark } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="h-full w-16 md:w-72 shrink-0 bg-blue-50">
      <div>
        <div className="flex h-15 items-center justify-center md:justify-start gap-4 md:px-6 font-bold">
          <Landmark size={18} className="text-green-700 shrink-0" />
          <p className="hidden md:block font-bold">Test city</p>
        </div>
        <Link
          to="/announcements"
          className="cursor-pointer flex h-15 items-center justify-center md:justify-start gap-4 md:px-6 bg-amber-100 font-bold"
        >
          <Megaphone size={18} strokeWidth={1.5} className="shrink-0" />
          <p className="hidden md:block">Announcements</p>
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
