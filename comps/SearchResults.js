import * as _ from "lodash";
import React from "react";
import Dots from "react-activity/lib/Dots";
import MyLayout from "../comps/MyLayout.js";
import { rehydrate, css } from "glamor";
import glamorous from "glamorous";

const style = {
  image: {
    border: "1px solid #ccc",
    background: "#fefefe"
  }
};

const basicStyles = {
  backgroundColor: "lavender",
  color: "Black",
  border: "1px solid black",
  borderRight: "none",
  borderBottom: "none",
  boxShadow: "5px 5px 0 0 #a9a9a9, 10px 10px 0 0 #35008f",
  transition: "all 0.1s linear",
  margin: `3rem 0`,
  padding: `0.5rem 0.5rem`
};

const Basic = glamorous.div(basicStyles);

const SearchResults = props => {
  const { isError, isLoading, yelpResults } = props;
  if (!isLoading && !isError && !yelpResults) {
    return (
      <div>
        <br />
        <img src="../static/img/bwbar.jpg" />
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
    const myResultByDistance = _.orderBy(yelpResults, ["distance"], ["asc"]);
    let distObject = {};
    distObject.businesses = myResultByDistance;
    console.log(yelpResults);
    // return yelpResults;
    return (
      <div>
        <h3>
          Displaying {yelpResults.length} results out of {yelpResults.total} on
          Yelp.
        </h3>
        <ul className="business">
          {distObject.businesses.map(b => (
            <li
              className="business"
              key={b.id}
              onClick={() =>
                console.log(`${b.name} is at ${b.location.display_address}`)
              }
            >
              <div className="text">
                <Basic>
                  <b>{b.name}</b> <br />
                  {b.bar_details || ""} <br /> <br />
                  {b.location.display_address} <br />
                  {b.display_phone} <br />
                  <span className="badge">
                    <div>
                      <img
                        src={b.image_url}
                        height={240}
                        width={240}
                        style={style.image}
                      />{" "}
                    </div>
                  </span>{" "}
                  <br />
                  <a href={b.url} style={{ color: "black" }}>
                    {/* <a href={b.url}> */}
                    Yelp Page
                  </a>{" "}
                </Basic>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default SearchResults;
