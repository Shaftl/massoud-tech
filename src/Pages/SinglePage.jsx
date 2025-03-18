import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./SinglePage.module.css";
import { CaretLeft } from "@phosphor-icons/react";

function SinglePage() {
  const { id } = useParams();
  const [phoneData, setPhoneData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://phone-api-portfolio.onrender.com/api/phone/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setPhoneData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Added id as dependency

  if (loading) return <span className="loader"></span>;
  if (error) return <p>Error: {error.message}</p>;
  if (!phoneData) return <p>No data found.</p>;

  return (
    <div className={styles.phoneBlog}>
      <Link className={`buttonFill ${styles.button}`} to={`/`}>
        <CaretLeft size={22} />
      </Link>
      <div className={styles.blogContainer}>
        <div className={styles.blogBox}>
          <div className={styles.blogImg}>
            <img
              src={`https://phone-api-portfolio.onrender.com/${phoneData.img}`}
              alt={phoneData.name}
              className={styles.phoneImage}
            />
          </div>

          <div className={styles.blogText}>
            <h1 className={styles.title}>{phoneData.name}</h1>
            <div className={styles.paragraph}>
              <p>
                <strong>Released:</strong> {phoneData.released}
              </p>
              <p>
                <strong>Memory:</strong> {phoneData.mermory}
              </p>
              <p>
                <strong>OS:</strong> {phoneData.os}
              </p>
              <p>
                <strong>Display:</strong> {phoneData.display} inches
              </p>
              <p>
                <strong>Resolution:</strong> {phoneData.resolution}
              </p>
              <p>
                <strong>Camera:</strong> {phoneData.camera} MP
              </p>
              <p>
                <strong>Photo & Video:</strong> {phoneData.photoandvideo}p
              </p>
              <p>
                <strong>RAM:</strong> {phoneData.ram} GB
              </p>
              <p>
                <strong>Chipset:</strong> {phoneData.chipset}
              </p>
              <p>
                <strong>Battery:</strong> {phoneData.battery} mAh
              </p>
              <p>
                <strong>Charging:</strong> {phoneData.charging} (
                {phoneData.watt}
                W)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
