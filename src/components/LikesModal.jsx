import React from "react";
import { Modal } from "react-bootstrap";
import FriendList from "./FriendList";

const LikesModal = (props) => {
  const { show, onHide, users, likes } = props;

  const usersWhoLike = likes.map((userID) =>
    users.find((user) => user.userID === userID)
  );

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body className="overflow-hidden">
        <FriendList users={usersWhoLike} />
      </Modal.Body>
    </Modal>
  );
};

export default LikesModal;
