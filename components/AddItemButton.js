import { useState } from "react";
import Button from "../components/Button";
import Modal from "../components/Modal";
import AddItem from "../components/AddItem";

const AddItemButton = () => {
  const [addItem, setAddItem] = useState(false);

  return (
    <>
      <Button
        onClick={() => setAddItem(true)}
        setAddItem={setAddItem}
        text="Add Item"
        icon="add_circle_outline"
        additionalClasses="my-8"
      >
        Add Item
      </Button>

      {addItem && (
        <Modal onClose={() => setAddItem(null)}>
          <AddItem setAddItem={setAddItem} />
        </Modal>
      )}
    </>
  );
};

export default AddItemButton;
