import React, { useEffect, useState } from "react";
import DisplayConversation from "./DisplayConversation";
import { useSelector } from "react-redux";

const Conversation = (props) => {
  const { recipient } = props;

  const [conversation, setConversation] = useState([]);

  const incomingMessages = useSelector((state) => state.incomingMessages);
  const outgoingMessages = useSelector((state) => state.outgoingMessages);

  const incoming = incomingMessages.filter(
    (message) => message.sender === recipient
  );
  const outgoing = outgoingMessages.filter(
    (message) => message.recipient === recipient
  );

  function getConversation(incoming, outgoing) {
    const conversation = [...incoming, ...outgoing];
    const sorted = conversation.sort(
      (msgA, msgB) => new Date(msgA.timestamp) - new Date(msgB.timestamp)
    );
    return sorted;
  }

  useEffect(() => {
    const newConversation = getConversation(incoming, outgoing);
    if (newConversation.length !== conversation.length)
      setConversation(newConversation);
  }, [incoming, outgoing, conversation]);

  return <DisplayConversation conversation={conversation} />;
};

export default Conversation;
