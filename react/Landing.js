import React from "react";
import Hero from "./Hero";
import Cta from "./Cta";
import Overview from "./Overview";
import Reviews from "./Reviews";
import Membership from "./Membership";

const Landing = (props) => {
  return (
    <>
      <Hero {...props} />
      <Cta />
      <Overview></Overview>
      <Reviews></Reviews>
      <Membership></Membership>
    </>
  );
};

export default Landing;
