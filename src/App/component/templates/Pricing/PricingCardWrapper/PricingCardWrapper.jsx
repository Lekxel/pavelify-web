import { PricingCardcontent } from "../../../../../helpers/constants/PricingCards";
import { PricingCard } from "../../../organisms/Pricing/PricingCard/PricingCard";

import styles from "./PricingCardWrapper.module.css";
export const PricingCardWrapper = ({ isDashboard }) => {
  return (
    <div className={`${styles.PricingCardWrapper} ${isDashboard ? styles.dashboard : ""}`}>
      <div className={`${styles.Content} w-1200`}>
        {PricingCardcontent.map((EachCard) =>
          isDashboard && EachCard.title === "Basic" ? null : (
            <PricingCard
              key={EachCard.title}
              title={EachCard.title}
              price={EachCard.price}
              time={EachCard.time}
              type={EachCard.type != null ? EachCard.type : null}
              duration={EachCard.duration}
              buy_now_link={EachCard.buy_now_link}
              free_trail_link={EachCard.free_trail_link}
              services={EachCard.services}
              isDashboard={isDashboard}
            />
          )
        )}
      </div>
    </div>
  );
};
