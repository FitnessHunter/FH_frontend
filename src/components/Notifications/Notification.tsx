import React, { useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/RootStore";
import { INotification } from "../../stores/NotificationStore";
import { usePauseResumeTimeout, useSwipe } from "../../hooks/DefaultHooks";
import Transition from "../Elements/Transition/Transition";

interface Props {
  notification: INotification;
}

const Notification = observer(({ notification }: Props) => {
  const { notificationStore } = useStore();

  const ref = useRef<HTMLDivElement>(null);
  const animationDuration = useRef(300);

  const [exit, setExit] = useState(false);

  const popNotification = () => {
    setExit(true);

    setTimeout(
      () => notificationStore.popNotification(notification),
      animationDuration.current
    );
  };

  const { pause, resume } = usePauseResumeTimeout(
    popNotification,
    notification.timeout + 2 * animationDuration.current
  );

  const { x1, x2, catched, mouseDown, touchStart } = useSwipe(popNotification);

  return (
    <Transition animationClass="notification" exit={exit}>
      <div
        ref={ref}
        className={`notification-container__notification notification notification_${notification.type} text pointer`}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onMouseDown={mouseDown}
        onTouchStart={touchStart}
        style={{
          transform: catched ? `translateX(${x2 - x1}px)` : "none",
          transition: catched
            ? "none"
            : `transform ${animationDuration.current}ms`,
        }}
      >
        {notification.text}
      </div>
    </Transition>
  );
});

export default Notification;
