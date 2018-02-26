import Head from "next/head";
import Navbar from "../comps/Navbar.js";

//import BttmBttnNv from "./BttmBttnNv";
import SearchResults from "./SearchResults";
// import signin from "../pages/signin";

const MyLayout = props => (
  <div>
    <Head>
      <title>CHEERS hello</title>
      <link
        rel="stylesheet"
        href="https://bootswatch.com/4/pulse/bootstrap.min.css"
      />
    </Head>
    <Navbar />

    <div className="container">{props.children}</div>
  </div>
);

export default MyLayout;
//<--notes:
