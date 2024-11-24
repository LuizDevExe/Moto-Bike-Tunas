import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Cart.css'

const Cart = () => {
    const [isOpen, setIsOpen] = useState(false);

    const cartVariants = {
        open: { x: 0 },
        closed: { x: "100%" }
    };

    return (
        <div className='container-cart button'>

            <button onClick={() => setIsOpen(!isOpen)}>
                <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/shopping-cart--v1.png" alt="shopping-cart--v1" />
            </button>

            <motion.div
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={cartVariants}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    width: "25vw",
                    height: "100vh",
                    backgroundColor: "#fff",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    zIndex: 1000,
                    padding: "20px",
                }}
            >
                <button onClick={() => setIsOpen(!isOpen)}>
                    <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/multiply-2.png" alt="multiply-2" />
                </button>

                <h2>Seu Carrinho</h2>
                <p>itens</p>
            </motion.div>
        </div>
    );
};

export default Cart;
