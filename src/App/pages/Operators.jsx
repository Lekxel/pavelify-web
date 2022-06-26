import { httpGetUser } from "api/auth";
import { httpDeleteOperator, httpFetchOperators, httpSaveOperator } from "api/operator";
import Spinner from "App/component/Atoms/Spinner";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useQuery } from "react-query";
import { showError, showSuccess } from "utilities/alerts";
import { capitalize, validateEmail, validateName } from "utilities/misc";
import Edit from "../../Assets/img/edit-2.png";
import Person1 from "../../Assets/img/Frame 1.png";
import LeftArrow from "../../Assets/img/left-contact.png";
import RightArrow from "../../Assets/img/right-contact.png";
import Trash from "../../Assets/img/trash.png";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";

function Operators() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState([]);
  const [operator, setOperator] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    data: { user }
  } = useQuery("user", httpGetUser, {
    initialData: {}
  });

  useEffect(() => {
    let Checkbox = document.querySelector("#all-check-checkbox");
    let CheckboxTbody = document.querySelectorAll(".table-body .row .col1 input");

    //    click event on first checkbox i mean main checkbox
    Checkbox.addEventListener("click", (e) => {
      if (e.target.checked === true) {
        CheckboxTbody.forEach((EachInput) => {
          EachInput.checked = true;
        });
      } else {
        CheckboxTbody.forEach((EachInput) => {
          EachInput.checked = false;
        });
      }
    });
  }, []);

  const {
    data: { operators, limit, page, total },
    refetch
  } = useQuery("operators", httpFetchOperators, {
    initialData: {
      limit: 10,
      page: 1,
      total: 0
    }
  });

  const toggleDepartment = (d) => {
    if (department.indexOf(d) === -1) {
      setDepartment((dep) => [...dep, d]);
    } else {
      setDepartment((dep) => dep.filter((a) => a !== d));
    }
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setDepartment([]);
  };

  const handleSubmit = () => {
    if (!validateName(name)) {
      return showError("Name is required");
    }
    if (!validateEmail(email)) {
      return showError("Email is required");
    }
    setLoading(true);

    const data = {
      name,
      email,
      department
    };

    httpSaveOperator(data, operator?._id, isAdd)
      .then((data) => {
        setLoading(false);
        if (data.success) {
          refetch();
          showSuccess(data.message);
          clearForm();
          setShowModal(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleAdd = () => {
    clearForm();
    setIsAdd(true);
    setShowModal(true);
  };

  const handleEdit = (operator) => {
    setIsAdd(false);
    setOperator(operator);
    setName(operator.name);
    setEmail(operator.email);
    setDepartment(operator.department);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (!operator._id) return showError("Please select an operator");

    setLoading(true);
    httpDeleteOperator(operator._id)
      .then((data) => {
        setLoading(false);
        if (data.success) {
          refetch();
          showSuccess(data.message);
          setShowDeleteModal(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleSelectForDelete = (operator) => {
    setOperator(operator);
    setShowDeleteModal(true);
  };

  return (
    <div className="Contact Operators main-wrapper d-flex">
      {/* sidebar */}
      <Sidebar active="operators" />
      <div className="body-area">
        {/* header */}
        <BodyHeader page="Operators" />

        <Modal show={showModal} centered onHide={() => setShowModal(false)}>
          <Modal.Header>
            <Modal.Title>Add New Operator</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="mb-3">
                <label style={{ fontWeight: "bold" }} className="mb-1">
                  Department
                </label>
                <select
                  style={{ height: "100px" }}
                  value={department}
                  onChange={(e) => toggleDepartment(e.target.value)}
                  multiple
                  name="departments"
                  id=""
                  className="form-control"
                >
                  {user?.company?.departments &&
                    user?.company?.departments.map((depart, index) => (
                      <option key={String(index)}>{depart}</option>
                    ))}
                </select>
              </div>
              <div className="mb-3">
                <label style={{ fontWeight: "bold" }} className="mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="e.g John Steven"
                  className="form-control mb-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label style={{ fontWeight: "bold" }} className="mb-1">
                  Email
                </label>
                <input
                  disabled={!isAdd}
                  type="email"
                  placeholder="e.g xxx@mail.com"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="me-5" variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              {loading ? <Spinner /> : "Continue"}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Delete Modal */}

        <Modal show={showDeleteModal} centered onHide={() => setShowDeleteModal(false)}>
          <Modal.Header>
            <Modal.Title>Delete Operator</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              Are you sure you want to delete <b>{operator?.name}</b>?
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="me-5" variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              {loading ? <Spinner /> : "Delete"}
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="body-main-area">
          <div className="body-box" style={{ display: "block" }}>
            {/* right area */}
            <div className="right-area">
              <div className="top-area d-flex-align-center">
                <h3>Operators</h3>
                <button onClick={handleAdd}>Add New Operator</button>

                <div className="slider-area d-flex-align-center">
                  <p>
                    <span>{(page - 1) * limit + 1}</span> -{" "}
                    <span>{total > page * limit ? page * limit : total}</span> of{" "}
                    <span>{total}</span>
                  </p>
                  <div className="slider-images d-flex-align-center">
                    <img src={LeftArrow} alt="" />
                    <img src={RightArrow} alt="" />
                  </div>
                </div>
              </div>
              <div className="table-wrapper">
                <div className="table">
                  <div className="table-head">
                    <div className="col col1">
                      <input type="checkbox" name="" id="all-check-checkbox" />
                    </div>
                    <div className="col col2">
                      <h5>Profile</h5>
                    </div>
                    <div className="col col3">
                      <h5>Email</h5>
                    </div>
                    <div className="col col4">
                      <h5>Online</h5>
                    </div>
                    <div className="col col5">
                      <h5>Last Login</h5>
                    </div>
                    <div className="col col6">
                      <h5>Department</h5>
                    </div>
                    <div className="col col7">
                      <h5>Actions</h5>
                    </div>
                  </div>
                  <div className="table-body">
                    {operators &&
                      operators.map((operator, index) => (
                        <div key={operator?._id} className="table-head">
                          <div className="col col1">
                            <input type="checkbox" name="" id="" />
                          </div>
                          <div className="col col2 d-flex-align-center">
                            <p>
                              {operator?.picture ? (
                                <img src={Person1} alt="" />
                              ) : (
                                <i style={{ fontSize: "30px" }} className="fas fa-user-circle"></i>
                              )}
                            </p>
                            <p>{operator?.name}</p>
                          </div>
                          <div className="col col3">
                            <p>{operator?.email}</p>
                          </div>
                          <div className="col col4">
                            {operator?.online ? (
                              <button className="Online">Online</button>
                            ) : (
                              <button className="offline">Offline</button>
                            )}
                          </div>
                          <div className="col col5">
                            <p>
                              {operator?.lastLogin
                                ? DateTime.fromISO(operator?.lastLogin).toFormat("DDDD")
                                : "Never"}
                            </p>
                          </div>
                          <div className="col col6">
                            <h5>{operator?.department?.map((d) => capitalize(d))?.join(", ")}</h5>
                          </div>
                          <div className="col col7">
                            <div className="images-wrapper d-flex-align-center">
                              <span onClick={() => handleEdit(operator)}>
                                <img src={Edit} alt="" />
                              </span>
                              <span
                                className="mx-2"
                                onClick={() => handleSelectForDelete(operator)}
                              >
                                <img src={Trash} alt="" />
                              </span>
                              {/* <img src={Settings} alt="" /> */}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Operators;
