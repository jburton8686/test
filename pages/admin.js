import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
// import AdminResults from "../comps/AdminResults.js";
import MyLayout from "../comps/MyLayout.js";
import VendorForm from "../comps/VendorForm";
import axios from "axios";
//require("dotenv").config();
import { rehydrate, css } from "glamor";
import glamorous from "glamorous";

const basicStyles = {
  backgroundColor: "lavender",
  color: "Black",
  border: "1px solid black",
  borderRight: "none",
  borderBottom: "none",
  boxShadow: "5px 5px 0 0 #a9a9a9, 10px 10px 0 0 #35008f",
  transition: "all 0.1s linear",
  margin: `3rem 0`,
  padding: `0.5rem 0.5rem`,
  fontSize: "24px"
};

const Basic = glamorous.div(basicStyles);

const API_GETBARS = "http://localhost:3001/bars";

const DB_RESULT_LIMIT = 200;

class admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      isLoading: false,
      userData: null,
      barData: null
    };

    this.errorHandler = this.errorHandler.bind(this);
  }
  componentDidMount() {
    this.setState({
      isLoading: true,
      isError: false,
      barData: null,
      userData: null
    });

    this.getBars();
  }

  getBars = () => {
    const barApiSrc = "http://localhost:3001/bars/";

    axios
      .get(barApiSrc)
      .then(res => {
        console.log("RES", res);
        this.setState({ barData: res.data });
      })
      .then(() => this.setState({ isLoading: false }))
      .catch(err => {
        console.log("ADMIN GET INFO ERROR", err);
      });
  };

  toastId = null;
  toastNotify = message => toast(message);

  toastUpdate = () =>
    toast.update(this.toastId, {
      type: toast.TYPE.ERROR,
      autoClose: 5000
    });

  toastDismiss = () => {
    toast.dismiss(this.toastId);
    this.setState({ isError: false });
  };

  dismissAll = () => toast.dismiss();

  errorHandler = (error, verbose = false) => {
    this.setState({ isLoading: false });
    this.toastUpdate(this.toastNotify(error.message));
    this.setState({ isError: false });
    if (!verbose === false) {
      console.log(
        `error: ${error.message}; state: ${JSON.stringify(this.state)}`
      );
    }
  };

  render() {
    return (
      <div>
        <MyLayout>
          <br />
          <h1>Admin</h1>
          <div className="container">
            {/* <div className="col-lg-12 col-md-12 col-sm-12">
            </div> */}
            {this.state.barData &&
              this.state.barData.map(bar => {
                return (
                  <Basic>
                    <VendorForm
                      thisBar={bar}
                      pageType="admin"
                      refresh={this.getBars}
                    />
                  </Basic>
                );
              })}
          </div>
          <ToastContainer />
        </MyLayout>
      </div>
    );
  }
}

export default admin;
