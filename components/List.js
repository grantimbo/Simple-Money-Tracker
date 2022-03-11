import { useState } from "react";
import Card from "../components/Card";
import Modal from "../components/Modal";
import EditItemModal from "../components/EditItem/EditItemModal";

const List = ({ data }) => {
  const [showDetails, setShowDetails] = useState(null);

  return (
    <>
      <div className="grid gap-3">
        {data?.map((e) => {
          return (
            <div key={e?.id} onClick={() => setShowDetails(e)}>
              <Card item={e} />
            </div>
          );
        })}

        {(data?.length === 0 || !data) && (
          <div className="px-8 py-4 bg-white rounded-lg shadow-sm">No data</div>
        )}
      </div>

      {showDetails && (
        <Modal onClose={() => setShowDetails()}>
          <EditItemModal data={showDetails} setShowDetails={setShowDetails} />
        </Modal>
      )}
    </>
  );
};

export default List;
