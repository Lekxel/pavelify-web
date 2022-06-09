import React from "react";
import styles from "./PolicyList.module.css";
export const PolicyList = ({ EachPolicy }) => {
  return (
    <ul>
      <li className={styles.head}>{EachPolicy["heading"]}</li>
      {EachPolicy["list"].map((list, index) => (
        <EachP key={String(new Date().getTime() * index)} EachPolicy={EachPolicy} list={list} />
      ))}
    </ul>
  );
};

const EachP = ({ list, EachPolicy }) => (
  <>
    <li className={styles.list}>{list}</li>
    {EachPolicy["extra"] !== null &&
      EachPolicy["extra"].map((list, index) => (
        <ul key={String(index)} className={styles.subList}>
          <li className={styles.Subhead}>{list.heading}</li>
          <li className={styles.list}>{list.value}</li>
        </ul>
      ))}
  </>
);
