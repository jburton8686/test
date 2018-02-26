import axios from "axios";
import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import SearchResults from "../comps/SearchResults.js";
import MyLayout from "../comps/MyLayout.js";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel,
  PageHeader
} from "react-bootstrap";
//require("dotenv").config();

class search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      isLoading: false,
      searchText: "",
      yelpResults: null
    };

    this.errorHandler = this.errorHandler.bind(this);
    this.getYelpData = this.getYelpData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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

  getYelpData = () => {
    axios.get("https://api.yelp.com/v3/businesses/search?")(
      `${CORS_ANYWHERE_URL}${yelpQueryString}`
    );
    headers: {
      {
        "Content - Type" === "application/x-www-form-urlencoded";
      }
      {
        "Authorization" === `Bearer ${YELP_API_key}`;
      }
    }
  };

  gYelpData = () => {
    const YELP_RESULT_LIMIT = 5;

    //const YELP_API_key = process.env.REACT_APP_YELP_API_key;
    // Configure axios headers to use our Yelp API key:
    const YELP_API_key =
      "Pu9AtNK5eBvInV3K9wYYI61bfEE5zy_NGh9CUI_x02IJEnxb4l26ckygnr20v3IEgoFtkGm68-sao8jPPhhVU1a8NL6l0AGsJrl6VNW_UQM4zDdcKKOeV2IQPmhmWnYx";

    const CORS_ANYWHERE_URL = "https://shrouded-basin-35216.herokuapp.com/";
    const API_YELP_SEARCH = "https://api.yelp.com/v3/businesses/search?";
    const yelpQueryString = `${API_YELP_SEARCH}categories=${"nightlife"}&term=${encodeURI(
      this.state.searchText
    )}&location=${encodeURI("tempe, az")}&limit=${YELP_RESULT_LIMIT}`;

    return axios.get(`${CORS_ANYWHERE_URL}${yelpQueryString}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${YELP_API_key}`
      }
    });
  };

  getBars = () => {
    return axios.get("http://localhost:3001/bars/");
  };

  asyncCall() {
    Promise.all([this.gYelpData(), this.getBars()]).then(results => {
      console.log(results);
      let barData = results[1].data;
      let yelpData = results[0].data.businesses;
      console.log(yelpData);
      let finalArray = [];

      yelpData.map(b => {
        let index = _.findIndex(barData, { yelp_id: b.id });
        // console.log(`Index: ${index}`);
        if (index !== -1) {
          // We have a match; add your bar array details to the Yelp array (add arrA to arrB)
          b.bar_details = barData[index].bar_details;
          b.type_of_bar = barData[index].type_of_bar;
          // console.log(`We have a match on name. Inserting ${barData[index].details}`);
        }
        finalArray.push(b);
      });

      console.log(`Final Array: ${JSON.stringify(finalArray)}`);

      this.setState({ yelpResults: finalArray, isLoading: false });
    });
  }

  handleSearchTextChange = event => {
    this.setState({ searchText: event.target.value });
    if (event.target.value.length === 0) {
      this.setState({ yelpResults: null });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ yelpResults: null });
    this.setState({ isLoading: true });
    // Clear any errors we may have had from a previous attempt:
    this.setState({ isError: false });
    this.asyncCall();
  };

  render() {
    return (
      <div>
        <MyLayout>
          <div className="container">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <br />
              <form onSubmit={this.handleSubmit}>
                <div className="row">
                  <FormGroup controlId="search" bsSize="large">
                    <FormControl
                      type="text"
                      autoFocus
                      name="searchText"
                      onChange={this.handleSearchTextChange}
                      placeholder="Search Here"
                      value={this.state.searchText}
                    />
                  </FormGroup>{" "}
                  <input
                    disabled={
                      this.state.searchText.length === 0 ||
                      this.state.isLoading ||
                      this.state.error
                    }
                    type="submit"
                    value="Search"
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12">
            <SearchResults
              isError={this.state.isError}
              isLoading={this.state.isLoading}
              yelpResults={this.state.yelpResults}
            />
          </div>
        </MyLayout>
        {/*This should be above ToastContainer*/}
        <ToastContainer />
      </div>
    );
  }
}

export default search;
