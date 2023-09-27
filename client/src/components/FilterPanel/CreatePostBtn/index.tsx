import EditNoteIcon from "@mui/icons-material/EditNote";

import style from "./style.module.scss";
import { Link } from "react-router-dom";

const CreatePostBtn = () => {
  return (
    <Link
      className={style.createPostBtnContainer}
      to={"/new-post"}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <EditNoteIcon />
      <h2>Create</h2>
    </Link>
  );
};

export default CreatePostBtn;
