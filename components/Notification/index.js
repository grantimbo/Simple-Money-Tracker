import { useContext, useEffect } from "react";
import { Context } from "../../support/globalState";
import NotificationCard from "./NotificationCard";

const Notification = () => {
  const ctx = useContext(Context);

  const killNotification = (arrayIndex) => {
    const snapshot = [...ctx.notifications];
    snapshot.splice(arrayIndex, 1);
    ctx.set("notifications", snapshot);
  };

  const notifType = (e) => {
    switch (e.notificationType) {
      case "success":
        return <NotificationCard text={e.notificationText} type={`success`} />;
      case "error":
        return <NotificationCard text={e.notificationText} type={`error`} />;
      case "info":
        return <NotificationCard text={e.notificationText} type={`info`} />;
    }
  };

  useEffect(() => {
    if (ctx.notifications.length > 0) {
      const timer = setTimeout(() => {
        let snapshot = [...ctx.notifications];
        snapshot.shift();
        ctx.set("notifications", snapshot);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [ctx?.notifications]);

  return (
    <>
      {ctx.notifications.length > 0 && (
        <div className="fixed z-50 left-2 bottom-4 flex flex-col-reverse gap-2 md:left-10 md:bottom-16">
          {ctx.notifications.map((e, c) => {
            return (
              <div key={c} onClick={() => killNotification(c)}>
                {notifType(e)}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Notification;
