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
  }

  const addBase = (base, amount, start, up) => {
    let newBase;
    let newPrice;

    if(start){
      if(!pizza.base.includes(base.title)){
        newBase = [...pizza.base, base.title]
        newPrice = Number(base.price)*amount
        addPrice(newPrice)
      }else{
        newBase = pizza.base.filter(item => item !== base.title)
        newPrice = Number(base.price)*amount
        addPrice(-newPrice)
      }

      setPizza({ ...pizza, base: newBase });
    }else{
      if(up){
        newPrice = totalPrice+Number(amount)
        setTotalPrice(totalPrice = 0)
        addPrice(newPrice)
      }else{
        newPrice = totalPrice-Number(amount)
        setTotalPrice(totalPrice = 0)
        addPrice(newPrice)
      }
    }

  }

  const addTopping = (topping, amount, start, up) => {
    let newToppings;
    let newPrice;

    if(start){
      if (!pizza.toppings.includes(topping.title)) {
        newToppings = [...pizza.toppings, topping.title];
        newPrice = Number(topping.price)*amount
        addPrice(newPrice)
      } else {
        newToppings = pizza.toppings.filter(item => item !== topping.title);
        newPrice = Number(topping.price)*amount
        addPrice(-newPrice)
      }
      setPizza({ ...pizza, toppings: newToppings });
    }else{
      if(up){
        newPrice = totalPrice+Number(amount)
        setTotalPrice(totalPrice = 0)
        addPrice(newPrice)
      }else{
        newPrice = totalPrice-Number(amount)
        setTotalPrice(totalPrice = 0)
        addPrice(newPrice)
      }
    }
  }

  const addDessert = (dessert, amount, start, up) => {
    let newDesserts;
    let newPrice;

    if(start){
      if (!pizza.desserts.includes(dessert.title)) {
        newDesserts = [...pizza.desserts, dessert.title];
        newPrice = Number(dessert.price)*amount
        addPrice(newPrice)
      } else {
        newDesserts = pizza.desserts.filter(item => item !== dessert.title);
        newPrice = Number(dessert.price)*amount
        addPrice(-newPrice)
      }
      setPizza({ ...pizza, desserts: newDesserts });
    }else{
      if(up){
        newPrice = totalPrice+Number(amount)
        setTotalPrice(totalPrice = 0)
        addPrice(newPrice)
      }else{
        newPrice = totalPrice-Number(amount)
        setTotalPrice(totalPrice = 0)
        addPrice(newPrice)
      }
    }

  }

  return (
    <>
      <Header />
      <Modal showModal={showModal} setShowModal={setShowModal} />
      <AnimatePresence exitBeforeEnter onExitComplete={() => setShowModal(false)}>
        <Switch  key={location.key} location={location}>
          <Route path="/base">
            <Base addBase={addBase} pizza={pizza} totalPrice={totalPrice}/>
          </Route>
          <Route path="/toppings">
            <Toppings addTopping={addTopping} pizza={pizza} totalPrice={totalPrice}/>
          </Route>
          <Route path="/desserts">
            <Desserts addDessert={addDessert} pizza={pizza} totalPrice={totalPrice}/>
          </Route>
          <Route path="/order">
            <Order pizza={pizza} setShowModal={setShowModal} />
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