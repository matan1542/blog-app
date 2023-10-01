import React, { FC, useState } from "react";
import { IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

export type handleLike = () => void;
export type handleDislike = () => void;

const LikesPanel: FC<{
  likedUsers: number;
  dislikedUsers: number;
  handleLike: handleLike;
  handleDislike: handleDislike;
  isLiked: boolean;
  isDisliked: boolean;
}> = ({
  likedUsers,
  dislikedUsers,
  handleDislike,
  handleLike,
  isLiked,
  isDisliked,
}) => {
  return (
    <div>
      <IconButton
        onClick={(ev) => {
          ev.stopPropagation();
          handleLike();
        }}
        size="small"
        color="primary"
      >
        {isLiked ? (
          <ThumbUpIcon fontSize="small" />
        ) : (
          <ThumbUpOffAltIcon fontSize="small" />
        )}
      </IconButton>
      {likedUsers}
      <IconButton
        onClick={(ev) => {
          ev.stopPropagation();
          handleDislike();
        }}
        size="small"
        color="secondary"
      >
        {isDisliked ? (
          <ThumbDownIcon fontSize="small" />
        ) : (
          <ThumbDownOffAltIcon fontSize="small" />
        )}
      </IconButton>
      {dislikedUsers}
    </div>
  );
};

export default LikesPanel;
