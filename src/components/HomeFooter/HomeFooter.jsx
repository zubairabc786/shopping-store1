import React from "react";
import styles from "./HomeFooter.module.css";
import img1 from "../../../public/Home Images/10024.svg";
import img2 from "../../../public/Home Images/10025.svg";
import Image from "next/image";

const HomeFooter = () => {
  return (
    <div className="mt-24 grid grid-cols-1 gap-2">
      <div className="flex flex-col border-2 border-t-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <div className={`${styles.card}`}>
            <h1>FOLLOW US:</h1>
            <div className={styles.media_icon}>
              <Image
                src={img1}
                alt="img1"
                width={19}
                height={19}
                className={styles.svg1}
              />
              <Image src={img2} alt="img1" width={19} height={19} />
            </div>
          </div>
          <div className={`${styles.card}`}>
            <h1>Support</h1>
            <p>Refund & Replacement Policy (For Resellers)</p>
            <p>Refund and Replacement Policy (Customers)</p>
            <p>Privacy Policy Terms of Service</p>
          </div>
          <div className={`${styles.card}`}>
            <h1>Company</h1>
            <p>Contact Information</p>
            <p>About Us</p>
          </div>
          <div className={`${styles.card}`}>
            <h1>Powered by</h1>
            <p>
              PerfectDeveloper Store is powered and owned by Tazah Global
              L.L.C-FZ
            </p>
          </div>
        </div>
      </div>
      <div className={styles.footer_content_bottom}>
        <p>
          <span style={{ color: "#142c73" }}>© 2024,</span>{" "}
          <span style={{ color: "#0077fc", textDecorationLine: "underline" }}>
            Zambeel is powered by Tazah Global LLC
          </span>{" "}
        </p>
      </div>
    </div>
  );
};

export default HomeFooter;
