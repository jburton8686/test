import Head from "next/head";
import Navbar from "./Navbar";
//import BttmBttnNv from "./BttmBttnNv";

const AboutLayout = props => (
  <div>
    <Navbar />
    <div className="container">{props.children}</div>
    <link rel="icon" href="/static/favicon.ico" />
    {/* <BttmBttnNv /> */}
  </div>
);

export default AboutLayout;
