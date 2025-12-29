import "./Sidebar.css";

export default function Sidebar({ onNewChat }) {
  return (
    <div className="sidebar">
      <div className="logo">🤖 MAHI AI</div>
      <button className="new-chat" onClick={onNewChat}>
        + New chat
      </button>
    </div>
  );
}
