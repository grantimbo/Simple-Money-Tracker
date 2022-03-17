import { useContext } from "react";
import { Context } from "../../support/globalState";
import Button from "../Button";
import { numberWithCommas } from "../../support/formatNumber";
import { displayDate } from "../../support/parseDate";
import DeleteItem from "./DeleteItem";
import EditItemFooter from "./EditItemFooter";

const ShowItem = (props) => {
  const ctx = useContext(Context);
  const { id, value, note, date, method, setEditItem, setShowDetails } = props;

  return (
    <>
      <section className="grid gap-1 text-base md:text-lg">
        <div>
          <span>{`${method == 0 ? "Expense" : "Income"}: `}</span>
          <span className="font-medium">{`${
            ctx?.profile?.currency ? ctx?.profile?.currency : "$"
          }${numberWithCommas(value || 0)}`}</span>
        </div>

        <div>
          <span>{`Note: `}</span>
          <span className="font-medium">{note}</span>
        </div>

        <div>
          <span>{`Date: `}</span>
          <span className="font-medium">{displayDate(date)}</span>
        </div>

        <div>
          <span>{`Category: `}</span>
          <span className="font-medium capitalize">
            {method == 0 ? "Expense" : "Income"}
          </span>
        </div>
      </section>

      <EditItemFooter>
        <DeleteItem id={id} setShowDetails={setShowDetails} />
        <Button onClick={() => setEditItem(true)} icon="edit" text="Edit" />
      </EditItemFooter>
    </>
  );
};

export default ShowItem;
