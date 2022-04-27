import React from "react";
import "./FreePlanGet.css";
const FreePlanGet = () => {
  return (
    <div className="FreePlanGet">
      <div className="content_wrapper w-1200">
        <h1>All paid plans comes with the following</h1>
        <div className="grid_wrapper_free_plan">
          <div className="box">
            <i
              class="fa-solid fa-circle-check"
              style={{ color: "#13225f", fontSize: 30 }}
            ></i>
            <div className="presentation">
              <h1>Free Trial</h1>
              <p>14 days Free Trial</p>
            </div>
          </div>
          <div className="box">
            <i
              class="fa-solid fa-circle-check"
              style={{ color: "#13225f", fontSize: 30 }}
            ></i>
            <div className="presentation">
              <h1>Team members</h1>
              <p>Assign Team members</p>
            </div>
          </div>

          <div className="box">
            <i
              class="fa-solid fa-circle-check"
              style={{ color: "#13225f", fontSize: 30 }}
            ></i>
            <div className="presentation">
              <h1>Management</h1>
              <p>Lead Management</p>
            </div>
          </div>
          <div className="box">
            <i
              class="fa-solid fa-circle-check"
              style={{ color: "#13225f", fontSize: 30 }}
            ></i>
            <div className="presentation">
              <h1>Response</h1>
              <p>Canned Response</p>
            </div>
          </div>
          <div className="box">
            <i
              class="fa-solid fa-circle-check"
              style={{ color: "#13225f", fontSize: 30 }}
            ></i>
            <div className="presentation">
              <h1>Tracking</h1>
              <p>Analytics & Reporting</p>
            </div>
          </div>
          <div className="box">
            <i
              class="fa-solid fa-circle-check"
              style={{ color: "#13225f", fontSize: 30 }}
            ></i>
            <div className="presentation">
              <h1>Notes</h1>
              <p>Private Note for Teams</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FreePlanGet;
