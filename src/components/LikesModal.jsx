import React from "react";
import { Modal } from "react-bootstrap";
import FriendList from "./FriendList";
import { useSelector } from "react-redux";

const LikesModal = (props) => {
  const { show, onHide, likes } = props;

  const users = useSelector((state) => state.users);

  const usersWhoLike = likes.map((userID) =>
    users.find((user) => user.userID === userID)
  );

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title className="text-primary">All</Modal.Title>
      </Modal.Header>
      <Modal.Body className="overflow-hidden">
        <FriendList users={usersWhoLike} variant="modal" />
      </Modal.Body>
    </Modal>
  );
};

export default LikesModal;
