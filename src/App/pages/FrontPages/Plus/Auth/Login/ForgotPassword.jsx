import { ForgotPasswordForm } from "App/component/organisms/Auth/LoginForm/ForgotPasswordForm";
import { FrontPageLayout } from "../../../../../component/templates/FrontPageLayout/FrontPageLayout";
import styles from "./Login.module.css";

const ForgotPassword = () => {
  return (
    <FrontPageLayout auth={true}>
      <div className={`${styles.LoginWrapper} w-1200`}>
        <ForgotPasswordForm />

        {/* image */}
        <img src="../../images/login2.svg" alt="" className={styles.Image} />
      </div>
    </FrontPageLayout>
  );
};

export default ForgotPassword;
