import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Grid, Paper, Typography } from "@mui/material";
import { Post } from "../../types/types";
import { createPost } from "../../services/post.service";

const NewPostForm = ({}) => {
  const router = useNavigate();
  const [newPost, setNewPost] = useState<Post>({
    authorName: "",
    title: "",
    content: "",
    creationDate: "",
    tags: [],
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleTagInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const tags = event.target.value.split(",").map((tag) => tag.trim());
    setNewPost({ ...newPost, tags });
  };

  const handleSubmit = async () => {
    await onCreatePost(newPost);
    // Clear the form after submitting
    setNewPost({
      authorName: "",
      title: "",
      content: "",
      creationDate: "",
      tags: [],
    });
    router("/");
  };

  const onCreatePost = async (post: Post) => {
    let currentPost = {
      ...post,
      creationDate: new Date().toISOString(),
    };

    await createPost(currentPost);
  };

  return (
    <Paper style={{ padding: "16px", flex: 1 }}>
      <Typography variant="h6" gutterBottom>
        Create a New Post
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="authorName"
            label="Author Name"
            fullWidth
            value={newPost.authorName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="title"
            label="Title"
            fullWidth
            value={newPost.title}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="content"
            label="Content"
            fullWidth
            multiline
            rows={4}
            value={newPost.content}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="tags"
            label="Tags (comma-separated)"
            fullWidth
            value={newPost.tags.join(", ")}
            onChange={handleTagInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Create Post
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default NewPostForm;
