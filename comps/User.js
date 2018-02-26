import ReactDOM from "react-dom";

class Form extends React.Component {
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
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input type="text" ref={input => (this.input = input)} />
        </label>{" "}
        <br />
        <label>
          Password:
          <input type="text" ref={input => (this.input = input)} />
        </label>{" "}
        <br />
        <label>
          Bar Name:
          <input type="text" ref={input => (this.input = input)} />
        </label>{" "}
        <br />
        <label>
          Bar Type:
          <input type="text" ref={input => (this.input = input)} />
        </label>{" "}
        <br />
        <label>
          Bar Address:
          <input type="text" ref={input => (this.input = input)} />
        </label>{" "}
        <br />
        <label>
          Phone Number:
          <input type="text" ref={input => (this.input = input)} />
        </label>{" "}
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Form;
