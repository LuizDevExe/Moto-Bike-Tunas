import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Cart.css'
import trash from '../../assets/waste/trash.svg'
import WhatsappButton from '../WhatsappButton/WhatsappButton';

const Cart = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState([]);

    const cartVariants = {
        open: { x: 0 },
        closed: { x: "100%" }
    };

    useEffect(() => {
        const handleCartUpdate = () => {
            const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
            setCart(updatedCart);
        };

        handleCartUpdate();
        window.addEventListener("cartUpdated", handleCartUpdate);

        return () => {
            window.removeEventListener("cartUpdated", handleCartUpdate);
        };
    }, []);

    function totalCartPrice() {
        let total = 0;

        cart.forEach((item) => {
            const price = parseFloat(item.price.replace(',', '.')) || 0;
            total += item.quantity * price;
        });

        const formattedTotal = total.toFixed(2).replace('.', ',');

        return formattedTotal;
    }

    function changeQuantity(newQuantity, index) {
        if (newQuantity < 1) {
            setCart((prevCart) => {
                const updatedCart = prevCart.filter((item, i) => i !== index);
                localStorage.setItem("cart", JSON.stringify(updatedCart));

                const cartUpdatedEvent = new Event("cartUpdated");
                window.dispatchEvent(cartUpdatedEvent);

                return updatedCart;
            });
            return;
        }

        setCart((prevCart) => {
            const updatedCart = [...prevCart];
            updatedCart[index].quantity = newQuantity;

            localStorage.setItem("cart", JSON.stringify(updatedCart));

            const cartUpdatedEvent = new Event("cartUpdated");
            window.dispatchEvent(cartUpdatedEvent);

            return updatedCart;
        });
    }


    return (
        <div className='container-cart button'>

            <button onClick={() => setIsOpen(!isOpen)}>
                <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/shopping-cart--v1.png" alt="shopping-cart--v1" />
                {cart.length > 0 && <div className="dot-cart"></div>}
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

                <div className='cart-items-container'>
                    {cart.map((item, index) => {
                        return (
                            <section className='item-cart' key={index}>
                                <img src={item.image_url} alt="" />
                                <div>
                                    <h2>{item.product.length > 20 ? item.product.slice(0, 20) + '...' : item.product}</h2>
                                    <h3>R$ {item.price}</h3>
                                </div>
                                <section className="quantity-controls">
                                    <button onClick={() => changeQuantity(item.quantity - 1, index)}>
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => changeQuantity(item.quantity + 1, index)}>
                                        +
                                    </button>
                                </section>
                            </section>
                        )
                    })}
                </div>

                <div className="cart-bottom">
                    <div className="total">
                        <h3>Total: R$ {totalCartPrice()}  </h3>
                    </div>
                    <WhatsappButton products={cart} />
                </div>
            </motion.div>
        </div>
    );
};

export default Cart;
