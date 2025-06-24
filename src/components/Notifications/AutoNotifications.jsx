import React, { useState } from "react";
import AutoNotificationsTable from "./AutoNotificationsTable";
import AddAutoNotificationForm from "./AddAutoNotificationForm";

const AutoNotifications = () => {
  const [showAddForrm, setShowAddForm] = useState(false);
  return showAddForrm ? (
    <AddAutoNotificationForm setShowAddForm={setShowAddForm} />
  ) : (
    <AutoNotificationsTable setShowAddForm={setShowAddForm} />
  );
};

export default AutoNotifications;
