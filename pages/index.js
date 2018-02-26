import MyLayout from "../comps/MyLayout.js";

const Index = props => (
  <MyLayout>
    <div>
      <h1>
        <img src="../static/img/cheersBG.png" />
      </h1>
      <h2>Find a place where you belong.</h2>

      <style global jsx>{`
        body {
          // background-color: #6face3;
          text-align: center;
          font-stretch: expanded;
          text-shadow: 1px 1px #b0ecff;
          font-family: "Julius Sans One", sans-serif;
        }
      `}</style>
      <style jsx>{`
        
        h2 {
          color: black;
          font-size: 25px;
        }

        h1 {
          color: white;
          margin-bottom: 30px;
        
      `}</style>
      <img src="../static/img/bwbar.jpg" />
    </div>
  </MyLayout>
);

export default Index;
