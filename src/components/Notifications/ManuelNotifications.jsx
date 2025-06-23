import React, { useState } from "react";
import ManuelNotificationsTable from "./ManuelNotificationsTable";
import AddManuelNotificationForm from "./AddManuelNotificationForm";

const ManuelNotifications = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  return showAddForm ? (
    <AddManuelNotificationForm setShowAddForm={setShowAddForm} />
  ) : (
    <ManuelNotificationsTable setShowAddForm={setShowAddForm} />
  );
};

export default ManuelNotifications;
