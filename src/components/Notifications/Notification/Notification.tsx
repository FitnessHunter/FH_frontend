import React from "react";
import { observer } from "mobx-react-lite";
import { INotification } from "../../../stores/NotificationStore";

interface NotificationProps {
  notification: INotification;
}

const Notification = observer(({ notification }: NotificationProps) => {
  return (
    <div
      ref={notification.ref}
      className={`notification-container__notification notification notification_${notification.type} text pointer`}
      onMouseEnter={notification.mouseEnter}
      onMouseLeave={notification.mouseLeave}
      onMouseDown={notification.mouseDown}
      onTouchStart={notification.touchStart}
      style={notification.styles}
    >
      {notification.text}
    </div>
  );
});

export default Notification;
