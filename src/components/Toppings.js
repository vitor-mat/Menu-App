import React from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

const Toppings = ({ addTopping, pizza, totalPrice }) => {

  let toppings = [{
    title: 'capuccino',
    price: '5.00',
  },{
    title: 'água com gás',
    price: '2.00',
  },{
    title: 'refrigerante',
    price: '3.50',
  },{
    title: 'suco de laranja',
    price: '4.50'
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
      <h3>Bebidas: Faça seu pedido</h3>
      <ul>
        {toppings.map(topping => {
          let spanClassTitle = pizza.toppings.includes(topping.title) ? 'active-title' : '';
          let spanClass = pizza.toppings.includes(topping.title) ? 'active' : '';
          return (
            <motion.li key={topping.title} onClick={() => addTopping(topping)}>
              <motion.span
                className={spanClassTitle}
                whileHover={{scale:1.3, originX: 0, color:"#f8e112"}}
                transition={{type:"spring", stiffness:300}}
              >
                {topping.title}
              </motion.span>
              <span className={spanClass}>{`R$${topping.price}`}</span>
            </motion.li>
          )
        })}
      </ul>

      <Link to="/desserts">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
        >
          Próximo
        </motion.button>
      </Link>

    </motion.div>
  )
}

export default Toppings;