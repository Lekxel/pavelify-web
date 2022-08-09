import { PricingCardWrapper } from "App/component/templates/Pricing/PricingCardWrapper/PricingCardWrapper";

import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";

function Plans() {
  //   const {
  //     data: { user }
  //   } = useQuery("user", httpGetUser, {
  //     initialData: {}
  //   });

  return (
    <div className="Contact main-wrapper d-flex">
      {/* <Helmet>
        <title>Plans & Pricing - Pavelify</title>
      </Helmet> */}
      {/* sidebar */}
      <Sidebar active="contact" />
      <div className="body-area">
        {/* header */}
        <BodyHeader active="plans" />

        <div className="body-main-area">
          <div className="text-center my-5">
            <h1>Simplified Plans for your Business</h1>
          </div>
          <div className="body-box">
            <PricingCardWrapper isDashboard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Plans;
