import React from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

const Base = ({ addBase, pizza }) => {
  const bases = [{
    title: 'pizza',
    price: "22.00", 
  },{
    title: 'hamburguer', 
    price: "05.45",
  },{
    title: 'lasanha',
    price: "08.00",
  },{
    title: 'cachorro quente',
    price: "5.00",
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

  const nextVariants = {
    hidden: {
      x:"-100vh"
    },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 120
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
    <motion.div className="base container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >

      <h3>Lanches: Faça seu pedido</h3>
      <ul>
        {bases.map(base => {
          let spanClassTitle = pizza.base.includes(base.title) ? 'active-title' : '';
          let spanClass = pizza.base.includes(base.title) ? 'active' : '';
          return (
            <motion.li key={base} onClick={() => addBase(base.title)}>
              <motion.span
                className={spanClassTitle}
                whileHover={{ scale: 1.3, originX: 0, color: "#f8e112" }}
                transition={{ type: "spring", stiffness: 300 }}  
              >
                {base.title}
              </motion.span>
              <span className={spanClass}>{`R$${Number(base.price).toFixed(2)}`}</span>

            </motion.li>
          )
        })}
      </ul>

      {pizza.base && (
        <motion.div className="next"
          variants={nextVariants}
        >
          <Link to="/toppings">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
            >
              Próximo
            </motion.button>
          </Link>
        </motion.div>
      )}

    </motion.div>
  )
}

export default Base;