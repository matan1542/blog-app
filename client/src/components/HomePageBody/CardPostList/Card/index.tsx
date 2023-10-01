import { FC, useMemo, useState } from "react";
import style from "./style.module.scss";
import { Post, User } from "../../../../types/types";
import { Avatar, Chip } from "@mui/material";
import jwt from "jsonwebtoken";
import CircleSharpIcon from "@mui/icons-material/CircleSharp";
import { v4 as uuidv4 } from "uuid";

import { formatDate, stringAvatar } from "../../../../services/util.service";
import LikesPanel from "../../../LikesPanel";
import { dislikePost, likePost } from "../../../../services/post.service";
import { useAuth } from "../../../Auth";
import { useNavigate } from "react-router-dom";
const Card: FC<{ post: Post }> = ({ post }) => {
  const { isAuthenticated } = useAuth();
  const {
    authorId,
    postId,
    authorName,
    title,
    creationDate,
    tags,
    dislikedUsers,
    likedUsers,
    isLiked,
    isDisliked,
  } = post;
  const router = useNavigate();
  const [likes, setLikes] = useState(likedUsers);
  const [dislikes, setDisLikes] = useState(dislikedUsers);
  const [isUserLiked, setIsUserLiked] = useState(isLiked && isAuthenticated);
  const [isUserDisLiked, setIsUserDisLiked] = useState(
    isDisliked && isAuthenticated
  );

  const clickedPost = () => {
    router(`/${postId}`);
  };

  // const [isLiked, setIsLiked] = useState(false);
  const handleLike = async () => {
    if (!isAuthenticated) return;

    if (isUserLiked) {
      // If the user has already liked the post, remove the like
      setLikes((prevLikes) => (prevLikes as number) - 1);
      setIsUserLiked(false);
    } else {
      // If the user hasn't liked the post, add the like and remove the dislike
      setLikes((prevLikes) => (prevLikes as number) + 1);
      setIsUserLiked(true);

      if (isUserDisLiked) {
        setDisLikes((prevDislikes) => (prevDislikes as number) - 1);
        setIsUserDisLiked(false);
      }
    }

    await likePost(postId as string);
  };

  const handleDislike = async () => {
    if (!isAuthenticated) return;

    if (isUserDisLiked) {
      // If the user has already disliked the post, remove the dislike
      setDisLikes((prevDislikes) => (prevDislikes as number) - 1);
      setIsUserDisLiked(false);
    } else {
      // If the user hasn't disliked the post, add the dislike and remove the like
      setDisLikes((prevDislikes) => (prevDislikes as number) + 1);
      setIsUserDisLiked(true);

      if (isUserLiked) {
        setLikes((prevLikes) => (prevLikes as number) - 1);
        setIsUserLiked(false);
      }
    }

    await dislikePost(postId as string);
  };

  return (
    <div className={style.cardContainer} onClick={clickedPost}>
      <div className={style.cardOwnerContainer}>
        <Avatar {...stringAvatar(authorName)} />
        <h2>{authorName}</h2>
      </div>
      <div className={style.cardContentContainer}>
        <h1>{title}</h1>
      </div>
      <div className={style.cardInfoContainer}>
        <span className={style.cardDateCreation}>
          {formatDate(creationDate)}
        </span>
        <CircleSharpIcon
          fontSize="small"
          sx={{
            width: "3px",
            fill: "rgba(0, 0, 0, 0.8)",
          }}
        />
        <LikesPanel
          handleLike={handleLike}
          handleDislike={handleDislike}
          isLiked={isUserLiked as boolean}
          isDisliked={isUserDisLiked as boolean}
          dislikedUsers={dislikes as number}
          likedUsers={likes as number}
        />
        {tags.length ? (
          <>
            <CircleSharpIcon
              fontSize="small"
              sx={{
                width: "3px",
                fill: "rgba(0, 0, 0, 0.8)",
              }}
            />
            {tags.map((tag) => {
              return <Chip key={uuidv4()} size="small" clickable label={tag} />;
            })}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Card;
