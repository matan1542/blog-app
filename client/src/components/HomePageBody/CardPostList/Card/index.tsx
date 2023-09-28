import { FC, useMemo, useState } from "react";
import style from "./style.module.scss";
import { Post } from "../../../../types/types";
import { Avatar, Chip } from "@mui/material";
import CircleSharpIcon from "@mui/icons-material/CircleSharp";
import { v4 as uuidv4 } from "uuid";

import { formatDate, stringAvatar } from "../../../../services/util.service";
import LikesPanel from "../../../LikesPanel";
const Card: FC<{ post: Post }> = ({ post }) => {
  const { authorName, title, creationDate, tags, dislikedUsers, likedUsers } =
    post;

  const [likes, setLikes] = useState(likedUsers);
  const [dislikes, setDisLikes] = useState(dislikedUsers);
  const [isLiked, setIsLiked] = useState(false);
  const likeNumber = useMemo(() => {
    return;
  }, [post]);

  const handleLike = () => {};

  const handleDislike = () => {};

  return (
    <div className={style.cardContainer}>
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
          dislikedUsers={dislikedUsers as number}
          likedUsers={likedUsers as number}
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
