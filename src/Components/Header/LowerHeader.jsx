import React from 'react'
import { IoMenu } from "react-icons/io5";
import classes from './Header.module.css'
function LowerHeader() {
  return (
    <div className={classes.lower__container}>
      <ul>
        <li>
          <IoMenu />
          <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Customer Service</li>
        <li>Registery</li>
        <li>Gift Cards</li>
        <li>Sell</li>
        <li>Shop the Gaming Store</li>
      </ul>
    </div>
  );
}

export default LowerHeader