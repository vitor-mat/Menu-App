import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

const Base = ({ addBase, pizza, totalPrice }) => {
  let [bases, setBases] = useState([{
    id: 0,
    title: 'pizza',
    price: "22.00",
    amount: 1 
  },{
    id: 1,
    title: 'hamburguer', 
    price: "05.45",
    amount: 1 
  },{
    id: 2,
    title: 'lasanha',
    price: "08.00",
    amount: 1 
  },{
    id: 3,
    title: 'cachorro quente',
    price: "5.00",
    amount: 1 
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

  let [up, setUp] = useState(false);

  const updateAmount = (e, base) => {

    if(e.target.value <=0){
      let newBase = bases.filter(value =>  value===base)[0]
      let oldBase = bases.filter(value =>  value!==base)
      newBase.amount = 1
      let joinArray = [...oldBase, newBase].sort((a, b) => a.id > b.id ? 1 : -1)
      setBases(joinArray)
      return;
    }

    let newBase = bases.filter(value =>  value===base)[0]
    let oldBase = bases.filter(value =>  value!==base)
    setUp(up = base.amount < e.target.value)

    if(Number(base.amount) === 2 && !up){
      setUp(up = '2')
    }
    newBase.amount = e.target.value 
    let joinArray = [...oldBase, newBase].sort((a, b) => a.id > b.id ? 1 : -1)
    setBases(joinArray)
  }

  return (
    <motion.div className="base container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h2>{`Total: R$${totalPrice.toFixed(2)}`}</h2>
      <h3>Lanches: Faça seu pedido</h3>
      <ul>
        {bases.map((base, index) => {
          let spanClassTitle;
          let spanClass;

          for(let c=0; c<pizza.base.length; c++){
            if(pizza.base[c].title === base.title){
              spanClassTitle = 'active-title'
              spanClass =  'active'
            }
          }

          if(!spanClass){
            spanClassTitle = ''
            spanClass =  ''
          }

          ;
          return (
            <motion.li key={base.title}>
              <div className="li-div-name-and-price-item">
                <motion.span
                  className={spanClassTitle}
                  whileHover={{ scale: 1.3, originX: 0, color: "#f8e112" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => addBase(base, base.amount, true, base.price, up)}  
                >
                  {base.title}
                </motion.span>
                <span
                  className={spanClass}
                  onClick={() => addBase(base, base.amount, true, base.price, up)}
                >
                  {`R$${Number(base.price).toFixed(2)}`}
                </span>
              </div>
              <input
                type="number"
                min="1"
                onChange={async (e) => await updateAmount(e, base)}
                value={base.amount}
                onKeyPress={(e) => updateAmount(e, base)}
                onClick={(e) => {

                  if(spanClassTitle){
                    if(Number(e.target.value) === 1 && !up){
                      return;
                    }

                    if(Number(e.target.value) === 1 && up === '2'){
                      setUp(up = false)
                    }

                    addBase(base, base.amount, false, base.price, up)
                  }
                }}
              />
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