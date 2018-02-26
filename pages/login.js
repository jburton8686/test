import MyLayout from "../comps/MyLayout.js";
import Login from "../comps/Login.js";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Information: [] };
  }

  render() {
    return;
  }
}

export default () => {
  return (
    <MyLayout>
      <br />
      <h1>Login</h1>
      <Login />
    </MyLayout>
  );
};
