import { useEffect, useState } from "react";
import styles from "./Tablets.module.css";
import { motion } from "framer-motion";
import {
  DeviceMobileSpeaker,
  Aperture,
  Cpu,
  BatteryVerticalFull,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";

function Tablets() {
  const [phoneList, setPhoneList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeOption, setActiveOption] = useState("Iphone");
  const [activePhone, setActivePhone] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://phone-api-portfolio.onrender.com/api/tablets/"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setPhoneList(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Runs only once when the component mounts

  useEffect(
    function () {
      setActivePhone(phoneList[0]?.phones);

      const phoneItem = phoneList.find(
        (phone) => phone.company === activeOption
      );
      setActivePhone(phoneItem?.tablets);
    },
    [activeOption, setActiveOption, phoneList, setPhoneList]
  );

  if (loading) return <span className="loader"></span>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.tablets} id="tablets">
      <div className={styles.tabletsContainer}>
        <div className={styles.tabletsBox}></div>

        <motion.div
          className={styles.options}
          initial={{ opacity: 0, translateY: "10rem" }}
          whileInView={{ opacity: 1, translateY: "0rem" }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 50,
            damping: 10,
          }}
        >
          {phoneList.map((phone) => {
            return (
              <button
                className={`${
                  activeOption === phone.company ? styles.optionsActive : null
                } buttonFill`}
                onClick={() => setActiveOption(phone.company)}
                key={phone.company}
              >
                {phone.company}
              </button>
            );
          })}
        </motion.div>

        <div className={styles.phonesBox}>
          {activePhone?.map((phone, index) => {
            return (
              <motion.div
                className={styles.phonesCard}
                initial={{ opacity: 0, translateY: "10rem" }}
                whileInView={{ opacity: 1, translateY: "0rem" }}
                transition={{
                  duration: 1,
                  type: "spring",
                  stiffness: 50,
                  damping: 10,
                  delay: `0.${index}`,
                }}
                key={phone.id}
              >
                <img
                  src={`https://phone-api-portfolio.onrender.com/${phone.img}`}
                  alt=""
                />

                <p className={styles.price}>{phone.price}</p>
                <div className={styles.layer}>
                  <h3>{phone.name}</h3>
                  <div className={styles.info}>
                    <div className={styles.infoCard}>
                      <DeviceMobileSpeaker
                        size={20}
                        color={"#2be82a"}
                        className={styles.icon}
                      />
                      <h4>{phone.display}</h4>
                      <p>{phone.resolution}</p>
                    </div>
                    <div className={styles.infoCard}>
                      <Aperture
                        size={20}
                        color={"#2be82a"}
                        className={styles.icon}
                      />
                      <h4>{phone.camera}</h4>
                      <p>{phone.photoandvideo}</p>
                    </div>
                    <div className={styles.infoCard}>
                      <Cpu
                        size={20}
                        color={"#2be82a"}
                        className={styles.icon}
                      />
                      <h4>{phone.ram}</h4>
                      <p>{phone.chipset}</p>
                    </div>
                    <div className={styles.infoCard}>
                      <BatteryVerticalFull
                        size={20}
                        color={"#2be82a"}
                        className={styles.icon}
                      />
                      <h4>{phone.battery}</h4>
                      <p>
                        {phone.charging} {phone.watt}
                      </p>
                    </div>
                  </div>

                  <Link to={`/tablet/${phone.id}`} className="buttonFill">
                    Explore
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Tablets;
