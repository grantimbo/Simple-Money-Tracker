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

  const income = ctx?.profile?.category?.income || [];
  const expense = ctx?.profile?.category?.expense || [];

  return (
    <>
      <section className="grid grid-cols-2 gap-2 w-8/12 mb-6">
        <CategoryCard title={`Expenses`} catList={expense} />
        <CategoryCard title={`Income`} catList={income} />
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
