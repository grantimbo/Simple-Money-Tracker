import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { Context } from "../../support/globalState";
import Button from "../Button";
import Input from "../Input";
import InputLabel from "../InputLabel";
import DeleteCategory from "./DeleteCategory";
import IconSelector from "./IconSelector";

export default function EditCategory(props) {
  const ctx = useContext(Context);
  const { data, setEditCategoryModal } = props;
  const [updating, setUpdating] = useState(null);
  const [name, setName] = useState(data?.name);
  const [icon, setIcon] = useState(data?.icon);

  const updateCategory = async () => {
    if (name === "" || icon === "") {
      ctx?.notify("error", "Please fill in all fields");
      return;
    }

    setUpdating("Updating...");
    const tmpCategories = [].concat(ctx?.profile?.categories || []).map((e) => {
      if (e?.id == data?.id) {
        return {
          ...e,
          name: name,
          icon: icon,
        };
      }
      return e;
    });

    const tmpExpensesIncome = [].concat(ctx?.data || []).map((e) => {
      if (e?.category.name == name) {
        return {
          ...e,
          category: {
            name: name,
            icon: icon,
          },
        };
      }
      return e;
    });

    const tmpProfileData = {
      ...ctx?.profile,
      categories: tmpCategories,
    };

    const finalData = {
      data: tmpExpensesIncome,
      total: ctx?.total,
    };

    const db = getFirestore();
    const dataRef = collection(db, `users/${ctx?.uid}/data`);

    Promise.all([
      await setDoc(doc(dataRef, ctx?.activeMonth), finalData),
      await setDoc(doc(db, "users", ctx?.uid), tmpProfileData),
    ])
      .then(() => {
        ctx?.notify("success", "Category successfully updated");
        setEditCategoryModal(null);
        setUpdating(null);
      })
      .catch(() => {
        ctx?.notify("error", "Error updating category");
        setUpdating(null);
      });
  };

  return (
    <div className="mt-6 grid">
      <InputLabel text="Name" />
      <Input
        type={"text"}
        color="gray"
        value={name}
        setValue={setName}
        placeholder="Name"
        additionalClasses="mb-4"
      />

      <InputLabel text="Icon" />
      <IconSelector icon={icon} setIcon={setIcon} />

      <div className="flex items-center justify-end space-x-2">
        <DeleteCategory {...props} />

        <Button
          onClick={() => updateCategory()}
          text="Update"
          icon="save"
          loading={updating}
        />
      </div>
    </div>
  );
}
