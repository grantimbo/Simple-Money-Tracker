import { useState, useContext, useEffect } from "react";
import { months } from "../support/months";
import { Context } from "../support/globalState";
import { getDoc, doc, getFirestore, collection } from "firebase/firestore";

const DateSelector = () => {
  const ctx = useContext(Context);
  const { set, uid, monthData } = ctx;

  useEffect(() => {
    const getData = async () => {
      const db = getFirestore();

      const citiesRef = collection(db, `users/${uid}/data`);
      const docSnap = await getDoc(doc(citiesRef, monthData));

      if (docSnap.exists()) {
        set("data", docSnap.data().data);
        set("total", docSnap.data().total);
      } else {
        set("data", []);
        set("total", {
          income: 0,
          expense: 0,
          balance: 0,
        });
      }
    };
    getData();
  }, [ctx.monthData]);

  return (
    <div className="relative">
      <span className="absolute top-0 bottom-0 right-0 w-8 flex items-center ">
        <span className="material-icons-round text-gray-300">
          keyboard_arrow_down
        </span>
      </span>
      <select
        onChange={(e) => set("monthData", e?.target?.value)}
        required
        value={monthData}
        className="bg-gray-50 border-2 border-gray-200 text-gray-900 focus:outline-gray-400 text hover:bg-opacity-80  px-5 py-2 pr-9 rounded-full appearance-none w-full"
      >
        {months?.map((m) => {
          return (
            <option key={m.value} value={m.value}>
              {m.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DateSelector;
