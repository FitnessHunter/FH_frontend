import {
  destroy,
  detach,
  getParent,
  Instance,
  SnapshotIn,
  types,
} from "mobx-state-tree";
import { createRef } from "react";
import { rootStore } from "./RootStore";
import { calculateDirection } from "../utils/methods";
import {
  DEFAULT_NOTIFICATION_ANIMATION_DURATION,
  DEFAULT_NOTIFICATION_TIMEOUT,
} from "../utils/constants";

let NOTIFICATION_ID = 1;

const NotificationType = types.union(
  types.literal("default"),
  types.literal("error"),
  types.literal("success"),
  types.literal("warning")
);

const Direction = types.union(
  types.literal("up"),
  types.literal("down"),
  types.literal("left"),
  types.literal("right")
);

const Notification = types
  .model("Notification", {
    id: types.identifierNumber,
    type: NotificationType,
    text: types.string,
    timeout: types.number,
    animationDuration: types.number,
    threshold: types.number,
    permittedDirections: types.array(Direction),
    timeoutID: types.maybe(types.frozen<NodeJS.Timeout>()),
  })
  .volatile((self) => ({
    ref: createRef<HTMLDivElement>(),
    hovered: false,
    catched: false,
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
    start: Date.now(),
    remaining: self.timeout,
  }))
  .views((self) => ({
    get styles() {
      if (self.catched) {
        return {
          transform: `translateX(${self.x2 - self.x1}px)`,
          transition: "none",
        };
      }

      return {};
    },
  }))
  .actions((self) => {
    const extract = () => {
      clearTimeout(self.timeoutID);

      getParent<INotificationStore>(self, 2).extractNotification(
        self as INotification
      );
    };

    const remove = () => {
      destroy(self);
    };

    const setHovered = (hovered: boolean) => {
      self.hovered = hovered;
    };

    const setCatched = (catched: boolean) => {
      self.catched = catched;
    };

    const setX1 = (x1: number) => {
      self.x1 = x1;
    };

    const setY1 = (y1: number) => {
      self.y1 = y1;
    };

    const setX2 = (x2: number) => {
      self.x2 = x2;
    };

    const setY2 = (y2: number) => {
      self.y2 = y2;
    };

    return {
      extract,
      remove,
      setHovered,
      setCatched,
      setX1,
      setY1,
      setX2,
      setY2,
    };
  })
  .actions((self) => {
    const pause = () => {
      clearTimeout(self.timeoutID);

      self.timeoutID = undefined;
      self.remaining -= Date.now() - self.start;
    };

    const resume = () => {
      self.start = Date.now();
      self.timeoutID = setTimeout(self.extract, self.remaining);
    };

    const mouseEnter = () => {
      self.setHovered(true);

      if (self.catched) {
        return;
      }

      pause();
    };

    const mouseLeave = () => {
      self.setHovered(false);

      if (self.catched || self.timeoutID) {
        return;
      }

      resume();
    };

    const touch = () => {
      if (self.catched) {
        return;
      }

      pause();
    };

    return { resume, mouseEnter, mouseLeave, touch };
  })
  .actions((self) => {
    const afterCreate = () => {
      self.timeoutID = setTimeout(self.extract, self.timeout);
    };

    const beforeDestroy = () => {
      clearTimeout(self.timeoutID);
    };

    const release = () => {
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("touchend", release);
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", release);

      self.setCatched(false);

      const newDirection = calculateDirection(
        self.x1,
        self.y1,
        self.x2,
        self.y2,
        self.threshold,
        self.permittedDirections
      );

      if (newDirection) {
        self.extract();
      } else if (!self.hovered) {
        self.resume();
      }
    };

    const mouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      self.setCatched(true);

      self.setX1(e.clientX);
      self.setY1(e.clientY);
      self.setX2(e.clientX);
      self.setY2(e.clientY);

      window.addEventListener("mousemove", mouseMove);
      window.addEventListener("mouseup", release);
    };

    const mouseMove = (e: MouseEvent) => {
      self.setX2(e.clientX);
      self.setY2(e.clientY);
    };

    const touchStart = (e: React.TouchEvent<HTMLDivElement>) => {
      self.touch();
      self.setCatched(true);

      self.setX1(e.targetTouches[0].clientX);
      self.setY1(e.targetTouches[0].clientY);
      self.setX2(e.targetTouches[0].clientX);
      self.setY2(e.targetTouches[0].clientY);

      window.addEventListener("touchmove", touchMove);
      window.addEventListener("touchend", release);
    };

    const touchMove = (e: TouchEvent) => {
      self.setX2(e.changedTouches[0].clientX);
      self.setY2(e.changedTouches[0].clientY);
    };

    return {
      afterCreate,
      beforeDestroy,
      release,
      mouseDown,
      touchStart,
    };
  });

export const NotificationStore = types
  .model("NotificationStore", {
    notifications: types.optional(types.array(Notification), []),
  })
  .actions((self) => {
    const addNotification = (notification: INotification) => {
      self.notifications.push(notification);
    };

    const extractNotification = (notification: INotification) => {
      detach(notification);
    };

    return { addNotification, extractNotification };
  });

export const NotificationStoreInitialState: INotificationStoreInitialState = {};

export type NotificationType = Instance<typeof NotificationType>;
export type Direction = Instance<typeof Direction>;
export interface INotification extends Instance<typeof Notification> {}
export interface INotificationStore
  extends Instance<typeof NotificationStore> {}
export interface INotificationStoreInitialState
  extends SnapshotIn<typeof NotificationStore> {}

export const showNotification = (
  text: string,
  type: NotificationType = "default",
  timeout: number = DEFAULT_NOTIFICATION_TIMEOUT,
  animationDuration: number = DEFAULT_NOTIFICATION_ANIMATION_DURATION,
  threshold: number = 100,
  permittedDirections: Direction[] = ["left", "right"]
) => {
  const notification = Notification.create({
    id: NOTIFICATION_ID++,
    type,
    text,
    timeout,
    animationDuration,
    threshold,
    permittedDirections,
  });

  rootStore.notificationStore.addNotification(notification);
};
