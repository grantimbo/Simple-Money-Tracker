import { useContext, useEffect } from "react";
import { months } from "../support/months";
import { Context } from "../support/globalState";
import { getDoc, doc, getFirestore, collection } from "firebase/firestore";
import SelectWrapper from "./SelectWrapper";

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
    <SelectWrapper>
      <select
        onChange={(e) => set("monthData", e?.target?.value)}
        required
        value={monthData}
        className="bg-gray-50 border-2 border-gray-200 text-gray-900 focus:outline-gray-400 text-sm hover:bg-opacity-80  px-5 py-2 pr-9 rounded-full appearance-none w-full md:text-base"
      >
        {months?.map((m) => {
          return (
            <option key={m.value} value={m.value}>
              {m.name}
            </option>
          );
        })}
      </select>
    </SelectWrapper>
  );
};

export default DateSelector;
