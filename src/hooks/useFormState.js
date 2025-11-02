import { useState } from "react";

const useFormState = (initialValue, key = "", keyPhra = "") => {
  const [formState, setFormState] = useState(initialValue);
  const [errorformState, setErrorFormState] = useState({});

  const validateErrors = (name, value) => {
    if (!value.trim()) return `Field cannot be empty`;
    switch (name) {
      case "address":
        if (value.length < 24) return "Invalid Address";
        break;

      case "miningForm":
        if (value !== key) return "Invalid Mining Key";
        break;

      case "verification":
        if (value !== key) return "Invalid authorization code";
        break;
      case "password":
        if (value.length < 8) return "Min 8 characters";
        break;
      case "confirmPassword":
        if (value !== formState.password) return "Passwords do not match";
        break;
      case "keyPhrase":
        if (value !== keyPhra) return "Invalid Secret Phrase";
        break;
      default:
        break;
    }
    return null;
  };

  const handleFormStateChange = (e) => {
    const { name, value } = e.target;

    setFormState((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    const error = validateErrors(name, value);

    setErrorFormState((prevError) => ({
      ...prevError,
      [name]: error,
    }));
  };

  const handleSubmit = (e, callBack) => {
    e.preventDefault();

    callBack();
  };

  return {
    formState,
    errorformState,
    handleFormStateChange,
    handleSubmit,
    setFormState,
    setErrorFormState,
  };
};

export default useFormState;
