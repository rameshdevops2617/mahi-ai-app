import { PlusIcon, SearchIcon } from "./Icons";

const Sidebar = ({ onNewChat }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <button className="sidebar-btn" onClick={onNewChat}>
          <PlusIcon /> New chat
        </button>
        <button className="sidebar-btn">
          <SearchIcon /> Search chats
        </button>
      </div>

      <div className="sidebar-title">Your chats</div>

      <div className="sidebar-chats">
        <div className="chat-item">AI DevOps Project</div>
        <div className="chat-item">AWS DevOps Resume</div>
        <div className="chat-item">Kubernetes Practice</div>
      </div>

      <div className="sidebar-footer">
        <div className="user-avatar">M</div>
        <div className="user-name">Mahi</div>
      </div>
    </div>
  );
};

export default Sidebar;
