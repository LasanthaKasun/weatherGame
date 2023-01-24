import React, { useState } from "react";
import "./App.css";
import { connect, useDispatch } from "react-redux";
import Tempature from "./component/tempature/tempature";
import { addGuessValue, getNewGame } from "./actions/action";
import Message from "./component/message/message";

const App = (props) => {
  const cities = ["Colombo", "Auckland", "California", "Dubai", "London"];
  const apiId = "9cff733aee57cb05b63dd4f731c46bc4";
  const dispatch = useDispatch();
  const [guessValue, setGuessValue] = useState("");
  const [cityIndex, setCityIndex] = useState(0);

  const onChangeValue = (e) => {
    setGuessValue(e.target.value);
  };

  const onHandlePress = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cities[cityIndex]}&appid=${apiId}`
    )
      .then((res) => res.json())
      .then((d) => {
        let celsiusVal = checkGuessValue(d.main.temp);
        let deviationVal = Math.abs(celsiusVal - guessValue);
        dispatch(
          addGuessValue({
            realValue: celsiusVal.toFixed(2),
            value: guessValue,
            win: deviationVal <= 5 ? true : false,
          })
        );
        setCityIndex(cityIndex + 1);
        setGuessValue("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkGuessValue = (realValue) => {
    //convert real value to celsius
    let celsiusVal = parseFloat(realValue) - 273.15;

    return celsiusVal;
  };

  const showFinalMsg = () => {
    const winCount = props.tempatureData.filter((obj) => {
      return obj.win;
    }).length;
    if (winCount >= 3) {
      return <Message message="WIN" onPress={newGame} />;
    } else {
      return <Message message="LOSS" onPress={newGame} />;
    }
  };

  const newGame = () => {
    setCityIndex(0);
    setGuessValue("");
    dispatch(getNewGame());
  };

  return (
    <div className="App">
      <div className="App-header">
        <div className="Game-window">
          <h4 className="Game-title">Guess Game</h4>
          {cityIndex === 5 ? (
            showFinalMsg()
          ) : (
            <div>
              <h5>{cities[cityIndex]}</h5>
              <input
                type="text"
                placeholder="Enter your guess value"
                value={guessValue}
                className="input-cmp"
                onChange={onChangeValue}
              />
              <div>
                <button className="input-btn" onClick={onHandlePress}>
                  Check
                </button>
              </div>
            </div>
          )}
          <div className="footer">
            <div className="footer-result">
              {props.tempatureData &&
                props.tempatureData.map((obj, index) => (
                  <Tempature data={obj} key={index} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStatToProps = (state) => {
  return {
    tempatureData: state.tempatureData,
  };
};

export default connect(mapStatToProps)(App);
