import { resetPassword } from "api/auth";
import Spinner from "App/component/Atoms/Spinner";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { publicRoutes } from "routes/routes";
import { showError, showSuccess } from "utilities/alerts";
import { Button } from "../../../Atoms/Auth/Button/Button";
import { InputWrapper } from "../../../molecules/Auth/InputWrapper/InputWrapper";
import styles from "./LoginForm.module.css";
export const ConfirmResetPasswordForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  let email = params.get("email");
  let code = params.get("code");

  useEffect(() => {
    if (!email || !code) {
      navigate(publicRoutes.forgotPassword);
    }
  }, [email, code]);

  const handleSubmit = () => {
    setIsLoading(true);

    resetPassword(email, password, code)
      .then(async (data) => {
        if (data.success) {
          showSuccess(data.message);
          setIsLoading(false);
          navigate(publicRoutes.login);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        showError(err.message || err.password || err.email || err.code);
      });
  };

  const onChange = (e) => {
    const { id, value } = e.target;
    if (id === "password") {
      setPassword(value);
    }
  };

  return (
    <div className={styles.LoginFormWrapper}>
      <h1 className={styles.heading}>Confirm Reset Password</h1>
      <InputWrapper
        id="email"
        labelText="Email"
        inputType="email"
        inputPlaceholder="Enter Your Email"
        InputWidth="100%"
        value={email}
        disabled
      />

      <InputWrapper
        id="password"
        labelText="New Password"
        inputType="password"
        inputPlaceholder="Enter Your New Password"
        InputWidth="100%"
        value={password}
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
