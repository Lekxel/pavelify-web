import React, { useEffect, useState } from "react";
import { Fields } from "helpers/constants/RegisterFormFeilds";
import { Button } from "App/component/Atoms/Auth/Button/Button";
import { InputWrapper } from "App/component/molecules/Auth/InputWrapper/InputWrapper";
import { HandleStep } from "./events/HandleStep";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";
import { publicRoutes } from "routes/routes";
import {
  parseQueryParams,
  validateEmail,
  validateName,
  validatePassword,
  validateSubdomain,
  validateUrl
} from "utilities/misc";
import { useLocation, useNavigate } from "react-router";
import { BASIC, ESSENTIAL, PRO } from "utilities/plans";
import { showError, showSuccess } from "utilities/alerts";
import { post } from "utilities/network";
import Spinner from "App/component/Atoms/Spinner";

export const RegisterForm = () => {
  const [Step, setStep] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [registrationData, setRegistrationData] = useState({
    email: "",
    fname: "",
    lname: "",
    cweb: "",
    cname: "",
    subdomain: "",
    password: ""
  });

  const navigate = useNavigate();

  const location = useLocation();
  const { plan } = parseQueryParams(location.search);

  useEffect(() => {
    setStep(Fields[0]);
  }, []);

  const handleOnChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.id]: e.target.value
    });
  };

  const HandleNextStep = (setStep, Fields, stepIndex, setStepIndex) => {
    if (stepIndex === 0 && !validateEmail(registrationData.email)) {
      return showError("Please enter a valid email address");
    }

    if (stepIndex === 1) {
      if (!validateUrl(registrationData.cweb)) {
        return showError("Please enter a valid company website");
      }

      if (!validateName(registrationData.fname)) {
        return showError("Please enter a valid first name");
      }

      if (!validateName(registrationData.lname)) {
        return showError("Please enter a valid last name");
      }
    }

    return HandleStep(true, setStep, Fields, stepIndex, setStepIndex);
  };

  const HandlePrevStep = (setStep, Fields, stepIndex, setStepIndex) => {
    HandleStep(false, setStep, Fields, stepIndex, setStepIndex);
  };

  const handleSubmit = (e) => {
    if (!validateName(registrationData.cname)) {
      return showError("Please enter a valid company name");
    }

    if (!validateSubdomain(registrationData.subdomain)) {
      return showError("Subdomain should be at least 3 alphanumeric chars");
    }

    if (!validatePassword(registrationData.password)) {
      return showError("Password should be at least 6 chars");
    }

    setIsLoading(true);
    const data = {
      email: registrationData.email,
      name: `${registrationData.fname} ${registrationData.lname}`,
      companyName: registrationData.cname,
      companyWebsite: registrationData.cweb,
      slug: registrationData.subdomain?.toLowerCase(),
      password: registrationData.password,
      plan: plan || BASIC
    };
    post("/auth/register", data)
      .then((data) => {
        setIsLoading(false);
        if (data.success) {
          showSuccess(data.message);
          navigate(publicRoutes.login);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.RegisterForm}>
      <div className={styles.progressWrapper}>
        <div className={styles.formNavigation}>
          <div>
            <button
              onClick={() => HandlePrevStep(setStep, Fields, stepIndex, setStepIndex)}
              className="btn"
              type="button"
            >
              <i className="fa fa-long-arrow-left"></i>
            </button>
          </div>
          <p>
            Step <span className="step2">1</span> of 3
          </p>
          <div></div>
        </div>
        <span className={styles.progress}>
          <span className={styles.progressInner} id="progress_inner"></span>
        </span>
      </div>

      <h2 className={`${styles.heading} heading-steps`}>
        {stepIndex === 0 && [ESSENTIAL, PRO].includes(plan)
          ? "Try Pavelify 14 days free Trial"
          : ""}
      </h2>

      <div className={styles.FeildsWrapper}>
        {Step.map((feild, index) => (
          <EachStep
            registrationData={registrationData}
            handleOnChange={handleOnChange}
            key={String(index)}
            feild={feild}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        ))}
      </div>

      <Button
        ext_class="next_button"
        text="Next"
        style={{ marginTop: 20 }}
        onClick={(e) => HandleNextStep(setStep, Fields, stepIndex, setStepIndex)}
      />

      <div style={{ marginTop: "60px" }} className="text-center">
        <p className="mb-2"> Already have an account?</p>
        <Button to={publicRoutes.login} text="Sign In" type="link" outline={true} />
      </div>
    </div>
  );
};

const EachStep = ({ feild, registrationData, handleOnChange, handleSubmit, isLoading }) => (
  <>
    {feild.object === "InputWrapper" && (
      <InputWrapper
        id={feild.id}
        labelText={feild.label}
        inputType={feild.inputType}
        inputPlaceholder={feild.inputPlaceholder}
        InputWidth="100%"
        style={{ gridColumn: "span 2", marginTop: 0 }}
        onChange={handleOnChange}
        value={registrationData[feild.id]}
      />
    )}
    {feild.object === "GridInputWrapper" && (
      <InputWrapper
        id={feild.id}
        labelText={feild.label}
        inputType={feild.inputType}
        inputPlaceholder={feild.inputPlaceholder}
        InputWidth="100%"
        style={{ marginTop: 0 }}
        onChange={handleOnChange}
        value={registrationData[feild.id]}
      />
    )}

    {feild.object === "subdomain" && (
      <div
        className={styles.DomainInput}
        style={{ gridColumn: "span 2", marginTop: 0, marginBottom: 20 }}
      >
        <label htmlFor={feild.id}>{feild.label}</label>
        <div className={styles.domainInputWrapper}>
          <input
            onChange={handleOnChange}
            type="text"
            placeholder={feild.inputPlaceholder}
            id={feild.id}
            value={registrationData[feild.id]}
          />
          <p>.Pavelify.com</p>
        </div>
      </div>
    )}

    {feild.object === "text" && (
      <p
        style={{
          gridColumn: "span 2",
          marginBottom: "0px",
          textAlign: "center"
        }}
      >
        {feild.text}{" "}
        <Link to={publicRoutes.terms} style={{ color: "#13225f" }}>
          {feild.linkterm}
        </Link>{" "}
        and{" "}
        <Link to={publicRoutes.privacyPolicy} style={{ color: "#13225f" }}>
          {feild.linkprivacy}
        </Link>
      </p>
    )}

    {/* {feild.object === "radio" && (
              <div style={{ gridColumn: "span 2" }}>
                <h4 className={styles.radioheading}>{feild.heading}</h4>
                <ul>
                  {feild["checkboxes"].map((EachCheckbox) => (
                    <li className={styles.radiolist}>
                      <input
                        type="radio"
                        style={{ marginRight: 10 }}
                        name="solving"
                      />
                      <label htmlFor="">{EachCheckbox}</label>
                    </li>
                  ))}
                </ul>
              </div>
            )} */}

    {feild.object === "button" && (
      <Button
        onClick={handleSubmit}
        text={isLoading ? <Spinner /> : feild.text}
        style={{ gridColumn: "span 2", marginBottom: 0 }}
      />
    )}
  </>
);
