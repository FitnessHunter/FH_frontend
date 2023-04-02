import React from "react";
import { observer } from "mobx-react-lite";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useStore } from "../../stores/RootStore";
import Notification from "./Notification/Notification";

import "./Notification/Notification.scss";

const NotificationContainer = observer(() => {
  const { notificationStore } = useStore();

  return (
    <div className="notification-container">
      <TransitionGroup component={null}>
        {notificationStore.notifications.map((notification) => (
          <CSSTransition
            key={notification.id}
            nodeRef={notification.ref}
            timeout={notification.animationDuration}
            classNames="notification-animation"
            onExited={notification.remove}
          >
            <Notification notification={notification} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
});

export default NotificationContainer;
