import { httpGetUser } from "api/auth";
import { useQuery } from "react-query";
import { currentUser } from "utilities/storage";
import styles from "./PricingCard.module.css";
import { PricingCardServices } from "./PricingCardServices";
export const PricingCard = ({
  title,
  price,
  duration,
  buy_now_link,
  free_trail_link,
  services,
  time,
  type = null,
  isDashboard
}) => {
  const {
    data: { user }
  } = useQuery("user", httpGetUser, {
    initialData: {},
    enabled: Boolean(currentUser())
  });

  const { Paddle } = window;
  const openCheckout = (product) => {
    Paddle.Checkout.open({
      product,
      passthrough: `{ "companyID": "${user?.company?._id}" }`
    });
  };

  return (
    <div className={styles.PricingCard}>
      <h1 className={styles.mainheading}>{title}</h1>
      {type == null && (
        <>
          <p className={styles.price}>
            {price} <span>/{time}</span>
          </p>
          <small className={styles.duration}>{duration}</small>
          {isDashboard ? (
            <button
              onClick={() => openCheckout(buy_now_link)}
              className={styles.button}
              type="button"
            >
              Upgrade
            </button>
          ) : (
            <a href={free_trail_link} className={styles.button}>
              Get Started for Free
            </a>
          )}

          {title !== "Basic" && !isDashboard ? (
            <p className={styles.freeTrailLink}>14 days Free Trial</p>
          ) : null}
        </>
      )}

      <PricingCardServices services={services} />
    </div>
  );
};
