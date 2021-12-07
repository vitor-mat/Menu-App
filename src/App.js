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

  const [pizza, setPizza] = useState({ base: [], toppings: [], desserts: [] });

  const [showModal, setShowModal] = useState(false)

  const addBase = (base) => {
    let newBase;
    if(!pizza.base.includes(base)){
      newBase = [...pizza.base, base]
    }else{
      newBase = pizza.base.filter(item => item!== base)
    }
    setPizza({ ...pizza, base: newBase });
  }

  const addTopping = (topping) => {
    let newToppings;
    if (!pizza.toppings.includes(topping)) {
      newToppings = [...pizza.toppings, topping];
    } else {
      newToppings = pizza.toppings.filter(item => item !== topping);
    }
    setPizza({ ...pizza, toppings: newToppings });
  }

  const addDessert = (dessert) => {
    let newDesserts;
    if (!pizza.desserts.includes(dessert)) {
      newDesserts = [...pizza.desserts, dessert];
    } else {
      newDesserts = pizza.desserts.filter(item => item !== dessert);
    }
    setPizza({ ...pizza, desserts: newDesserts });
  }

  return (
    <>
      <Header />
      <Modal showModal={showModal} setShowModal={setShowModal} />
      <AnimatePresence exitBeforeEnter onExitComplete={() => setShowModal(false)}>
        <Switch  key={location.key} location={location}>
          <Route path="/base">
            <Base addBase={addBase} pizza={pizza} />
          </Route>
          <Route path="/toppings">
            <Toppings addTopping={addTopping} pizza={pizza} />
          </Route>
          <Route path="/desserts">
            <Desserts addDessert={addDessert} pizza={pizza} />
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