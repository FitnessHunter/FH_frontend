import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/RootStore";
import Notification from "./Notification";

import "./Notification.scss";

const NotificationContainer = observer(() => {
  const { notificationStore } = useStore();

  return (
    <div className="notification-container">
      {notificationStore.notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  );
});

export default NotificationContainer;
