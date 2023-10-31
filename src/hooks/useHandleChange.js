import { useState } from "react";

export default function useHandleChange() {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return { value, setValue, handleChange };
}
