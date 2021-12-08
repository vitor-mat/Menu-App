import React from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

const Desserts = ({ addDessert, pizza, totalPrice }) => {

  let desserts = [{
    title: 'bolo',
    price: '5.00',
  },{
    title: 'pavê',
    price: '4.50',
  },{
    title: 'pudim',
    price: '3.50'
  },{
    title: 'sorvete',
    price: '3.00'
  }];

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
        delay: 0.5
      }
    },
    exit:{
      x:'-100vh',
      transition: {
        ease: 'easeInOut'
      }
    }
  }
  
  const buttonVariants = {
    hover:{
      scale:[1, 1.1,1, 1.1,1],
      textShadow: "0px 0px 8px rgb(255, 255, 255)",
      boxShadow: "0px 0px 8px rgb(255, 255, 255)",
      transition:{
        yoyo: Infinity
      }
    }
  }

  return (
    <motion.div className="toppings container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h2>{`Total: R$${totalPrice.toFixed(2)}`}</h2>
      <h3>Sobre Mesas: Faça seu pedido</h3>
      <ul>
        {desserts.map(dessert => {
          let spanClassTitle = pizza.desserts.includes(dessert.title) ? 'active-title' : '';
          let spanClass = pizza.desserts.includes(dessert.title) ? 'active' : '';
          return (
            <motion.li key={dessert} onClick={() => addDessert(dessert)}>
              <motion.span
                className={spanClassTitle}
                whileHover={{scale:1.3, originX: 0, color:"#f8e112"}}
                transition={{type:"spring", stiffness:300}}
              >
                {dessert.title}
              </motion.span>
              <span className={spanClass}>{`R$${dessert.price}`}</span>
            </motion.li>
          )
        })}
      </ul>

      <Link to="/order">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
        >
          Finalizar
        </motion.button>
      </Link>

    </motion.div>
  )
}

export default Desserts;