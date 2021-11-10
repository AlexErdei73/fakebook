import React, { useEffect } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

const Conversation = (props) => {
  const { sender, recipient } = props;

  const firestore = useFirestore();
  const messagesRef = firestore.collection("messages");

  const { status: statusOut, data: outgoing } = useFirestoreCollectionData(
    messagesRef
      .where("sender", "==", sender)
      .where("recipient", "==", recipient)
      .orderBy("timestamp"),
    { idField: "messageID" }
  );

  const { status: statusIn, data: incoming } = useFirestoreCollectionData(
    messagesRef
      .where("sender", "==", recipient)
      .where("recipient", "==", sender)
      .orderBy("timestamp"),
    { idField: "messageID" }
  );

  function conversation(incoming, outgoing) {
    const conversation = [...incoming, ...outgoing];
    return conversation.sort(
      (msgA, msgB) => msgA.timestamp.toDate() - msgB.timestamp.toDate()
    );
  }

  useEffect(() => {
    if (statusOut === "success" && statusIn === "success") {
      console.log("conversation: ", conversation(incoming, outgoing));
    }
  }, [statusOut, statusIn]);

  return <></>;
};

export default Conversation;
