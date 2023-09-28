import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const CreatePostBtn = () => {
  const router = useNavigate();

  const createPost = () => {
    router("/new-post");
  };
  return (
    <Button variant="contained" color="secondary" onClick={createPost}>
      Create Post
    </Button>
  );
};

export default CreatePostBtn;
