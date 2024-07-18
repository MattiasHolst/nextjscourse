import { useState } from "react";
import classes from "./NewPost.module.css";
import { PostData } from "../components/PostsList";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";

interface NewPostProps {
  onAddPost: (postdata: PostData) => void;
}

function NewPost(props: NewPostProps) {
  const [postText, setPostText] = useState("Default text");
  const [author, setAuthor] = useState("Mattias");

  function postTextHandler(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setPostText(event.target.value);
  }

  function authorChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setAuthor(event.target.value);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const postData = {
      body: postText,
      author: author,
    };
    props.onAddPost(postData);
  }
  return (
    <Modal>
      <form className={classes.form} onSubmit={handleSubmit}>
        <p>
          <label htmlFor="body">Text</label>
          <textarea id="body" required rows={3} onChange={postTextHandler} />
        </p>
        <p>
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="name"
            required
            onChange={authorChangeHandler}
          />
        </p>
        <p className={classes.actions}>
          <Link to='..' type="button">
            Cancel
          </Link>
          <button>Submit</button>
        </p>
      </form>
    </Modal>
  );
}

export default NewPost;