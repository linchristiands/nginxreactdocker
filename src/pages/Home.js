import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="flex flexDirectionColumn alignCenter pt50 fullWidth">
        <h2>ホーム{process.env.REACT_APP_PROJECT_ID}</h2>
        <h4>NEWS</h4>
        <div className="flex flexDirectionColumn fullWidth">
          <ul>
            <li>こんにちは</li>
            <li>こんばんは</li>
            <li>テスト</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
