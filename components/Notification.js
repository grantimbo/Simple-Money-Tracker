import { useState, useContext, useEffect } from "react";
import { Context } from "../support/globalState";

const Notification = () => {
  const ctx = useContext(Context);

  const killNotification = (arrayIndex) => {
    console.log(arrayIndex);
    const snapshot = [...ctx.notifications];
    snapshot.splice(arrayIndex, 1);
    ctx.set("notifications", snapshot);
  };

  const notifType = (e) => {
    switch (e.notificationType) {
      case "success":
        return (
          <div
            className={`bg-lime-500 text-white px-6 py-4 rounded-lg space-x-2 flex items-center`}
          >
            <span className="material-icons-round text-3xl">done</span>
            <span>{e.notificationText}</span>
          </div>
        );
      case "error":
        return (
          <div className="bg-red-600 text-white px-6 py-4 rounded-lg space-x-2 flex items-center">
            <span className="material-icons-round text-3xl">error_outline</span>
            <span>{e.notificationText}</span>
          </div>
        );
      case "info":
        return (
          <div className="bg-orange-600 text-white px-6 py-4 rounded-lg space-x-2 flex items-center">
            <span className="material-icons-round text-3xl">info_outline</span>
            <span>{e.notificationText}</span>
          </div>
        );
    }
  };

  useEffect(() => {
    if (ctx.notifications.length > 0) {
      const timer = setTimeout(() => {
        let snapshot = [...ctx.notifications];
        snapshot.shift();
        ctx.set("notifications", snapshot);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [ctx.notifications]);

  return (
    <>
      {ctx.notifications.length > 0 && (
        <div className="fixed z-50 left-10 bottom-16 flex flex-col-reverse gap-2">
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
