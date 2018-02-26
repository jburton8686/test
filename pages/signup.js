import MyLayout from "../comps/MyLayout.js";
import VendorForm from "../comps/VendorForm.js";
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

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Information: [] };
  }
  //   handleChange;
  render() {
    return (
      <MyLayout>
        <br />
        <h1>Sign Up</h1>
        <Basic>
          <VendorForm pageType="sign-up" />
        </Basic>
      </MyLayout>
    );
  }
}
