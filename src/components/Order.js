import React, { useState, useEffect } from 'react';

import { motion } from 'framer-motion';

const Order = ({ pizza, setShowModal, totalPrice }) => {

  let [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowModal(true)
    }, 10000)
  }, [setShowModal])

  const containerVariants = {
    hidden: {
      opacity: 0,
      x: '100vh'
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        delay: 0.5,
        mass: 0.4,
        damping: 8,
        when: "beforeChildren",
        staggerChildren: 0.4,
      }
    },
    exit: {
      x: '-100vh',
      transition: {
        ease: 'easeInOut'
      }
    }
  }

  const childVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1
    }
  }

  return (
    <motion.div className="container order"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h2>Obrigado pelo pedido! :)</h2>

      <motion.h2 variants={childVariants}>Seu pedido foi:</motion.h2>
      <motion.div className="order-div-items" variants={childVariants}>
        <motion.p className="order-title-items" variants={childVariants}>Lanches:</motion.p>
        {pizza.base.map(base => <div key={base.title}>{`${base.amount}x ${base.title}`}</div>)}
      </motion.div>
      <motion.div className="order-div-items" variants={childVariants}>
        <motion.p className="order-title-items" variants={childVariants}>Bebidas:</motion.p>
        {pizza.toppings.map(topping => <div key={topping.title}>{`${topping.amount}x ${topping.title}`}</div>)}
      </motion.div>
      <motion.div className="order-div-items" variants={childVariants}>
        <motion.p className="order-title-items" variants={childVariants}>Sobre mesas:</motion.p>
        {pizza.desserts.map(dessert => <div key={dessert.title}>{`${dessert.amount}x ${dessert.title}`}</div>)}
      </motion.div>

      <motion.div variants={childVariants}>
        <motion.span className="total-text">{`Total: R$${totalPrice}`}</motion.span>
      </motion.div>
    </motion.div>
  )
}

export default Order;