import { FC } from "react";
import style from "./style.module.scss";
import { Post } from "../../../../types/types";
import { Avatar, Chip } from "@mui/material";
import CircleSharpIcon from "@mui/icons-material/CircleSharp";
import { formatDate, stringAvatar } from "../../../../services/util.service";
const Card: FC<{ post: Post }> = ({ post }) => {
  const { authorName, title, creationDate, tags } = post;
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
        {tags.map((tag) => {
          return <Chip size="small" clickable label={tag} />;
        })}
      </div>
    </div>
  );
};

export default Card;
