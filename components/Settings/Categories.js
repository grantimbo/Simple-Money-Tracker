import { useState, useContext, useEffect } from "react";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { Context } from "../../support/globalState";
import Button from "../Button";
import Input from "../Input";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";

const EditCategories = () => {
  const ctx = useContext(Context);
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [editCategoryModal, setEditCategoryModal] = useState(null);

  return (
    <>
      <section className="grid grid-cols-2 gap-2 w-8/12 mb-6">
        <div>
          <h2 className="text-gray-400 text-md mb-1">Expenses</h2>
          <div className="grid gap-2">
            {ctx?.profile?.category?.expense?.map((cat) => {
              return (
                <div
                  key={cat?.name}
                  onClick={() => setEditCategoryModal(cat)}
                  className={`bg-gray-50 border rounded-full py-2 px-4 text-sm flex items-center  space-x-2 text-gray-600 cursor-pointer`}
                >
                  {cat?.icon && (
                    <span className="material-icons-round text-gray-500">
                      {cat?.icon}
                    </span>
                  )}
                  <span>{cat?.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-gray-400 text-md mb-1">Income</h2>
          <div className="grid gap-2">
            {ctx?.profile?.category?.income?.map((cat) => {
              return (
                <div
                  key={cat?.name}
                  onClick={() => setEditCategoryModal(cat)}
                  className={`bg-gray-50 border rounded-full py-2 px-4 text-sm flex items-center  space-x-2 text-gray-600 cursor-pointer`}
                >
                  {cat?.icon && (
                    <span className="material-icons-round text-gray-500">
                      {cat?.icon}
                    </span>
                  )}
                  <span>{cat?.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Button
        onClick={() => setAddCategoryModal(true)}
        additionalClasses="w-full max-w-sm"
        text="Add Category"
        icon="add_circle_outline"
      />

      {addCategoryModal && (
        <div className="fixed -top-2 left-0 bottom-0 right-0 p-10 fade-in">
          <div className="bg-gray-50 rounded-lg p-4 max-w-lg w-full mx-auto mt-20 relative z-10">
            <div
              onClick={() => setAddCategoryModal(false)}
              className="absolute right-4 top-2 cursor-pointer "
            >
              <span className="material-icons-round text-4xl">
                highlight_off
              </span>
            </div>

            <AddCategory setAddCategoryModal={setAddCategoryModal} />
          </div>

          <div
            onClick={() => setAddCategoryModal(false)}
            className="absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-30"
          ></div>
        </div>
      )}

      {editCategoryModal && (
        <div className="fixed -top-2 left-0 bottom-0 right-0 p-10 fade-in">
          <div className="bg-gray-50 rounded-lg p-4 max-w-lg w-full mx-auto mt-20 relative z-10">
            <div
              onClick={() => setEditCategoryModal(null)}
              className="absolute right-4 top-2 cursor-pointer "
            >
              <span className="material-icons-round text-4xl">
                highlight_off
              </span>
            </div>

            <EditCategory
              data={editCategoryModal}
              setEditCategoryModal={setEditCategoryModal}
            />
          </div>

          <div
            onClick={() => setEditCategoryModal(null)}
            className="absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-30"
          ></div>
        </div>
      )}
    </>
  );
};

export default EditCategories;
