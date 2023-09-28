import { FC } from "react";
import { Post } from "../../types/types";
import CardPostList from "./CardPostList";

import style from "./style.module.scss";

const HomePageBody: FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <div className={style.homePageBodyContainer}>
      <CardPostList posts={posts} />
    </div>
  );
};

export default HomePageBody;
