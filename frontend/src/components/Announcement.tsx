type AnnouncementData = {
  id: string;
  title: string;
  body: string;
  categories: string[];
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};

const Announcement = ({ announcement }: { announcement: AnnouncementData }) => {
  return (
    <div className="flex gap-35">
      <p>{announcement.title}</p>
      <p>{announcement.publishedAt}</p>
      <p>{announcement.updatedAt}</p>
      <p>{announcement.categories}</p>
    </div>
  );
};

export default Announcement;
