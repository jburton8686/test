import AboutLayout from "../comps/AboutLayout.js";
import Head from "next/head";
import Navbar from "../comps/Navbar.js";
import MyLayout from "../comps/MyLayout.js";
import React from "react";
import { rehydrate, css } from "glamor";
import glamorous from "glamorous";

if (typeof window !== "undefined") {
  rehydrate(window.__NEXT_DATA__.ids);
}
export default () => {
  // css.global("html, body", {
  //   padding: "3rem 1rem",
  //   margin: 0,
  //   background: "#fefefe",
  //   minHeight: "100%",
  //   fontFamily: "Helvetica, Arial, sans-serif",
  //   fontSize: "24px"
  // });

  const basicStyles = {
    backgroundColor: "lavender",
    color: "Black",
    border: "1px solid black",
    borderRight: "none",
    borderBottom: "none",
    boxShadow: "5px 5px 0 0 #a9a9a9, 10px 10px 0 0 #35008f",
    transition: "all 0.1s linear",
    margin: `3rem 0`,
    padding: `0.5rem 0.5rem`
  };

  const hoverStyles = {
    ":hover": {
      color: "white",
      backgroundColor: "lightgray",
      borderColor: "black",
      boxShadow: `-15px -15px 0 0 aqua, -30px -30px 0 0 cornflowerblue`
    },
    "& code": {
      backgroundColor: "linen"
    }
  };

  const crazyStyles = props => {
    const crazyStyles = hoverStyles;
    const bounce = css.keyframes({
      "0%": { transform: `scale(1.01)` },
      "100%": { transform: `scale(0.99)` }
    });
    crazyStyles.animation = `${bounce} 0.2s infinite ease-in-out alternate`;
    return crazyStyles;
  };

  const Basic = glamorous.div(basicStyles);
  const Combined = glamorous.div(basicStyles, hoverStyles);
  const Animated = glamorous.div(basicStyles, hoverStyles, crazyStyles);
  return (
    <div>
      <MyLayout>
        <br />
        <h1>About</h1>
        <Basic>
          <p>Josh</p>
          <img src="../static/img/bourbon2.jpg" alt="Josh" />
        </Basic>
        <Basic>
          <p>Mike</p>
          <img src="../static/img/mikewater1.jpg" alt="Mike" />
        </Basic>
        <Basic>
          <p>Mitch</p>
          <img src="../static/img/rum_coke.jpg" alt="Mitch" />
        </Basic>
        <Basic>
          <p>Roxanne</p>
          <img src="../static/img/rox.jpg" />
        </Basic>
      </MyLayout>

    </div>
  );
};
{
  /* 
// const About = () => (
//   <AboutLayout>
//     <div />
//     <br />
//     <h1>We are the crazy coders who have brought you CHEERS!</h1>
//     <br />
//     <br />
//     <br />

//     <div>
//       <p>Josh</p>
//       <a href="../static/img/joshrum.jpg">
//         <img src="../static/img/joshrum-thumb.jpg" alt="Josh" />
//       </a>
//       <p>Mike</p>
//       <a href="../static/img/mikewater-thumb.jpg">
//         <img src="../static/img/mikewater.jpg" alt="Mike" />
//       </a>
//       <p>Mitch</p>
//       <a href="../static/img/mitchbeer.jpg">
//         <img src="../static/img/mitchbeer-thumb.jpg" alt="Mitch" />
//       </a>
//       <p>Roxanne</p>
//       <a href="../static/img/roxrita.jpg">
//         <img src="../static/img/roxrita-thumb.jpg" />
//       </a>
//       <p>Thing</p>
//       <link rel="icon" href="/static/favicon.ico" />
//       {/* <link
//         rel="stylesheet"
//         href="https://bootswatch.com/4/cyborg/bootstrap.min.css"
//       /> */
}
{
  /* //     </div> */
}
{
  /* //   </AboutLayout> */
}
