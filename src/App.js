import { useState } from "react";
import "./App.css";
import "./Loader.css";
import Buttons from "./Buttons";
import "./Button.css";
import "./MenuButton.css";

function App() {
  const [isAnimated, setIsAnimated] = useState(false);
  const [areButtonsLit, setAreButtonsLit] = useState(false);

  const handleClick = () => {
    setIsAnimated((prev) => !prev); // Переключает состояние для анимации
    setAreButtonsLit((prev) => !prev); // Переключает состояние для всех кнопок
  };

  return (
    <div className="flex justify-center items-center h-[100vh] flex-col gap-8">
      <label className="menuButton" htmlFor="check">
        <input type="checkbox" id="check" />
        <span className="top"></span>
        <span className="mid"></span>
        <span className="bot"></span>
      </label>
      <button className="button">
        <div className="wrap">
          <p>
            <span>✧</span>
            <span>✦</span>
            AI VPN
          </p>
        </div>
      </button>

      <button
        onClick={handleClick}
        className="transition-all duration-300 ease-in-out"
      >
        <div className="loader">
          <div className="box">
            <div className="logo">
              <h1 className="text-white">OU</h1>
            </div>
          </div>
          {isAnimated && (
            <>
              <div className="box active"></div>
              <div className="box active"></div>
              <div className="box active"></div>
              <div className="box active"></div>
              <div className="box active"></div>
            </>
          )}
        </div>
      </button>
      <Buttons areButtonsLit={areButtonsLit} isAnimated={isAnimated}/>
    </div>
  );
}

export default App;
