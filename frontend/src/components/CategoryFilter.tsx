import { CATEGORY_LABELS } from "../lib/categories";

type Props = {
  category: string;
  onCategoryChange: (val: string) => void;
};

const CategoryFilter = ({ category, onCategoryChange }: Props) => {
  return (
    <select
      value={category}
      onChange={(e) => onCategoryChange(e.target.value)}
      className="px-3 py-2 border border-gray-300 rounded text-sm"
    >
      <option value="">All categories</option>
      {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
