import { Context } from "../../support/globalState";
import { useContext } from "react";

const BarChart = ({ data }) => {
  const ctx = useContext(Context);

  const total = data.reduce((a, b) => {
    return a + b.value;
  }, 0);

  return (
    <div className="grid gap-3 p-2 pb-3 mb-6 shadow-sm bg-white rounded-md md:gap-10 md:p-6 md:pb-10 md:mb-10">
      {data?.map((e) => {
        return (
          <div key={e.category}>
            <div className="flex justify-between mb-1 font-medium text-sm md:text-xl">
              <div>
                {e?.category} - {parseInt((e?.value / total) * 100)}%
              </div>
              <div>{ctx?.profile?.currency + e?.value}</div>
            </div>

            <div
              className="h-2 bg-lime-100 rounded-full overflow-hidden w-full relative hover:opacity-80 cursor-pointer md:h-4"
              onClick={() => alert("WIP")}
            >
              <span
                className="absolute top-0 bottom-0 left-0 bg-lime-400 "
                style={{ width: `${parseInt((e?.value / total) * 100)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BarChart;
