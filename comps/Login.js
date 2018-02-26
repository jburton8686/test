import ReactDOM from "react-dom";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel,
  PageHeader
} from "react-bootstrap";
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

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    alert("A search was submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <Basic>
        <form action="http://localhost:3000/admin">
          <FormGroup controlId="user_name" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl type="email" onChange={this.handleChange} />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl onChange={this.handleChange} type="password" />
          </FormGroup>
          <input type="submit" value="Login" />{" "}
        </form>
      </Basic>
    );
  }
}

export default Login;
