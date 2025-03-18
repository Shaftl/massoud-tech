import styles from "./Footer.module.css";
import { motion } from "framer-motion";

function Footer() {
  return (
    <motion.div
      className={styles.footer}
      initial={{ opacity: 0, translateY: "10rem" }}
      whileInView={{ opacity: 1, translateY: "0rem" }}
      transition={{
        duration: 1,
        type: "spring",
        stiffness: 50,
        damping: 10,
      }}
    >
      Copyright &copy; by Aliabbas Rahimi
    </motion.div>
  );
}

export default Footer;
