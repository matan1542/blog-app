import { FC } from "react";
import { Post } from "../../../types/types";
import Card from "./Card";

import style from "./style.module.scss";

const CardPostList: FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <div className={style.cardPostListContainer}>
      {posts.map((post) => (
        <Card post={post} />
      ))}
    </div>
  );
};
export default CardPostList;
