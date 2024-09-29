import React,{useContext,useEffect, useState} from 'react'
import Layout from '../../Layout/Layout'
import {db} from '../../../../Utility/firebase'
import { DataContext } from '../../DataProvider/DataProvider'
import classes from './Orders.module.css'
import ProductCard from '../../Product/ProductCard'

function Orders() {
  const [{user},dispatch] =useContext(DataContext);
  const[orders,setOrders]=useState([]);

   useEffect(() => {
    if(user){
      db.collection("users")
      .doc(user.uid)
      .collection("order")
      .orderBy("created","desc")
      .onSnapshot((snapshot)=>{
        console.log(snapshot);
        setOrders(
          snapshot.docs.map((doc) =>({
            id:doc.id,
            data:doc.data()
          }))

        )
      })
    }
    else{
      setOrders([]);
    }

   
   }, [])
   






  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>Your Orders</h2>
          {
            orders?.length === 0 && <div style={{
              padding:"20px"
            }}>
              you don't have  orders yet.
            </div>
          }
          {/* ordered items */}
          <div>
              {
                orders?.map((eachorder,i) =>{
                  return (
                    <div key={i}>
                      <hr />
                      <p>Order ID: {eachorder?.id}</p>
                      {
                        eachorder?.data?.basket?.map(order =>{
                         return <ProductCard
                          product={order}
                          flex={true}
                          key={order.id}
                          />
                        })
                      }
                    </div>
                  )
                })
              }
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Orders