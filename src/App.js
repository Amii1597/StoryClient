import {lazy, Suspense, useEffect, useState} from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import {SwipToryContext} from "./SwipToryContext";
import axios from "axios";
import './App.css'
const WebHomePage = lazy(()=> import("./WebView/HomePage/WebHomePage"));
function App() {
  const isMobile = checkMobile();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token") == null) return setIsLoggedIn(false);
    const check = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post(
          "https://swiptory22.onrender.com/verify-token",
          {},
          {
            headers: {
              "content-type": "application/x-www-form-urlencoded",
              token: token,
            },
          }
        );
        if (!response.data.error) setIsLoggedIn(localStorage.getItem('user'));
      } catch (e) {
        console.log(e);
      }
    };
    check();
  }, []);
  return (
    <SwipToryContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {isMobile ? (
        <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<MobileHomePage />} /> */}
            {/* <Route path="/bookmarks" element={<MobBookmarks/>} /> */}
          </Routes>
        </BrowserRouter>
        </Suspense>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<WebHomePage />} />
         
            </Routes>
          </BrowserRouter>
        </Suspense>
      )}
    </SwipToryContext.Provider>
  );
}

function checkMobile() {
  if (
    window.navigator.userAgent.includes("Windows") ||
    window.navigator.userAgent.includes("Mac")
  )
    return false;
  else return true;
}

export default App