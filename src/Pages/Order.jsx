import { useState } from "react";
import styles from "./OrderSection.module.css";
import { motion } from "framer-motion";

export default function OrderSection() {
  const [order, setOrder] = useState({
    product: "iPhone 16 Pro Max",
    quantity: 1,
    name: "",
    email: "",
    address: "",
    payment: "Credit Card",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  return (
    <div className={styles.order} id="order">
      <div className={styles.orderContainer}>
        <div className={styles.orderBox}>
          <div className={styles.container}>
            <motion.h2
              className={styles.title}
              initial={{ opacity: 0, translateY: "10rem" }}
              whileInView={{ opacity: 1, translateY: "0rem" }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 50,
                damping: 10,
              }}
            >
              Place Your Order
            </motion.h2>
            <motion.div
              className={styles.card}
              initial={{ opacity: 0, translateY: "10rem" }}
              whileInView={{ opacity: 1, translateY: "0rem" }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 50,
                damping: 10,
                delay: 0.5,
              }}
            >
              <div className={styles.each}>
                <div className={styles.formGroup}>
                  <label>Product</label>
                  <input
                    type="text"
                    value={order.product}
                    disabled
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={order.quantity}
                    min="1"
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
              </div>
              <div className={styles.each}>
                <div className={styles.formGroup}>
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={order.name}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={order.email}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.each}>
                <div className={styles.formGroup}>
                  <label>Shipping Address</label>
                  <input
                    type="text"
                    name="address"
                    value={order.address}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Payment Method</label>
                  <select
                    name="payment"
                    value={order.payment}
                    onChange={handleChange}
                    className={styles.input}
                  >
                    <option value="Credit Card">Credit Card</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Crypto">Crypto</option>
                  </select>
                </div>
              </div>

              <button className="buttonFill">Confirm Order</button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
