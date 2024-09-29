import React, { useState,useContext } from 'react'
import classes from './auth.module.css'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import {auth} from '../../../../Utility/firebase'
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth'
import {DataContext} from '../../DataProvider/DataProvider'
import { Type } from '../../../../Utility/action.type'
import {ClipLoader} from 'react-spinners'
function Auth() {
  const [email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[error,setError] = useState("");
  const[loading,setLoading] =useState(
    {
      signIN:false,
       signUp:false
    }
  )

  const[{user},dispatch] = useContext(DataContext)
  const navigate = useNavigate();
  const navStateData = useLocation();
  console.log("data from nav", navStateData);
 
const authHandler = async(e) =>{
      e.preventDefault();
      console.log(e.target.name);
      if(e.target.name ==='signin'){
        // firebase auth
        setLoading({...loading,signIN:true})
        signInWithEmailAndPassword(auth,email,password).then((userInfo) =>{
          dispatch({
            type:Type.SET_USER,
            user:userInfo.user
          })
          setLoading({...loading,signIN:false})
          navigate(navStateData?.state?.redirect || "/")
        }).catch((err) =>{
          setError(err.message)
          setLoading({...loading,signIN:false})
        })
      }else{
          setLoading({...loading,signUp:true})
          createUserWithEmailAndPassword(auth,email,password).then((userInfo) =>{
            dispatch({
              type: Type.SET_USER,
              user: userInfo.user,
            });
            setLoading({...loading,signUp:false})
            navigate("/");
          }).catch((err) =>{
            setError(err.message);
            setLoading({...loading,signUp:false})
          })
      }
}









  // console.log(email,password);
  return (
    <section className={classes.login}>
      {/* logo */}
      <Link to="/">
        <img src="https://thumbs.dreamstime.com/b/humpolec-czech-republic-january-amazon-company-logo-technology-delivery-shop-store-global-vector-272447019.jpg" />
      </Link>
      {/* form */}
      <div className={classes.login__container}>
        <h1>Sign in</h1>
        {
          navStateData?.state?.msg && (
            <small
            style={{
              padding:"5px",
              textAlign:"center",
              color:"red",
              fontWeight:"bold",
            }}
            >
              {navStateData.state.msg}
            </small>
          )
        }
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            name="signin"
            onClick={authHandler}
            className={classes.login__signInButton}
          >
            {loading.signIN ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
        </form>
        {/* agreement */}
        <p>
          By signing in you agree to Amazon Fake Clone Condition of Use & Sale.
          Please see our Privacy Notice, our cookies Notice and our Interest
          Based Ads notice.
        </p>
        {/* create account Button */}
        <button
          type="submit"
          name="signup"
          onClick={authHandler}
          className={classes.login__registerButton}
        >
          
          {loading.signUp ? <ClipLoader color="#000" size={15} /> : "Create Your Amazon Account"}
        </button>
        {error && (
          <small
            style={{
              paddingTop: "5px",
              color: "red",
            }}
          >
            {error}
          </small>
        )}
      </div>
    </section>
  );
}

export default Auth