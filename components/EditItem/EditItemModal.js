import { useState } from "react";
import UpdateItem from "./UpdateItem";
import ShowItem from "./ShowItem";

const Details = ({ data, setShowDetails }) => {
  const [editItem, setEditItem] = useState(false);
  const [value, setValue] = useState(data?.value);
  const [date, setDate] = useState(data?.date);
  const [note, setNote] = useState(data?.note);

  return (
    <>
      <div className="font-medium border-b border-gray-200 pb-2 mb-4 flex items-center space-x-2">
        <span className="material-icons-round text-lg md:text-2xl">
          {data?.category?.icon && data?.category?.icon}
          {!data?.category?.name && (
            <>{data?.method == 0 ? "receipt" : "account_balance_wallet"}</>
          )}
        </span>

        <span className="text-xl font-medium md:text-3xl">
          {data?.category?.name ? (
            <>{data?.category?.name}</>
          ) : (
            <>{data?.method == 0 ? "Expense" : "Income"}</>
          )}
        </span>
      </div>

      {!editItem ? (
        <ShowItem
          value={value}
          date={date}
          note={note}
          id={data?.id}
          method={data?.method}
          setEditItem={setEditItem}
          setShowDetails={setShowDetails}
        />
      ) : (
        <UpdateItem
          value={value}
          date={date}
          note={note}
          setValue={setValue}
          setDate={setDate}
          setNote={setNote}
          id={data?.id}
          method={data?.method}
          setEditItem={setEditItem}
          setShowDetails={setShowDetails}
        />
      )}
    </>
  );
};

export default Details;
