import styles from "./About.module.css";
import { ArrowBendRightDown } from "@phosphor-icons/react";
import { motion } from "framer-motion";

function About() {
  return (
    <div className={styles.about} id="about">
      <div className={styles.aboutContainer}>
        <div className={styles.aboutBox}>
          <motion.div
            className={styles.aboutImg}
            initial={{ opacity: 0, translateX: "-10rem" }}
            whileInView={{ opacity: 1, translateX: "0rem" }}
            transition={{
              duration: 2,
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
          >
            <img src="./aboutbg.png" alt="Shop" />
          </motion.div>

          <motion.div
            className={styles.aboutText}
            initial={{ opacity: 0, translateX: "10rem" }}
            whileInView={{ opacity: 1, translateX: "0rem" }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            <h2>Massoud Tech – Your One-Stop Shop for the Latest Gadgets</h2>

            <p>
              Discover the latest smartphones, tablets, and accessories at
              Massoud Tech. We provide high-quality gadgets with unbeatable
              deals and top-notch customer service. Shop now for the best in
              tech innovation!
            </p>

            <button
              className="buttonFill"
              onClick={() => {
                document
                  .getElementById("smartphones")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Our Products
              <ArrowBendRightDown size={16} />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default About;
