import { getRoot, Instance, IStateTreeNode, types } from "mobx-state-tree";
import { DEFAULT_NOTIFICATION_TIMEOUT } from "../utils/constants";
import { RootInstance } from "./RootStore";

let NOTIFICATION_ID = 1;

export const NotificationType = types.union(
  types.literal("default"),
  types.literal("error"),
  types.literal("success"),
  types.literal("warning")
);

export const Notification = types.model("Notification", {
  id: types.identifierNumber,
  type: NotificationType,
  text: types.optional(types.string, "default"),
  timeout: types.optional(types.number, DEFAULT_NOTIFICATION_TIMEOUT),
});

export const NotificationStore = types
  .model("NotificationStore", {
    notifications: types.optional(types.array(Notification), []),
  })
  .actions((self) => {
    const pushNotification = (
      type: INotificationType,
      text: string,
      timeout?: number
    ) => {
      const notification: INotification = {
        id: NOTIFICATION_ID++,
        text,
        type,
        timeout: timeout ?? DEFAULT_NOTIFICATION_TIMEOUT,
      };

      self.notifications.push(notification);
    };

    const popNotification = (notification: INotification) =>
      self.notifications.remove(notification);

    return { pushNotification, popNotification };
  });

export const pushNotification = (
  node: IStateTreeNode,
  type: INotificationType,
  text: string,
  timeout: number = 3000
) => {
  getRoot<RootInstance>(node).notificationStore.pushNotification(
    type,
    text,
    timeout
  );
};

export type INotificationType = Instance<typeof NotificationType>;
export interface INotification extends Instance<typeof Notification> {}
