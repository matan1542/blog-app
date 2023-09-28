import { FC } from "react";
import NewPostForm from "../../components/NewPostForm";
import NewPostHeader from "../../components/NewPostHeader";

import style from "./style.module.scss";
import { useAppContext } from "../../store/appContext";

const NewPost = () => {
  return (
    <div className={style.newPostContainer}>
      <NewPostHeader />
      <NewPostForm/>
    </div>
  );
};

export default NewPost;
