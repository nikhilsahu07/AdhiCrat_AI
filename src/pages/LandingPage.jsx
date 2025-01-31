import React from "react";
import { Link } from "react-router";
import SplashCursor from "../Bits/SplashCursor/SplashCursor";
import { Typography } from "@mui/material";
import BlurText from "../Bits/BlurText/BlurText";
import Squares from "../Bits/Squares/Squares";
import ShinyText from "../Bits/Shinytext/ShinyText";
import { ArrowRightAlt } from "@mui/icons-material";

function LandingPage() {
  return (
    <div className="h-screen flex flex-col bg-[#e1e1e1] justify-center items-center gap-11">
      {/* <Squares
        speed={0.5}
        squareSize={40}
        direction="diagonal" // up, down, left, right, diagonal
        borderColor="#fff"
        hoverFillColor="#222"
      /> */}

      {/* <div className="absolute z-10 gap-y-11 flex flex-col justify-center items-center"> */}
      <BlurText
          text="ADHICRAT"
          delay={150}
          animateBy="letters"
          direction="bottom"
          // onAnimationComplete={handleAnimationComplete}
          className="text-9xl text-[#1e1e1e] samarkan"
        />
        {/* </Typography> */}
        <Link to="/app" className="bg-gray-800 px-4 py-2">
          <ShinyText text="Get Started" disabled={false} speed={3} className='' />
        </Link>
      {/* </div> */}
      
      <SplashCursor />
    </div>
  );
}

export default LandingPage;
