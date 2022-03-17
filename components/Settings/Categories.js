import { useState, useContext, useEffect } from "react";
import { Context } from "../../support/globalState";
import Button from "../Button";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import Modal from "../Modal";
import CategoryCard from "./CategoryCard";

const EditCategories = () => {
  const ctx = useContext(Context);
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [editCategoryModal, setEditCategoryModal] = useState(null);

  const expense = ctx?.profile?.categories?.filter((e) => e.method == 0);
  const income = ctx?.profile?.categories?.filter((i) => i.method == 1);

  return (
    <>
      <section className="grid grid-cols-2 gap-2 w-full max-w-sm mb-6">
        <CategoryCard
          title={`Expenses`}
          catList={expense}
          setEditCategoryModal={setEditCategoryModal}
        />
        <CategoryCard
          title={`Income`}
          catList={income}
          setEditCategoryModal={setEditCategoryModal}
        />
      </section>

      <Button
        onClick={() => setAddCategoryModal(true)}
        additionalClasses="w-full max-w-sm"
        text="Add Category"
        icon="add_circle_outline"
      />

      {addCategoryModal && (
        <Modal onClose={() => setAddCategoryModal(false)}>
          <AddCategory setAddCategoryModal={setAddCategoryModal} />
        </Modal>
      )}

      {editCategoryModal && (
        <Modal onClose={() => setEditCategoryModal(null)}>
          <EditCategory
            data={editCategoryModal}
            setEditCategoryModal={setEditCategoryModal}
          />
        </Modal>
      )}
    </>
  );
};

export default EditCategories;
