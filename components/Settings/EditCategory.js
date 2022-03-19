import { useState, useContext } from "react";
import { Context } from "../../support/globalState";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import Button from "../Button";
import Input from "../Input";
import InputLabel from "../InputLabel";
import IconSelector from "./IconSelector";
import DeleteCategory from "./DeleteCategory";

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
    const tmpCategories = [].concat(ctx?.profile?.categories || []);

    const tmpData = {
      ...ctx?.profile,
      categories: tmpCategories.map((e) => {
        if (e?.id == data?.id) {
          return {
            ...e,
            name: name,
            icon: icon,
          };
        }
        return e;
      }),
    };

    const db = getFirestore();
    await setDoc(doc(db, "users", ctx?.uid), tmpData)
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
