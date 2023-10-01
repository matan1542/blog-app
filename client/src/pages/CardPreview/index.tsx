import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  CardActions,
  CardHeader,
  Avatar,
} from "@mui/material";
import { Favorite, ThumbDown } from "@mui/icons-material";
import { Post } from "../../types/types";
import { useParams } from "react-router-dom";
import { dislikePost, getPost, likePost } from "../../services/post.service";
import LikesPanel from "../../components/LikesPanel";
import { useAuth } from "../../components/Auth";

interface CardPreviewProps {}

const CardPreview: React.FC<CardPreviewProps> = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const { isAuthenticated } = useAuth();
  const [likes, setLikes] = useState<number | undefined>(undefined);
  const [dislikes, setDislikes] = useState<number | undefined>(undefined);
  const [isUserLiked, setIsUserLiked] = useState<boolean | undefined>(
    undefined
  );
  const [isUserDisLiked, setIsUserDisLiked] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    async function fetchData() {
      const fetchedPost = await getPost(postId as string);
      setLikes(fetchedPost.likedUsers);
      setDislikes(fetchedPost.dislikedUsers);
      setIsUserLiked(fetchedPost.isLiked && isAuthenticated);
      setIsUserDisLiked(fetchedPost.isDisliked && isAuthenticated);
      setPost(fetchedPost);
    }
    fetchData();
  }, [postId, isAuthenticated]);

  if (!post) return null;
  const { authorName, title, content, tags, creationDate } = post;

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
        setDislikes((prevDislikes) => (prevDislikes as number) - 1);
        setIsUserDisLiked(false);
      }
    }

    await likePost(postId as string);
  };

  const handleDislike = async () => {
    if (!isAuthenticated) return;

    if (isUserDisLiked) {
      // If the user has already disliked the post, remove the dislike
      setDislikes((prevDislikes) => (prevDislikes as number) - 1);
      setIsUserDisLiked(false);
    } else {
      // If the user hasn't disliked the post, add the dislike and remove the like
      setDislikes((prevDislikes) => (prevDislikes as number) + 1);
      setIsUserDisLiked(true);

      if (isUserLiked) {
        setLikes((prevLikes) => (prevLikes as number) - 1);
        setIsUserLiked(false);
      }
    }

    await dislikePost(postId as string);
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="author">{authorName?.toUpperCase()}</Avatar>
        }
        title={authorName}
        subheader={creationDate}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {content}
        </Typography>
        <div>
          {tags.map((tag, index) => (
            <Chip key={index} label={tag} />
          ))}
        </div>
      </CardContent>
      <CardActions>
        <LikesPanel
          handleLike={handleLike}
          handleDislike={handleDislike}
          isLiked={isUserLiked as boolean}
          isDisliked={isUserDisLiked as boolean}
          dislikedUsers={dislikes as number}
          likedUsers={likes as number}
        />
      </CardActions>
    </Card>
  );
};

export default CardPreview;
