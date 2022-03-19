import { useState, useContext } from "react";
import { Context } from "../../support/globalState";
import Button from "../Button";

const DeleteCategory = ({ data, setEditCategoryModal }) => {
  const ctx = useContext(Context);
  const [deleting, setDeleting] = useState(null);

  const removeCategory = async () => {
    const tmpCategories = [].concat(ctx?.profile?.categories || []);
    const check = tmpCategories.filter((e) => e?.method == data?.method);

    if (check.length <= 1) {
      ctx?.notify(
        "info",
        `${data?.method == 0 ? "Expense" : "Income"} category must not be empty`
      );
      return;
    }

    setDeleting("Deleting...");

    const tmpData = {
      ...ctx?.profile,
      categories: tmpCategories.filter((e) => e?.id != data?.id),
    };

    const db = getFirestore();
    await setDoc(doc(db, "users", ctx?.uid), tmpData)
      .then(() => {
        ctx?.notify("success", "Category successfully deleted");
        setEditCategoryModal(null);
      })
      .catch(() => {
        ctx?.notify("error", "Error deleting category");
        setDeleting(null);
      });
  };

  return (
    <Button
      onClick={() => removeCategory()}
      text="Delete"
      color="red"
      icon="delete"
      loading={deleting}
    />
  );
};

export default DeleteCategory;
