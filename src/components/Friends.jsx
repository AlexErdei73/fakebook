import React from "react";
import { Card, Row } from "react-bootstrap";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { Link, useRouteMatch } from "react-router-dom";
import FriendCard from "./FriendCard";

const Friends = (props) => {
  const firestore = useFirestore();
  const usersCollection = firestore.collection("users");

  const { data: users } = useFirestoreCollectionData(usersCollection, {
    idField: "userID",
  });

  const { url } = useRouteMatch();

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <Link to={url} className="text-body">
            <b>Friends</b>
          </Link>
        </Card.Title>

        <Row>
          {users.map((user, index) => {
            return <FriendCard user={user} key={index} />;
          })}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Friends;
