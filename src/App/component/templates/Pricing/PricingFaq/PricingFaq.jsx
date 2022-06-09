import React from "react";
import { PricingFaqRow } from "../../../organisms/Pricing/PricingFaqRow/PricingFaqRow";
import faq from "../../../../../Assets/img/faq.svg";
import styles from "./PricingFaq.module.css";
export const PricingFaq = ({ PricingQuestion }) => {
  return (
    <div className={`${styles.PricingFaq} w-1200`}>
      <h1 className={styles.mainheading}>Frequently Asked Questions</h1>

      <div className={styles.faq_grid}>
        <div className={styles.left_side}>
          <h1>Have more questions?</h1>
          <p>
            See our <a href="#">help center</a> or
            <a href="#"> send us a message!</a>
          </p>
          <img src={faq} alt="" />
        </div>
        <div className={styles.right_side}>
          {PricingQuestion.map((EachQuestsion) => (
            <PricingFaqRow
              key={EachQuestsion.question}
              question={EachQuestsion.question}
              answer={EachQuestsion.answer}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
