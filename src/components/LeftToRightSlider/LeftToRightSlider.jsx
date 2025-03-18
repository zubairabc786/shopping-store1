import React from "react";
import styles from "./LeftToRightSlider.module.css";
import speaker from "../../../public/Home Images/10017.svg";
import Image from "next/image";

const LeftToRightSlider = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <div className={styles.text_speaker}>
          <Image
            src={speaker}
            width={20}
            height={20}
            className={styles.speaker}
            alt="speaker"
          />
          <p>
            <strong>Join our groups to get in touch with us: </strong>{" "}
            <a
              href="https://chat.whatsapp.com/JQKbJ7wciSJIzGkr2G3CiS"
              target="_blank"
              title="https://chat.whatsapp.com/JQKbJ7wciSJIzGkr2G3CiS"
            >
              <strong
                style={{ color: "#0070fc", textDecorationLine: "underline" }}
              >
                Whatsapp
              </strong>
            </a>
            <strong>, </strong>
            <a
              href="https://www.facebook.com/groups/359082223324078/"
              target="_blank"
              title="https://www.facebook.com/groups/359082223324078/"
            >
              <strong
                style={{ color: "#0070fc", textDecorationLine: "underline" }}
              >
                Facebook
              </strong>
            </a>
          </p>
        </div>
        <div className={styles.text_speaker}>
          <Image
            src={speaker}
            width={20}
            height={20}
            className={styles.speaker}
            alt="Speaker"
          />
          <p>
            <strong>Join our groups to get in touch with us: </strong>{" "}
            <a
              href="https://chat.whatsapp.com/JQKbJ7wciSJIzGkr2G3CiS"
              target="_blank"
              title="https://chat.whatsapp.com/JQKbJ7wciSJIzGkr2G3CiS"
            >
              <strong
                style={{ color: "#0070fc", textDecorationLine: "underline" }}
              >
                Whatsapp
              </strong>
            </a>
            <strong>, </strong>
            <a
              href="https://www.facebook.com/groups/359082223324078/"
              target="_blank"
              title="https://www.facebook.com/groups/359082223324078/"
            >
              <strong
                style={{ color: "#0070fc", textDecorationLine: "underline" }}
              >
                Facebook
              </strong>
            </a>
          </p>
        </div>
      </div>
      <div className={styles.text}>
        <div className={styles.text_speaker}>
          <Image
            src={speaker}
            width={20}
            height={20}
            className={styles.speaker}
            alt="speaker"
          />
          <p>
            <strong>Join our groups to get in touch with us: </strong>{" "}
            <a
              href="https://chat.whatsapp.com/JQKbJ7wciSJIzGkr2G3CiS"
              target="_blank"
              title="https://chat.whatsapp.com/JQKbJ7wciSJIzGkr2G3CiS"
            >
              <strong
                style={{ color: "#0070fc", textDecorationLine: "underline" }}
              >
                Whatsapp
              </strong>
            </a>
            <strong>, </strong>
            <a
              href="https://www.facebook.com/groups/359082223324078/"
              target="_blank"
              title="https://www.facebook.com/groups/359082223324078/"
            >
              <strong
                style={{ color: "#0070fc", textDecorationLine: "underline" }}
              >
                Facebook
              </strong>
            </a>
          </p>
        </div>
        <div className={styles.text_speaker}>
          <Image
            src={speaker}
            width={20}
            height={20}
            className={styles.speaker}
            alt="speaker"
          />
          <p>
            <strong>Join our groups to get in touch with us: </strong>{" "}
            <a
              href="https://chat.whatsapp.com/JQKbJ7wciSJIzGkr2G3CiS"
              target="_blank"
              title="https://chat.whatsapp.com/JQKbJ7wciSJIzGkr2G3CiS"
            >
              <strong
                style={{ color: "#0070fc", textDecorationLine: "underline" }}
              >
                Whatsapp
              </strong>
            </a>
            <strong>, </strong>
            <a
              href="https://www.facebook.com/groups/359082223324078/"
              target="_blank"
              title="https://www.facebook.com/groups/359082223324078/"
            >
              <strong
                style={{ color: "#0070fc", textDecorationLine: "underline" }}
              >
                Facebook
              </strong>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeftToRightSlider;
