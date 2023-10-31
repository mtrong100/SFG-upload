import { useState } from "react";
import Dropdown from "./components/Dropdown";
import useUploadPhoto from "./hooks/useUploadPhoto";
import useHandleChange from "./hooks/useHandleChange";
import { db } from "./utils/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { toast } from "sonner";

const agentClass = ["Striker", "Artilery", "Gunner", "Support"];

function App() {
  const [selected, setSelected] = useState("Choose class");
  const { value, setValue, handleChange } = useHandleChange();
  const { image, setImage, progress, handleSelectImage } = useUploadPhoto();
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadAgent = async () => {
    if (!value.trim()) return;
    if (!selected) {
      toast.error("Please select class!");
      return;
    }
    if (!image) {
      toast.error("Image missing!");
      return;
    }

    setIsLoading(true);

    try {
      const colRef = collection(db, "agent");
      const formatValue = value.toLowerCase();
      const docRef = await addDoc(colRef, {
        agent_name: formatValue,
        agent_class: selected,
        agent_icon: image,
        createdAt: serverTimestamp(),
        author: "admin",
      });

      await updateDoc(docRef, {
        id: docRef.id,
      });

      toast.success("Agent has been added!");

      // reset value
      setValue("");
      setImage("");
      setSelected("Choose class");

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload agent!");
    }
  };

  return (
    <div className="p-10 flex items-center justify-center">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl text-center capitalize mb-5">
          Upload agent
        </h1>
        <input
          value={value}
          type="text"
          onChange={handleChange}
          placeholder="Enter agent name..."
          className="border-2 border-gray-500 bg-transparent  p-3 outline-none focus:border-indigo-600 rounded-md"
        />
        <Dropdown
          list={agentClass}
          selected={selected}
          handleSelect={setSelected}
        />
        <input type="file" onChange={handleSelectImage} />

        {/* uploading */}
        {!image && progress !== 0 && (
          <div className="w-[40px] h-[40px] animate-spin flex mx-auto rounded-full border-t-4 border-t-transparent border-4 border-solid border-indigo-500"></div>
        )}

        {/* upload complete */}
        {image && progress === 0 && (
          <div className="p-1 border border-gray-500 rounded-md  mx-auto">
            <img
              src={image}
              alt="agent-icon"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        )}

        <button
          type="button"
          onClick={handleUploadAgent}
          disabled={isLoading}
          className={`${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          } w-full bg-indigo-500 hover:bg-indigo-600 rounded-md p-3 text-white font-semibold`}
        >
          {isLoading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
}

export default App;
