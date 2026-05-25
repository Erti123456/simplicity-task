import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import CategoryFilter from "./CategoryFilter";

type Props = {
  search: string;
  onSearchChange: (val: string) => void;
  category: string;
  onCategoryChange: (val: string) => void;
};

const Toolbar = ({ search, onSearchChange, category, onCategoryChange }: Props) => {
  return (
    <div className="flex flex-wrap items-center justify-end gap-3 md:gap-4 mb-4">
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search..."
          className="pl-9 pr-3 py-2 border border-gray-300 rounded text-sm"
        />
      </div>
      <CategoryFilter category={category} onCategoryChange={onCategoryChange} />
      <Link to="/announcements/new">
        <button className="bg-amber-400 text-black font-bold px-5 py-2 rounded-full hover:bg-amber-500 cursor-pointer">
          Post
        </button>
      </Link>
    </div>
  );
};

export default Toolbar;
