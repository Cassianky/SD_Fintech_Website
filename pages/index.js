import React from "react";
import "styles/pages/Home.module.scss";

import DefaultLayout from "components/Layouts/DefaultLayout/DefaultLayout";

const Home = (props) => {
  return (
    <DefaultLayout>
      <div className="container">
        <main className="main">
          <h1 className="title">NUS Fintech Society</h1>
        </main>
      </div>
    </DefaultLayout>
  );
};

export default Home;
