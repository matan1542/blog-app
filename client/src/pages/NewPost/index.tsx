import NewPostForm from "../../components/NewPostForm";

import style from "./style.module.scss";

const NewPost = () => {
  return (
    <div className={style.newPostContainer}>
      <NewPostForm />
    </div>
  );
};

export default NewPost;
