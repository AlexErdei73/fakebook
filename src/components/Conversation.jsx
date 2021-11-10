import React, { useEffect, useState } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import DisplayConversation from "./DisplayConversation";

const Conversation = (props) => {
  const { sender, recipient } = props;

  const [conversation, setConversation] = useState([]);

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

  function getConversation(incoming, outgoing) {
    const conversation = [...incoming, ...outgoing];
    //When new message sent, it appears with timestamp null.
    //It needs to be removed and added to the end after sorting the messages in the oreder of timestamps.
    let indexOfNewMsg = -1;
    conversation.forEach((msg, index) => {
      if (!msg.timestamp) indexOfNewMsg = index;
    });
    let faultyMessages;
    if (indexOfNewMsg !== -1)
      faultyMessages = conversation.splice(indexOfNewMsg, 1);
    const sorted = conversation.sort(
      (msgA, msgB) => msgA.timestamp.toDate() - msgB.timestamp.toDate()
    );
    if (faultyMessages) sorted.push(faultyMessages[0]);
    return sorted;
  }

  useEffect(() => {
    if (statusOut === "success" && statusIn === "success") {
      setConversation(getConversation(incoming, outgoing));
    }
  }, [statusOut, statusIn, incoming, outgoing]);

  return <DisplayConversation conversation={conversation} userID={sender} />;
};

export default Conversation;
