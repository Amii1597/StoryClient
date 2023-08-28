import React, { useContext,useState } from "react";
import { SwipToryContext } from "../../../SwipToryContext";
import Avatar from "../../../assets/Avatar.png"
import Hamburger from "../../../assets/Hamburger.png";
import "./Navbar.css";
import {FaBars} from "react-icons/fa"
import {ImCross} from "react-icons/im"
export default function Navbar(props) {
  const { isLoggedIn, setIsLoggedIn } = useContext(SwipToryContext);
  const [showUserControls, setShowUserControls] = useState(false);
  const[Mobile,setMobile]=useState(false)
 

  return (
    <>
      <div className="navbar">
        <p>SwipTory</p>
        {!isLoggedIn ? (
          <div className="con">
          <div className={Mobile ? "nav-links-mobile" : "nav-links"} onClick={()=>setMobile(true)}>
          <div className="buttons">
            <button className="regis"
              onClick={() => {
                props.setIsSignUp(true);
              }}
            >
              Register Now
            </button>
            <button className="signin"
              onClick={() => {
                props.setIsLogIn(true);
              }}
            >
              Sign In
            </button>
          
          </div>
        
          </div>
            <div className="mobile-menu-icon" onClick={()=>
              setMobile(!Mobile)
            }>
           {Mobile?  <ImCross className="cross" /> :  <FaBars className="bars"/>}
          </div>
          </div>
        
        ) : (
          <div className={Mobile ? "nav-links-mobile" : "nav-links"} onClick={()=>setMobile(true)}>
          <div className="buttons">
            <button className="bookmarks"
              onClick={() => {
                if(props.bookmarks===false)
                props.setShowBookmarks(true)
                else
                props.setShowBookmarks(false)
              }}
            >
              Bookmarks
            </button>
            <button
              className="addstory"
              onClick={() => props.setAddStory(true)}
            >
              Add Story
            </button>
            <button
              className="Logout"
              onClick={() => {
              setIsLoggedIn(false);
              setShowUserControls(false);
              localStorage.removeItem("token");
              localStorage.removeItem('user');}}
            >
          Logout
            </button>
            <img
              src={Avatar}
              alt="AVATAR"
              className="avatar"
              onClick={() =>
                showUserControls
                  ? setShowUserControls(false)
                  : setShowUserControls(true)
              }
            />
     
            <img
              src={Hamburger}
              alt="User"
              className="hamburger"
              onClick={() =>
                showUserControls
                  ? setShowUserControls(false)
                  : setShowUserControls(true)
              }
            />
          </div>
        </div>
        )}
          <div className="mobile-menu-icon" onClick={()=>
              setMobile(!Mobile)
            }>
           {Mobile?  <ImCross className="rub"/> :  <FaBars className="bars"/>}
          </div>
      </div>
      {showUserControls && (
        <div className="usercontrols">
          <p>{isLoggedIn}</p>
          <button
            onClick={() => {
              setIsLoggedIn(false);
              setShowUserControls(false);
              localStorage.removeItem("token");
              localStorage.removeItem('user');
            }}
          >
            Log Out
          </button>
        </div>
      )}
    </>
  );
}