import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import Base from './components/Base';
import Toppings from './components/Toppings';
import Desserts from './components/Desserts';
import Modal from './components/Modal';
import Order from './components/Order';

import { AnimatePresence } from 'framer-motion';

function App() {

  const location = useLocation();

  const [pizza, setPizza] = useState({ base: [], toppings: [], desserts: []});

  let [totalPrice, setTotalPrice] = useState(0);

  const [showModal, setShowModal] = useState(false)


  const addPrice = (price) => {
    setTotalPrice(totalPrice += price)
    if(totalPrice<=0){
      setTotalPrice(totalPrice = 0)
    }
  }

  const addBase = (base, amount, start, price, up) => {
    let newBase = [];
    let newPrice;

    if(start){

      if(pizza.base.length === 0){
        newBase = [...pizza.base, {
          title: base.title,
          amount
        }]
        newPrice = Number(base.price)*amount
        addPrice(newPrice)
      }else{

        for(let c=0; c<pizza.base.length; c++){

          if(pizza.base[c].title === base.title){
            newBase = pizza.base.filter(item => item.title !== base.title)
            newPrice = Number(base.price)*amount
            addPrice(-newPrice)
            break
          }

        }

        if(!newBase.length && !newPrice){
            newBase = [...pizza.base, {
              title: base.title,
              amount
            }]
            newPrice = Number(base.price)*amount
            addPrice(newPrice)
        }
        
      }

      setPizza({ ...pizza, base: newBase });
    }else{
      if(up){
        newPrice = totalPrice+Number(price)
        setTotalPrice(totalPrice = 0)
        addPrice(newPrice)
      }else{
        newPrice = totalPrice-Number(price)
        setTotalPrice(totalPrice = 0)
        addPrice(newPrice)
      }

      for(let c=0; c<pizza.base.length; c++){
        if(pizza.base[c].title === base.title){
          pizza.base[c].amount = amount
        }
      }

    }

  }

  const addTopping = (topping, amount, start, price, up) => {
    let newTopping = [];
    let newPrice;

    if(start){

      if(pizza.toppings.length === 0){
        newTopping = [...pizza.toppings, {
          title: topping.title,
          amount
        }]
        newPrice = Number(topping.price)*amount
        addPrice(newPrice)
      }else{

        for(let c=0; c<pizza.toppings.length; c++){

          if(pizza.toppings[c].title === topping.title){
            newTopping = pizza.toppings.filter(item => item.title !== topping.title)
            newPrice = Number(topping.price)*amount
            addPrice(-newPrice)
            break
          }

        }

        if(!newTopping.length && !newPrice){
            newTopping = [...pizza.toppings, {
              title: topping.title,
              amount
            }]
            newPrice = Number(topping.price)*amount
            addPrice(newPrice)
        }
        
      }

      setPizza({ ...pizza, toppings: newTopping });
    }else{

      if(up){
        newPrice = totalPrice+Number(price)
        setTotalPrice(totalPrice = 0)
        addPrice(newPrice)
      }else{
        newPrice = totalPrice-Number(price)
        setTotalPrice(totalPrice = 0)
        addPrice(newPrice)
      }
    }

    for(let c=0; c<pizza.toppings.length; c++){
      if(pizza.toppings[c].title === topping.title){
        pizza.toppings[c].amount = amount
      }
    }

  }

  const addDessert = (dessert, amount, start, price, up) => {
    let newDessert = [];
    let newPrice;

    if(start){

      if(pizza.desserts.length === 0){
        newDessert= [...pizza.desserts, {
          title: dessert.title,
          amount
        }]
        newPrice = Number(price)*amount
        addPrice(newPrice)
      }else{

        for(let c=0; c<pizza.desserts.length; c++){

          if(pizza.desserts[c].title === dessert.title){
            newDessert = pizza.desserts.filter(item => item.title !== dessert.title)
            newPrice = Number(dessert.price)*amount
            addPrice(-newPrice)
            break
          }

        }

        if(!newDessert.length && !newPrice){
            newDessert = [...pizza.desserts, {
              title: dessert.title,
              amount
            }]
            newPrice = Number(dessert.price)*amount
            addPrice(newPrice)
        }
        
      }

      setPizza({ ...pizza, desserts: newDessert });
    }else{

      if(up){
        newPrice = totalPrice+Number(price)
        setTotalPrice(totalPrice = 0)
        addPrice(newPrice)
      }else{
        newPrice = totalPrice-Number(price)
        setTotalPrice(totalPrice = 0)
        addPrice(newPrice)
      }
    }

    for(let c=0; c<pizza.desserts.length; c++){
      if(pizza.desserts[c].title === dessert.title){
        pizza.desserts[c].amount = amount
      }
    }

  }

  const clearOrder = () => {
    setPizza({ base: [], toppings: [], desserts: []})
    setTotalPrice(totalPrice = 0)
  }

  return (
    <>
      <Header clearOrder={clearOrder}/>
      <Modal showModal={showModal} setShowModal={setShowModal} clearOrder={clearOrder}/>
      <AnimatePresence exitBeforeEnter onExitComplete={() => setShowModal(false)}>
        <Switch  key={location.key} location={location}>
          <Route path="/lanches">
            <Base addBase={addBase} pizza={pizza} totalPrice={totalPrice}/>
          </Route>
          <Route path="/bebidas">
            <Toppings addTopping={addTopping} pizza={pizza} totalPrice={totalPrice}/>
          </Route>
          <Route path="/sobre-mesas">
            <Desserts addDessert={addDessert} pizza={pizza} totalPrice={totalPrice}/>
          </Route>
          <Route path="/pedido">
            <Order pizza={pizza} setShowModal={setShowModal} totalPrice={totalPrice}/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </AnimatePresence>
    </>
  );
}

export default App;