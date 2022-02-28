import Router from "next/router";

export default function Overview() {
  return (
    <>
      <div className="w-full grid grid-cols-3 gap-5">
        <div
          onClick={() => Router.push(`/dash/income`)}
          className="bg-gray-50 border rounded-lg p-10"
        >
          <div className="text-3xl">3215</div>
          <div className="text-xs">Income</div>
        </div>
        <div
          onClick={() => Router.push(`/dash/expenses`)}
          className="bg-gray-50 border rounded-lg p-10"
        >
          <div className="text-3xl">3215</div>
          <div className="text-xs">Expense</div>
        </div>
        <div className="bg-gray-50 border rounded-lg p-10">
          <div className="text-3xl">321312</div>
          <div className="text-xs">Balance</div>
        </div>
      </div>
    </>
  );
}
