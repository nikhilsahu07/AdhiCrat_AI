import React from "react";
import { Link } from "react-router";
import SplashCursor from "../Bits/SplashCursor/SplashCursor"

function LandingPage() {
  return (
    <div className="h-screen">
      
      LandingPage
      <SplashCursor />
      <Link to="/Auth/login" className="bg-blue-200">
        Login
      </Link>
      <Link to="/app">Get Started</Link>
    </div>
  );
}

export default LandingPage;
