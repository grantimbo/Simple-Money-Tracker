import { useState } from "react";
import Button from "../Button";
import Modal from "../Modal";
import AddItemModal from "./AddItemModal";

const AddItemButton = () => {
  const [addItem, setAddItem] = useState(false);

  return (
    <>
      <Button
        onClick={() => setAddItem(true)}
        text="Add Item"
        icon="add_circle_outline"
        additionalClasses="fixed bottom-5 right-5 z-30 md:relative md:bottom-0 md:right-0"
      >
        Add Item
      </Button>

      {addItem && (
        <Modal onClose={() => setAddItem(null)}>
          <AddItemModal setAddItem={setAddItem} />
        </Modal>
      )}
    </>
  );
};

export default AddItemButton;
