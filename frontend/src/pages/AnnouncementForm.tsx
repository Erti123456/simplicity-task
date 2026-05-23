import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import { format, parse, isValid } from "date-fns";
import { CATEGORY_LABELS } from "../lib/categories";

const categoryOptions = Object.entries(CATEGORY_LABELS).map(
  ([value, label]) => ({ value, label }),
);

const AnnouncementForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [publicationDate, setPublicationDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const loadAnnouncement = async () => {
      const res = await fetch(`http://localhost:3000/announcements/${id}`);
      const data = await res.json();
      setTitle(data.title);
      setContent(data.body);
      setCategories(data.categories);
      setPublicationDate(
        format(new Date(data.publishedAt), "MM/dd/yyyy HH:mm"),
      );
    };
    loadAnnouncement();
  }, [id]);

  const handleSubmit = async () => {
    setError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!content.trim()) {
      setError("Content is required");
      return;
    }
    if (categories.length === 0) {
      setError("At least one category is required");
      return;
    }
    const parsedDate = parse(
      publicationDate,
      "MM/dd/yyyy HH:mm",
      new Date(),
    );
    if (!isValid(parsedDate)) {
      setError("Publication date must be in MM/DD/YYYY HH:mm format");
      return;
    }

    const payload = {
      title,
      body: content,
      categories,
      publishedAt: parsedDate.toISOString(),
    };

    const url = isEdit
      ? `http://localhost:3000/announcements/${id}`
      : `http://localhost:3000/announcements`;
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setError("Failed to save announcement");
      return;
    }

    navigate("/announcements");
  };

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <div className="h-[88%] w-full border-t border-gray-200 flex justify-center items-center">
        <div className="w-full max-w-2xl px-8 space-y-8">
          <h1 className="text-2xl font-bold">
            {isEdit ? "Edit the announcement" : "Create announcement"}
          </h1>

          <div>
            <label className="text-sm text-gray-600 block mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-1">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
            />
          </div>

          <div>
            <h2 className="font-bold mb-1">Category</h2>
            <p className="text-sm text-gray-500 mb-2">
              Select category so readers know what your announcement is about.
            </p>
            <Select
              isMulti
              options={categoryOptions}
              value={categoryOptions.filter((o) =>
                categories.includes(o.value),
              )}
              onChange={(opts) => setCategories(opts.map((o) => o.value))}
              placeholder="Select categories"
            />
          </div>

          <div>
            <h2 className="font-bold mb-2">Publication date</h2>
            <input
              type="text"
              value={publicationDate}
              onChange={(e) => setPublicationDate(e.target.value)}
              placeholder="MM/DD/YYYY HH:mm"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="flex items-center justify-end gap-4">
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              onClick={handleSubmit}
              className="bg-amber-400 text-black font-bold px-6 py-2 rounded-full hover:bg-amber-500 cursor-pointer"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementForm;
