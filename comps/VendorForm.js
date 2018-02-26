import React, { Component } from "react";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel,
  PageHeader
} from "react-bootstrap";
import axios from "axios";

// import "./Signup.css";

let barApiSrc = "http://localhost:3001/bars/";

export default class VendorForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      user: this.props.user || {},
      newUser: null,
      thisBar: null || {}
    };
  }

  componentDidMount() {
    this.getBar();
  }

  getBar() {
    if (this.props.pageType == "user") {
      axios
        .get(barApiSrc)
        .then(res => {
          this.setState({ user: res.data[0] });
        })
        .catch(err => {
          console.log("GET USER INFO ERROR", err);
        });
    }
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.id]: event.target.value
      }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const userInfo = this.state.user;

    this.setState({ isLoading: true });
    this.setState({ newUser: "test" });

    const pageType = this.props.pageType;

    if (pageType == "sign-up") {
      axios({
        method: "post",
        url: barApiSrc,
        data: {
          user_name: this.state.user.user_name,
          password: this.state.user.password,
          bar_name: this.state.user.bar_name,
          // address: this.state.user.address,
          // phone: this.state.user.phone,
          type_of_bar: this.state.user.type_of_bar,
          bar_details: this.state.user.bar_details,
          yelp_id: this.state.user.yelp_id
        }
      }).then(res => {
        alert("Profile has been Created");
        window.location = "./user";
        // redirect
        console.log("RESPONSE", res);
      });
    } else if (pageType == "user" || pageType == "admin") {
      //add PUT request here
      const thisId = this.state.user._id;

      axios({
        method: "put",
        url: "http://localhost:3001/bars/" + thisId,
        data: {
          user_name: this.state.user.user_name,
          password: this.state.user.password,
          bar_name: this.state.user.bar_name,
          // address: this.state.user.address,
          // phone: this.state.user.phone,
          type_of_bar: this.state.user.type_of_bar,
          bar_details: this.state.user.bar_details,
          yelp_id: this.state.user.yelp_id
        }
      }).then(res => {
        alert("Profile has been Saved");
        //add redirect (maybe add setTimeout function)
        console.log("PUT RESPONSE", res);
      });
    }

    this.setState({ isLoading: false });
  };

  handleDelete = event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    const barId = this.props.thisBar._id;

    axios
      .delete("http://localhost:3001/bars/" + barId)
      .then(res => {
        alert("Profile has been Deleted");
        console.log("RESPONSE", res);
      })
      .then(() => this.props.refresh())
      .catch(err => {
        console.log("DELETE ERROR ADMIN", err);
      });

    this.setState({ isLoading: false });
  };

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="user_name" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            value={this.state.user.user_name}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.state.user.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="bar_name" bsSize="large">
          <ControlLabel>Bar Name</ControlLabel>
          <FormControl
            value={this.state.user.bar_name}
            onChange={this.handleChange}
            type="name"
          />
        </FormGroup>
        <FormGroup controlId="type_of_bar" bsSize="large">
          <ControlLabel>Type of Bar</ControlLabel>
          <FormControl
            value={this.state.user.type_of_bar}
            onChange={this.handleChange}
            type="name"
          />
        </FormGroup>
        {/* <FormGroup controlId="address" bsSize="large">
          <ControlLabel>Address</ControlLabel>
          <FormControl
            value={this.state.user.address}
            onChange={this.handleChange}
            type="name"
          />
        </FormGroup>
        <FormGroup controlId="phone" bsSize="large">
          <ControlLabel>Phone Number</ControlLabel>
          <FormControl
            value={this.state.user.phone}
            onChange={this.handleChange}
            type="number"
          />
        </FormGroup> */}
        <FormGroup controlId="bar_details" bsSize="large">
          <ControlLabel>Bar Details</ControlLabel>
          <FormControl
            value={this.state.user.bar_details}
            onChange={this.handleChange}
            type="details"
          />
        </FormGroup>
        <FormGroup controlId="yelp_id" bsSize="large">
          <ControlLabel>Yelp ID</ControlLabel>
          <FormControl
            value={this.state.user.yelp_id}
            onChange={this.handleChange}
            type="name"
          />
        </FormGroup>
        <input type="submit" value="Save" />{" "}
      </form>
    );
  }

  renderAdmin() {
    return (
      <form>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            value={this.props.thisBar.user_name}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.props.thisBar.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="barName" bsSize="large">
          <ControlLabel>Bar Name</ControlLabel>
          <FormControl
            value={this.props.thisBar.bar_name}
            onChange={this.handleChange}
            type="name"
          />
        </FormGroup>
        <FormGroup controlId="barType" bsSize="large">
          <ControlLabel>Type of Bar</ControlLabel>
          <FormControl
            value={this.props.thisBar.type_of_bar}
            onChange={this.handleChange}
            type="name"
          />
        </FormGroup>
        {/* <FormGroup controlId="address" bsSize="large">
          <ControlLabel>Address</ControlLabel>
          <FormControl
            value={this.props.thisBar.address}
            onChange={this.handleChange}
            type="name"
          />
        </FormGroup>
        <FormGroup controlId="phone" bsSize="large">
          <ControlLabel>Phone Number</ControlLabel>
          <FormControl
            value={this.props.thisBar.phone}
            onChange={this.handleChange}
            type="number"
          />
        </FormGroup> */}
        <FormGroup controlId="details" bsSize="large">
          <ControlLabel>Bar Details</ControlLabel>
          <FormControl
            value={this.props.thisBar.bar_details}
            onChange={this.handleChange}
            type="details"
          />
        </FormGroup>
        <FormGroup controlId="yelp_id" bsSize="large">
          <ControlLabel>Yelp ID</ControlLabel>
          <FormControl
            value={this.props.thisBar.yelp_id}
            onChange={this.handleChange}
            type="name"
          />
        </FormGroup>
        <input type="submit" value="Save" />{" "}
        <button onClick={event => this.handleDelete(event)}>DELETE</button>
      </form>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.props.pageType == "user" && this.renderForm()}
        {this.props.pageType == "sign-up" && this.renderForm()}
        {this.props.pageType == "admin" && this.renderAdmin()}
      </div>
    );
  }
}
