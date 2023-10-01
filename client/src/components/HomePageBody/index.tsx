import { FC } from "react";
import { Post } from "../../types/types";
import CardPostList from "./CardPostList";

import style from "./style.module.scss";
import PostFilterContainer from "../PostFilterContainer";

const HomePageBody: FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <div className={style.homePageBodyContainer}>
      <PostFilterContainer
        onFilter={() => null}
        searchText=""
        setSearchText={() => null}
        setTagFilter={() => null}
        sortDir=""
        tagFilter={[""]}
        toggleSortDir={() => null}
      />
      <CardPostList posts={posts} />
    </div>
  );
};

export default HomePageBody;
