import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number;
  setPage: (n: number) => void;
  totalPages: number;
};

const Pagination = ({ page, setPage, totalPages }: Props) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => setPage(Math.max(1, page - 1))}
        className="p-2 rounded hover:bg-gray-100 cursor-pointer"
      >
        <ChevronLeft size={16} />
      </button>
      <input
        type="number"
        min={1}
        max={totalPages}
        value={page}
        onChange={(e) =>
          setPage(Math.max(1, Math.min(totalPages, Number(e.target.value))))
        }
        className="w-12 text-center border border-gray-300 rounded py-1"
      />
      <button
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        className="p-2 rounded hover:bg-gray-100 cursor-pointer"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
