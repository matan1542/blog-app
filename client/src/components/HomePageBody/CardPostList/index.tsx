import { FC } from "react";
import { Post } from "../../../types/types";
import Card from "./Card";
import { v4 as uuid } from "uuid";

import style from "./style.module.scss";

const CardPostList: FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <div className={style.cardPostListContainer}>
      {posts.map((post) => (
        <Card key={uuid()} post={post} />
      ))}
    </div>
  );
};
export default CardPostList;
