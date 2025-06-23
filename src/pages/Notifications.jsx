import React, { useState } from "react";
import ManuelNotifIcon from "../constants/icons/ManuelNotifIcon";
import ManuelNotifications from "../components/Notifications/ManuelNotifications";
import AutoNotifications from "../components/Notifications/AutoNotifications";

const Notifications = () => {
  const [selectedTabId, setSelectedTabId] = useState(1);
  const tabButtons = [
    {
      id: 1,
      icon: <ManuelNotifIcon color={selectedTabId === 1 ? "white" : "black"} />,
      title: "Manuel Bildirimler",
    },
    {
      id: 2,
      icon: <ManuelNotifIcon color={selectedTabId === 2 ? "white" : "black"} />,
      title: "Otomatik Bildirimler",
    },
  ];
  const activeTabStyle = "bg-[#0E5239]  text-white";
  const inactiveTabStyle = "bg-transparent  text-black";

  const handleClickTab = (id) => {
    if (selectedTabId === id) return;
    setSelectedTabId(id);
  };
  return (
    <section>
      <div className="flex items-center gap-4">
        {tabButtons.map((button) => (
          <button
            key={button.id}
            onClick={() => handleClickTab(button.id)}
            className={`border border-[#0E5239] px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 cursor-pointer ${
              selectedTabId === button.id ? activeTabStyle : inactiveTabStyle
            }`}
          >
            {button.icon}
            {button.title}
          </button>
        ))}
      </div>
      {selectedTabId === 1 && <ManuelNotifications />}
      {selectedTabId === 2 && <AutoNotifications />}
    </section>
  );
};

export default Notifications;
