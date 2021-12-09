import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

const Desserts = ({ addDessert, pizza, totalPrice }) => {

  let [desserts, setDesserts] = useState([{
    id: 0,
    title: 'bolo',
    price: '5.00',
    amount: 1,
  },{
    id: 1,
    title: 'pavê',
    price: '4.50',
    amount: 1,
  },{
    id: 2,
    title: 'pudim',
    price: '3.50',
    amount: 1,
  },{
    id: 3,
    title: 'sorvete',
    price: '3.00',
    amount: 1,
  }])

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

  let [up, setUp] = useState(false);

  const updateAmount = (e, dessert) => {

    if(e.target.value <=0){
      let newDessert = desserts.filter(value =>  value===dessert)[0]
      let oldDessert = desserts.filter(value =>  value!==dessert)
      newDessert.amount = 1
      let joinArray = [...oldDessert, newDessert].sort((a, b) => a.id > b.id ? 1 : -1)
      setDesserts(joinArray)
      return;
    }

    let newDessert = desserts.filter(value =>  value===dessert)[0]
    let oldDessert = desserts.filter(value =>  value!==dessert)
    setUp(up = dessert.amount < e.target.value)

    if(Number(dessert.amount) === 2 && !up){
      setUp(up = '2')
    }

    newDessert.amount = e.target.value 
    let joinArray = [...oldDessert, newDessert].sort((a, b) => a.id > b.id ? 1 : -1)
    setDesserts(joinArray)
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
          
          let spanClassTitle;
          let spanClass;
          
          for(let c=0; c<pizza.desserts.length; c++){
            if(pizza.desserts[c].title === dessert.title){
              spanClassTitle = 'active-title'
              spanClass =  'active'
            }
          }

          if(!spanClass){
            spanClassTitle = ''
            spanClass =  ''
          }

          
          return (
            <motion.li key={dessert.title}>
              <div className="li-div-name-and-price-item">
                <motion.span
                  className={spanClassTitle}
                  whileHover={{scale:1.3, originX: 0, color:"#f8e112"}}
                  transition={{type:"spring", stiffness:300}}
                  onClick={() => addDessert(dessert, dessert.amount, true, dessert.price, up)}
                >
                  {dessert.title}
                </motion.span>
                <span
                  className={spanClass}
                  onClick={() => addDessert(dessert, dessert.amount, true, dessert.price, up)}
                >
                  {`R$${dessert.price}`}
                </span>
              </div>
              <input
                type="number"
                min="1"
                onChange={async (e) => await updateAmount(e, dessert)}
                value={dessert.amount}
                onKeyPress={(e) => updateAmount(e, dessert)}
                onClick={(e) => {

                  if(spanClassTitle){
                    if(Number(e.target.value) === 1 && !up){
                      return;
                    }

                    if(Number(e.target.value) === 1 && up === '2'){
                      setUp(up = false)
                    }
                    addDessert(dessert, dessert.amount, false, dessert.price, up)
                  }
                }}
              />
            </motion.li>
          )
        })}
      </ul>

      <Link to="/bebidas">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
        >
          Voltar
        </motion.button>
      </Link>
      <Link to="/pedido">
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