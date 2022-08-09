import { ConfirmResetPasswordForm } from "App/component/organisms/Auth/LoginForm/ConfirmResetPasswordForm";
import { FrontPageLayout } from "../../../../../component/templates/FrontPageLayout/FrontPageLayout";
import styles from "./Login.module.css";

const ConfirmResetPassword = () => {
  return (
    <FrontPageLayout auth={true}>
      <div className={`${styles.LoginWrapper} w-1200`}>
        <ConfirmResetPasswordForm />

        {/* image */}
        <img src="../../images/login2.svg" alt="" className={styles.Image} />
      </div>
    </FrontPageLayout>
  );
};

export default ConfirmResetPassword;
