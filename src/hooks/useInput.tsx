import React, {useState} from "react";

export const useInput = (initState: any) => {
  const [values, setValues] = useState(initState);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>, selectedState: string) => {
    setValues({
      ...values,
      [selectedState]: +e.target.value,
    });
  };
  return { values, onChange, setValues };
}
