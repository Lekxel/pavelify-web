import { httpLogin } from "api/auth";
import Spinner from "App/component/Atoms/Spinner";
import React from "react";
import { useNavigate } from "react-router";
import { privateRoutes, publicRoutes } from "routes/routes";
import { showSuccess } from "utilities/alerts";
import { sleep } from "utilities/misc";
import { setCurrentUser, setCurrentUserAuthToken } from "utilities/storage";
import { Button } from "../../../Atoms/Auth/Button/Button";
import { InputWrapper } from "../../../molecules/Auth/InputWrapper/InputWrapper";
import styles from "./LoginForm.module.css";
export const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setIsLoading(true);

    httpLogin(email, password)
      .then(async (data) => {
        if (data.user) {
          showSuccess(data.message);
          setCurrentUserAuthToken(data.accessToken);
          setCurrentUser(data.user);
          await sleep(3000);
          navigate(privateRoutes.dashboard);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const onChange = (e) => {
    const { id, value } = e.target;
    if (id === "email") {
      setEmail(value);
    } else if (id === "password") {
      setPassword(value);
    }
  };

  return (
    <div className={styles.LoginFormWrapper}>
      <h1 className={styles.heading}>Login here...</h1>
      <InputWrapper
        id="email"
        labelText="Email"
        inputType="email"
        inputPlaceholder="Enter Your Email"
        InputWidth="100%"
        value={email}
        onChange={onChange}
      />
      <InputWrapper
        id="password"
        labelText="Password"
        inputType="password"
        inputPlaceholder="Enter Your Password"
        InputWidth="100%"
        value={password}
        onChange={onChange}
      />

      <Button
        onClick={handleSubmit}
        text={isLoading ? <Spinner /> : "Login"}
        disabled={isLoading}
        style={{ marginTop: 20 }}
      />

      <span className={styles.helpingMessage}>New here?</span>

      <Button to={publicRoutes.register} text="Register" type="link" outline={true} />
    </div>
  );
};
