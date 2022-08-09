import { forgotPassword } from "api/auth";
import Spinner from "App/component/Atoms/Spinner";
import React from "react";
import { useNavigate } from "react-router";
import { publicRoutes } from "routes/routes";
import { showError, showSuccess } from "utilities/alerts";
import { Button } from "../../../Atoms/Auth/Button/Button";
import { InputWrapper } from "../../../molecules/Auth/InputWrapper/InputWrapper";
import styles from "./LoginForm.module.css";
export const ForgotPasswordForm = () => {
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setIsLoading(true);

    forgotPassword(email)
      .then(async (data) => {
        if (data.success) {
          showSuccess(data.message);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        showError(err.message || err.email);
      });
  };

  const onChange = (e) => {
    const { id, value } = e.target;
    if (id === "email") {
      setEmail(value);
    }
  };

  return (
    <div className={styles.LoginFormWrapper}>
      <h1 className={styles.heading}>Reset Password</h1>
      <InputWrapper
        id="email"
        labelText="Email"
        inputType="email"
        inputPlaceholder="Enter Your Email"
        InputWidth="100%"
        value={email}
        onChange={onChange}
      />

      <Button
        onClick={handleSubmit}
        text={isLoading ? <Spinner /> : "Continue"}
        disabled={isLoading}
        style={{ marginTop: 20 }}
      />

      <span className={styles.helpingMessage}>OR</span>

      <Button to={publicRoutes.login} text="Sign In" type="link" outline={true} />
    </div>
  );
};
