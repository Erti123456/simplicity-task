import { useParams } from "react-router-dom";

const AnnouncementForm = () => {
  const { id } = useParams();
  return <h1>{id ? `Edit announcement ${id}` : "Create announcement"}</h1>;
};

export default AnnouncementForm;
