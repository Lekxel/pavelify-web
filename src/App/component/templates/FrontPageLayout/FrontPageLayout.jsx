import React from "react";
import { FooterOptions } from "../../../../helpers/constants/FooterOptions";
import { HeaderOptions } from "../../../../helpers/constants/headerOptions";
import { Footer } from "../../organisms/Footer/Footer";
import { Header } from "../../organisms/Header/HeaderNav/Header";
import styles from "./FrontPageLayout.module.css";
import "../../../../Assets/styles/FrontPages/Global.css";
import LiveChatWidget from "../LiveChat/LiveChat";

export const FrontPageLayout = ({
  children,
  activeLink,
  auth = null,
  not_margin = null,
  showbg = null
}) => {
  return (
    <div className={styles.FrontPageLayout}>
      {/* header */}

      <Header
        headerOptions={HeaderOptions}
        not_margin={not_margin}
        activeLink={activeLink}
        showbg={showbg}
      />

      <div className={`${styles.MainBody} ${auth != null && styles.Auth}`}>{children}</div>

      {/* Live Widget */}
      <LiveChatWidget />

      {/* footer */}

      <Footer FooterOptions={FooterOptions} />
    </div>
  );
};
