import { httpGetUser } from "api/auth";
import { httpAddDepartment, httpDeleteDepartment } from "api/company";
import Spinner from "App/component/Atoms/Spinner";
import Trash from "Assets/img/trash.png";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useQuery } from "react-query";
import { showError, showSuccess } from "utilities/alerts";
import { capitalize } from "utilities/misc";

const SettingsDepartment = () => {
  const [department, setDepartment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [departments, setDepartments] = useState([]);

  const {
    data: { user },
    refetch
  } = useQuery("user", httpGetUser, {
    initialData: {}
  });

  useEffect(() => {
    user?.company?.departments && setDepartments(user?.company?.departments);
  }, [user?.company]);

  const handleAddNew = () => {
    if (!department.trim() || department.trim().length < 2) {
      return showError("Please enter a department");
    }

    setLoading(true);

    httpAddDepartment({ department })
      .then((res) => {
        setLoading(false);
        if (res.success) {
          showSuccess(res.message);
          refetch();
          setDepartment("");
          setShowModal(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    setDeleteID(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (!deleteID) {
      return showError("Please select a department");
    }

    setLoading(true);

    httpDeleteDepartment({ department: deleteID })
      .then((res) => {
        setLoading(false);
        if (res.success) {
          showSuccess(res.message);
          refetch();
          setDeleteID("");
          setShowDeleteModal(false);
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
          <Modal.Title>Add New Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <input
              type="text"
              className="form-control mt-4 pt-1 mb-2"
              placeholder="Enter message"
              value={department}
              id="department"
              // style={{ height: "60px" }}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="me-5" variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddNew}>
            {loading ? <Spinner /> : "Continue"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} centered onHide={() => setShowDeleteModal(false)}>
        <Modal.Header>
          <Modal.Title>Delete Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Are you sure you want to delete this department?</div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="me-5" variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            {loading ? <Spinner /> : "Yes, Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="top-area d-flex-align-center">
        <h3 style={{ flex: "1 1" }}>Departments</h3>

        <div className="slider-area  d-flex-align-center">
          <div className="top-area d-flex-align-center me-3">
            <Button type="button" onClick={() => setShowModal(true)}>
              Add New
            </Button>
          </div>
        </div>
      </div>
      <div className="table-wrapper">
        <div className="table">
          <div className="table-head">
            <div className="col col2">
              <h5>#</h5>
            </div>
            <div className="col col3">
              <h5>Department</h5>
            </div>
            <div className="col col7">
              <h5>Actions</h5>
            </div>
          </div>
          <div className="table-body">
            {departments &&
              departments?.map((q, index) => (
                <div className="row" key={String(index)}>
                  <div className="col col2">
                    <p>{String(index + 1)}.</p>
                  </div>
                  <div className="col col3">
                    <p>{capitalize(q)}</p>
                  </div>

                  <div className="col col7">
                    <div className="images-wrapper">
                      <button type="button" onClick={() => handleDelete(q)}>
                        <img src={Trash} alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsDepartment;
