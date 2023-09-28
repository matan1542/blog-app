import { FC, useEffect, useState } from "react";
import HomeHeader from "../../components/Header";
// import { postsMockData } from "../../mocks/mock";
import { Post } from "../../types/types";
import HomePageBody from "../../components/HomePageBody";
import { getPosts } from "../../services/post.service";
import Loader from "../../components/Loader";

const Home: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const fetchedPosts = await getPosts();
      setIsLoading(false);
      setPosts(fetchedPosts);
    }

    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <HomePageBody posts={posts} />
    </div>
  );
};

export default Home;
