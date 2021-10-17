import React from "react";
import { Card, Button } from "react-bootstrap";
import { StorageImage, useFirestore } from "reactfire";
import ProfileLink from "./ProfileLink";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

const DisplayPost = (props) => {
  const { post, postID, users, userID, ...rest } = props;

  const firestore = useFirestore();

  //We avoid error if post is undefind
  if (!post) return <></>;

  const user = users.find((user) => user.userID === post.userID);

  const postRef = firestore.collection("posts").doc(postID);

  function updatePost(post) {
    postRef.update(post);
  }

  function index() {
    return post.likes.indexOf(userID);
  }

  function isLiked() {
    return !(index() === -1);
  }

  function handleClick() {
    const likes = post.likes;
    const index = likes.indexOf(userID);
    if (index === -1) likes.push(userID);
    else likes.splice(index, 1);
    updatePost({ likes: likes });
  }

  return (
    <Card {...rest}>
      <Card.Header>
        <ProfileLink user={user} size="40" fullname="true" bold="true" />
        <span
          style={{
            fontSize: "12px",
          }}
        >
          {post.timestamp && post.timestamp.toDate().toLocaleString()}
        </span>
      </Card.Header>
      <Card.Body>
        <Card.Text>{post.text}</Card.Text>
        {post.isPhoto && (
          <StorageImage alt="" storagePath={post.photoURL} className="w-100" />
        )}
      </Card.Body>
      <Card.Footer>
        <Button variant="link" className="text-muted">
          <AiFillLike
            className="bg-primary text-light mr-2"
            style={{ borderRadius: "50%" }}
          />
          {post.likes.length}
        </Button>
        <hr />
        <Button
          variant="light"
          className={`${isLiked() ? "text-primary" : "text-muted"} w-50`}
          onClick={handleClick}
        >
          {isLiked() ? (
            <AiFillLike size="22px" />
          ) : (
            <AiOutlineLike size="22px" />
          )}
          <b> Like</b>
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default DisplayPost;
