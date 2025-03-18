import React, { useState, useEffect } from "react";
import styles from "./Homepage.module.css";
import Spline from "@splinetool/react-spline";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowBendRightDown,
  Cpu,
  Aperture,
  BatteryVerticalFull,
} from "@phosphor-icons/react";

const featuredPhones = [
  {
    name: "N iPhone 16 Pro Max",
    description:
      "The iPhone 16 series, unveiled on September 9, 2024, represents Apple's latest advancements in smartphone technology.",
    imageUrl: null, // Add actual image URL
    ram: "8",
    battery: "4685",

    display: '6.9"',
    resolution: "1320x2868 pixels",
    camera: "48",
    photoandvideo: "2160p",
    chipset: "Apple A18 Pro",
    charging: "PD2.0",
    watt: "25W",
    price: "$1200",
  },
  {
    name: "OnePlus 11",
    description:
      "Discover seamless performance and top-tier design with the OnePlus 11, engineered for speed and efficiency.",
    imageUrl: "./3.png", // Add actual image URL
    ram: "8",
    battery: "4500",

    display: '6.7"',
    resolution: "1440x3216 pixels",
    camera: "50",
    photoandvideo: "4320p",
    chipset: "Snapdragon 8 Gen 2",
    charging: "100W",
    watt: "",
    price: "$479.99",
  },
  {
    name: "Samsung Galaxy S23 Ultra",
    description:
      "Experience the ultimate display and performance with the Samsung Galaxy S23 Ultra, built for power and style.",
    imageUrl: "./1.png", // Add actual image URL
    ram: "12",
    battery: "5000",

    display: '6.8"',
    resolution: "1440x3088 pixels",
    camera: "200",
    photoandvideo: "4320p",
    chipset: "Snapdragon 8 Gen 2",
    charging: "45W",
    watt: "15W",
    price: "$759.99",
  },
  {
    name: "Google Pixel 8 Pro",
    description:
      "Capture every detail with Google Pixel 8 Pro’s advanced camera system and refined design.",
    imageUrl: "./2.png", // Add actual image URL
    ram: "12",
    battery: "5050",

    display: '6.7"',
    resolution: "1344x2992 pixels",
    camera: "50",
    photoandvideo: "2160p",
    chipset: "Google Tensor G3",
    charging: "30W",
    watt: "23W",
    price: "$999.00",
  },

  {
    name: "Xiaomi 13 Pro",
    description:
      "The Xiaomi 13 Pro offers innovative design and flagship-level specs to elevate your mobile experience.",
    imageUrl: "./4.png", // Add actual image URL
    ram: "12",
    battery: "4820",

    display: '6.73"',
    resolution: "1440x3200 pixels",
    camera: "50",
    photoandvideo: "4320p",
    chipset: "Snapdragon 8 Gen 2",
    charging: "120W",
    watt: "50W",
    price: "$1035.09",
  },
];

function Homepage() {
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIndex((prevIndex) => (prevIndex + 1) % featuredPhones.length);
    }, 15000); // Set interval to 7 seconds
    return () => clearInterval(interval);
  }, []);

  // Using percentage values for a consistent transition distance
  const textVariants = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: "0%", opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };

  const currentPhone = featuredPhones[featuredIndex];

  return (
    <section className={styles.hero} id="home">
      <div className={styles.heroContainer}>
        <div className={styles.heroBox}>
          <div className={styles.heroText}>
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentPhone.name}
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {currentPhone.name}
              </motion.h1>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentPhone.description}
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.6, ease: "easeInOut", delay: 0.1 }}
              >
                {currentPhone.description}
              </motion.p>
            </AnimatePresence>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              onClick={() => {
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Scroll down <ArrowBendRightDown size={16} />
            </motion.button>
          </div>

          <div className={styles.imageContainer}>
            <AnimatePresence mode="wait">
              {currentPhone.imageUrl !== null ? (
                <motion.img
                  key={currentPhone.imageUrl} // Triggers re-animation when image changes
                  src={currentPhone.imageUrl}
                  alt="Phone"
                  className={styles.phoneImg}
                  initial={{ opacity: 0, scale: 0.95, x: 50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95, x: -50 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              ) : null}
            </AnimatePresence>
          </div>
          <div className={`${styles.imageContainer} ${styles.spline}`}>
            {/* Conditionally render the Spline based on the current featured phone */}
            {currentPhone.name === "N iPhone 16 Pro Max" && (
              <div>
                <Spline
                  scene="https://prod.spline.design/QR5hmna5K1M0O0zu/scene.splinecode"
                  className={`${styles.iphoneSpline} ${styles.responsiveSpline}`}
                />

                <AnimatePresence mode="wait">
                  <motion.img
                    src="./6.png"
                    alt="Phone"
                    className={`${styles.phoneImg} ${styles.phoneImgIphon}`}
                    initial={{ opacity: 0, scale: 0.95, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95, x: -50 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className={styles.pagination}>
            <button
              onClick={() =>
                setFeaturedIndex(
                  (prev) =>
                    (prev - 1 + featuredPhones.length) % featuredPhones.length
                )
              }
            >
              ◀
            </button>

            <button
              onClick={() =>
                setFeaturedIndex((prev) => (prev + 1) % featuredPhones.length)
              }
            >
              ▶
            </button>
          </div>

          <div className={styles.aboutPhone}>
            <motion.div
              className={styles.aboutCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Aperture size={23} />
              <div className={styles.layer}>
                <h4>
                  {currentPhone.camera}
                  <span>MP</span>
                </h4>
                <p>{currentPhone.photoandvideo}</p>
              </div>
            </motion.div>
            <motion.div
              className={styles.aboutCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Cpu size={23} />
              <div className={styles.layer}>
                <h4>
                  {currentPhone.ram}
                  <span>GB RAM</span>
                </h4>
                <p>{currentPhone.chipset}</p>
              </div>
            </motion.div>
            <motion.div
              className={styles.aboutCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <BatteryVerticalFull size={23} />
              <div className={styles.layer}>
                <h4>
                  {currentPhone.battery}
                  <span>mAh</span>
                </h4>
                <p>
                  {currentPhone.charging} {currentPhone.watt}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Homepage;
