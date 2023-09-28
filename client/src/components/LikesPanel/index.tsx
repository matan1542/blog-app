import React, { FC, useState } from "react";
import { IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

export type handleLike = () => void;
export type handleDislike = () => void;

const LikesPanel: FC<{
  likedUsers: number;
  dislikedUsers: number;
  handleLike: handleLike;
  handleDislike: handleDislike;
}> = ({ likedUsers, dislikedUsers, handleDislike, handleLike }) => {
  //   const [likes, setLikes] = useState(0);
  //   const [dislikes, setDislikes] = useState(0);

  return (
    <div>
      <IconButton onClick={handleLike} size="small" color="primary">
        <ThumbUpOffAltIcon fontSize="small" />
      </IconButton>
      {likedUsers}
      <IconButton onClick={handleDislike} size="small" color="secondary">
        <ThumbDownOffAltIcon fontSize="small" />
      </IconButton>
      {dislikedUsers}
    </div>
  );
};

export default LikesPanel;
