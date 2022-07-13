import { useState } from "react";

const useFormInputValidation = (validationLogic, invalidCssClass) => {
  const [value, setValue] = useState("");
  const [valueTouched, setValueTouched] = useState(false);

  const valueIsValid = validationLogic(value);

  const inValidCss = valueTouched && !valueIsValid ? invalidCssClass : ``;

  return {
    value,
    setValue,
    valueTouched,
    setValueTouched,
    valueIsValid,
    inValidCss,
  };
};

export default useFormInputValidation;
