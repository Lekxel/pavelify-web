import React from "react";
import { Link } from "react-router-dom";
import { publicRoutes } from "routes/routes";
import { LoginForm } from "../../../../../component/organisms/Auth/LoginForm/LoginForm";
import { RegisterForm } from "../../../../../component/organisms/Auth/RegisterForm/RegisterForm";

import styles from "./Register.module.css";

const Register = () => {
  return (
    <div className={`${styles.LoginWrapper} w-1200`}>
      <div className={styles.logo}>
        <h3>
          <Link to={publicRoutes.home}>
            <img src="/images/logo.png" style={{ width: "180px" }} alt="pavelify" />
          </Link>
        </h3>
      </div>
      <RegisterForm />
    </div>
  );
};

export default Register;
