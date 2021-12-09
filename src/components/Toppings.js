import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

const Toppings = ({ addTopping, pizza, totalPrice }) => {

  let [toppings, setToppings] = useState([{
    id: 0,
    title: 'capuccino',
    price: '5.00',
    amount: 1,
  },{
    id: 1,
    title: 'água com gás',
    price: '2.00',
    amount: 1,
  },{
    id: 2,
    title: 'refrigerante',
    price: '3.50',
    amount: 1,
  },{
    id: 3,
    title: 'suco de laranja',
    price: '4.50',
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

  const updateAmount = (e, topping) => {

    if(e.target.value <=0){
      let newTopping = toppings.filter(value =>  value===topping)[0]
      let oldTopping = toppings.filter(value =>  value!==topping)
      newTopping.amount = 1
      let joinArray = [...oldTopping, newTopping].sort((a, b) => a.id > b.id ? 1 : -1)
      setToppings(joinArray)
      return;
    }

    let newTopping = toppings.filter(value =>  value===topping)[0]
    let oldTopping = toppings.filter(value =>  value!==topping)
    setUp(up = topping.amount < e.target.value)

    if(Number(topping.amount) === 2 && !up){
      setUp(up = '2')
    }

    newTopping.amount = e.target.value 
    let joinArray = [...oldTopping, newTopping].sort((a, b) => a.id > b.id ? 1 : -1)
    setToppings(joinArray)
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

          let spanClassTitle;
          let spanClass;

          for(let c=0; c<pizza.toppings.length; c++){
            if(pizza.toppings[c].title === topping.title){
              spanClassTitle = 'active-title'
              spanClass =  'active'
            }
          }

          if(!spanClass){
            spanClassTitle = ''
            spanClass =  ''
          }

          return (
            <motion.li key={topping.title} >
              <div className="li-div-name-and-price-item">
                <motion.span
                  className={spanClassTitle}
                  whileHover={{scale:1.3, originX: 0, color:"#f8e112"}}
                  transition={{type:"spring", stiffness:300}}
                  onClick={() => addTopping(topping, topping.amount, true, topping.price, up)}
                >
                  {topping.title}
                </motion.span>
                <span
                  className={spanClass}
                  onClick={() => addTopping(topping, topping.amount, true, topping.price, up)}
                >
                  {`R$${topping.price}`}
                </span>
              </div>
              <input
                type="number"
                min="1"
                onChange={async (e) => await updateAmount(e, topping)}
                value={topping.amount}
                onKeyPress={(e) => updateAmount(e, topping)}
                onClick={(e) => {

                  if(spanClassTitle){
                    if(Number(e.target.value) === 1 && !up){
                      return;
                    }

                    if(Number(e.target.value) === 1 && up === '2'){
                      setUp(up = false)
                    }
                    addTopping(topping, topping.amount, false, topping.price, up)
                  }
                }}
              />
            </motion.li>
          )
        })}
      </ul>

      <Link to="/lanches">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
        >
          Voltar
        </motion.button>
      </Link>
      <Link to="/sobre-mesas">
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