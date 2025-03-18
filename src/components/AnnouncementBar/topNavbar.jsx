"use client";

import { useEffect, useState } from "react";
import styles from "./topNavbar.module.css";

const TopNavbar = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={isActive ? styles.topToBottom : styles.bottomToTop}
        style={{
          color: "#142c73",
          background: "#ffd701",
          fontWeight: "bold",
          paddingTop: "6px",
        }}
      >
        Welcome to UAE's First Cross Border Drop Shipping Platform
      </div>
      <div
        className={isActive ? styles.bottomToTop : styles.topToBottom}
        style={{
          color: "#fff",
          background: "#142c73",
          fontWeight: "bold",
          paddingTop: "6px",
        }}
      >
        High Quality Products Added Every Day
      </div>
    </div>
  );
};

export default TopNavbar;
