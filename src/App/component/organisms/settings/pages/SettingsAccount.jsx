import { httpGetUser } from "api/auth";
import { changePassword, updateProfile } from "api/profile";
import { Button } from "App/component/Atoms/Auth/Button/Button";
import Spinner from "App/component/Atoms/Spinner";
import TimezoneOptions from "helpers/TimezoneOptions";
import { useState } from "react";
import { Button as Btn, Modal } from "react-bootstrap";
import { useQuery } from "react-query";
import { showError, showSuccess } from "utilities/alerts";
import {
  capitalize,
  fileToBase64,
  removeFalsyValues,
  validateName,
  validatePassword
} from "utilities/misc";

export const SettingsAccount = () => {
  const {
    data: { user },
    refetch
  } = useQuery("user", httpGetUser, {
    initialData: {}
  });
  const [name, setName] = useState(user?.name);
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = () => {
    if (!validateName(name)) {
      return showError("Name is not valid");
    }
    setLoading(true);
    updateProfile(removeFalsyValues({ name, photo }))
      .then(({ data }) => {
        setLoading(false);
        if (data.success) {
          setPhoto("");
          showSuccess("Updated successfully");
          refetch();
        }
      })
      .catch((err) => {
        setLoading(false);
        showError("Something went wrong, please try again");
      });
  };

  const handleSelectFile = async (e) => {
    const file = e.target.files[0];
    try {
      let photo = await fileToBase64(file);
      setPhoto(photo);
    } catch (e) {
      return showError("Error uploading photo");
    }
  };

  const handleChangePassword = () => {
    if (!validatePassword(password)) {
      return showError("Password shoud be at least 6 characters");
    }
    if (!validatePassword(newPassword)) {
      return showError("New password should be at least 6 characters");
    }
    if (newPassword !== password) {
      return showError("current password should be different from new password");
    }
    if (newPassword !== confirmPassword) {
      return showError("Passwords do not match");
    }
    setLoading(true);
    changePassword(removeFalsyValues({ currentPassword: password, newPassword }))
      .then(({ data }) => {
        setLoading(false);
        if (data.success) {
          showSuccess("Password changed successfully");
          setPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setShowModal(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <div className="right-side account-right-side">
      <Modal show={showModal} centered onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-3">
              <label style={{ fontWeight: "bold" }} className="mb-1">
                Current Password
              </label>
              <input
                type="password"
                placeholder="Current Password"
                className="form-control mb-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label style={{ fontWeight: "bold" }} className="mb-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="New Password"
                className="form-control mb-3"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label style={{ fontWeight: "bold" }} className="mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="form-control mb-3"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Btn className="me-5" variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Btn>
          <Btn variant="primary" onClick={handleChangePassword}>
            {loading ? <Spinner /> : "Continue"}
          </Btn>
        </Modal.Footer>
      </Modal>
      <h2 className="special-h2">Account</h2>
      <form>
        <div className="input-wrapper">
          <label htmlFor="name">Current Plan</label>
          <h4>{capitalize(user?.company?.plan)}</h4>
        </div>
        <div className="input-wrapper">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>{" "}
        <div className="input-wrapper">
          <label htmlFor="name">Your Picture</label>
          <div className="file-wrapper">
            <div className="icon-wrapper">
              {photo || user?.picture ? (
                <img
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "contain",
                    backgroundColor: "#eee"
                  }}
                  src={photo || user?.picture}
                  alt="user"
                />
              ) : (
                <i className="fas fa-user-circle"></i>
              )}
            </div>

            <label htmlFor="choose_file">Choose your file</label>
            <input
              onChange={handleSelectFile}
              type="file"
              accept="image/png, image/gif, image/jpeg"
              name=""
              id="choose_file"
              style={{ display: "none" }}
            />
          </div>
        </div>{" "}
        <div className="input-wrapper">
          <label htmlFor="Email">Email</label>
          <input type="email" id="Email" value={user?.email} disabled />
        </div>{" "}
        <div className="input-wrapper change-password-link">
          <label htmlFor="password">Password</label>
          <a className="text-primary" onClick={() => setShowModal(true)}>
            Change Password
          </a>
        </div>{" "}
        <div className="input-wrapper">
          <label htmlFor="Region">Region</label>
          <select name="timezone" value={user?.timezone} id="">
            <TimezoneOptions />
          </select>
        </div>{" "}
        <div className="input-wrapper">
          <label htmlFor="Language">Language</label>
          <select name="" id="">
            <option value="default">default</option>
          </select>
        </div>{" "}
      </form>
      <div className="mt-5 text-center me-5">
        <Button onClick={handleSubmit} text={loading ? <Spinner /> : "Save"} block={false} />
      </div>
    </div>
  );
};

export default SettingsAccount;
