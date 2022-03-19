import { useContext } from "react";
import { Context } from "../../support/globalState";
import Button from "../Button";
import { numberWithCommas } from "../../support/formatNumber";
import { displayDate } from "../../support/parseDate";
import DeleteItem from "./DeleteItem";
import EditItemFooter from "./EditItemFooter";

const ShowItem = (props) => {
  const ctx = useContext(Context);
  const { data, setEditItem, setShowDetails } = props;

  return (
    <>
      <section className="grid gap-1 text-base md:text-lg">
        <div>
          <span>{`${data?.method == 0 ? "Expense" : "Income"}: `}</span>
          <span className="font-medium">{`${
            ctx?.profile?.currency ? ctx?.profile?.currency : "$"
          }${numberWithCommas(data?.value || 0)}`}</span>
        </div>

        <div>
          <span>{`Note: `}</span>
          <span className="font-medium">{data?.note}</span>
        </div>

        <div>
          <span>{`Category: `}</span>
          <span className="font-medium capitalize">{data?.category?.name}</span>
        </div>

        <div>
          <span>{`Date: `}</span>
          <span className="font-medium">{displayDate(data?.date)}</span>
        </div>
      </section>

      <EditItemFooter>
        <DeleteItem id={data?.id} setShowDetails={setShowDetails} />
        <Button onClick={() => setEditItem(true)} icon="edit" text="Edit" />
      </EditItemFooter>
    </>
  );
};

export default ShowItem;
