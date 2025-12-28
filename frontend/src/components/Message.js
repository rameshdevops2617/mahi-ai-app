const Message = ({ sender, text }) => {
  return (
    <div className={`message-row ${sender}`}>
      <div className="message-bubble">{text}</div>
    </div>
  );
};

export default Message;
