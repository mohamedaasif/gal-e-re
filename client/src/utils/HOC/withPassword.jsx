import { useState } from "react";

const withPassword = (WrappedComponent) => {
  const WithPassword = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <WrappedComponent
        handleShowPassword={handleShowPassword}
        showPassword={showPassword}
      />
    );
  };
  return WithPassword;
};

export default withPassword;
