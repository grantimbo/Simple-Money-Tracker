import { useState } from "react";
import UpdateItem from "./UpdateItem";
import ShowItem from "./ShowItem";

const Details = (props) => {
  const { data } = props;
  const [editItem, setEditItem] = useState(false);

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
        <ShowItem {...props} setEditItem={setEditItem} />
      ) : (
        <UpdateItem {...props} setEditItem={setEditItem} />
      )}
    </>
  );
};

export default Details;
