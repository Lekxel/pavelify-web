import React, { useEffect, useState } from "react";
import { FrontPageLayout } from "../../../../component/templates/FrontPageLayout/FrontPageLayout";

import { PricingCardWrapper } from "../../../../component/templates/Pricing/PricingCardWrapper/PricingCardWrapper";
import { PricingFaq } from "../../../../component/templates/Pricing/PricingFaq/PricingFaq";
import { PricingQuestion } from "../../../../../helpers/constants/PricingQuestions";

import { HomeContactBanner } from "../../../../component/organisms/Home/HomeContactBanner/HomeContactBanner";
import "./Pricing.css";
import FreePlanGet from "../../../../component/templates/Pricing/FreePlanGet/FreePlanGet";
import TrustedBrands from "../../../../component/templates/Pricing/TrustedBrands/TrustedBrands";
export const Pricing = () => {
  const [showbg, setshowbg] = useState(false);

  const ShowScrolling = (e) => {
    let BottomArea = document
      .querySelector(".pricng_banner")
      .getBoundingClientRect().bottom;

    if (BottomArea < 400) {
      setshowbg(true);
    } else {
      setshowbg(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", ShowScrolling);
  }, []);

  return (
    <FrontPageLayout not_margin={true} showbg={showbg}>
      <div className="pricng_banner">
        <h1>Simplified Plans for your Business</h1>
      </div>

      <PricingCardWrapper />

      <TrustedBrands />

      <FreePlanGet />

      <PricingFaq PricingQuestion={PricingQuestion} />

      {/* banner */}
      <HomeContactBanner />
    </FrontPageLayout>
  );
};
