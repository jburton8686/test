import * as _ from "lodash";
import React from "react";
import Dots from "react-activity/lib/Dots";
import MyLayout from "../comps/MyLayout.js";
import Signup from "../comps/VendorForm.js";

const style = {
  image: {
    border: "1px solid #ccc",
    background: "#fefefe"
  }
};

const AdminResults = props => {
  const { isError, isLoading, barData } = props;
  if (!isLoading && !isError && !barData) {
    return (
      <div>
        <p>Results will be displayed here.</p>
      </div>
    );
  } else if (isLoading) {
    return (
      <div
        style={{
          marginTop: 20
        }}
      >
        <Dots color="red" size={60} />
      </div>
    );
  } else {
    // return barData;
    return (
      <div>
        <Signup />
        <h3>Displaying {barData.length} bar(s).</h3>
        <ul className="barList">
          {barData.map(b => (
            <li
              className="bar"
              key={b._id}
              onClick={
                () => console.log(`${b.bar_name}`) //fire a function:modal with full bar info here.
              }
            >
              <div className="text">
                {b.bar_name} <br />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default AdminResults;
