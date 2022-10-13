import React, { useEffect } from "react";
import "./App.scss";
import {
  ArcadeCoinMachine,
  ArcadeCoinMachineMode,
  Coin,
  CoinStatus,
  CoinType,
} from "./ArcadeMachine";

const arcadeMachine = new ArcadeCoinMachine();

export const tryInsertCoin: (coin: Coin) => void = (coin: Coin) => {
  arcadeMachine.insertCoin(coin);
};

function App() {
  useEffect(() => {
    arcadeMachine.setMode(ArcadeCoinMachineMode.CoinsRequired);
  }, []);
  const [state, setState] = React.useState({
    balance: 0,
  });
  const setBalance = () => {
    setState({
      balance: arcadeMachine.getBalance(),
    });
  };
  return (
    <div className="App" style={{ margin: 0 }}>
      <div className="App-header" style={{ margin: 0 }}>
        <h2>Arcade Coin Machine</h2>
        <div className="App-coin-balance">
          Balance: ${state.balance.toFixed(2)}
        </div>
        <div className="App-insert-coin">
          <h5>Insert Coin</h5>
          <p style={{ margin: "0rem", fontSize: "small" }}>
            * accepts only US Quarters
          </p>
          <button
            onClick={() => {
              const USQuarter = new Coin(CoinType.USQuarter, CoinStatus.New);
              tryInsertCoin(USQuarter);
              setBalance();
            }}
          >
            US Quarter
          </button>
          <button
            onClick={() => {
              const canadianQuarter = new Coin(
                CoinType.CanadianQuarter,
                CoinStatus.New
              );
              tryInsertCoin(canadianQuarter);
              setBalance();
            }}
          >
            Canadian Quarter
          </button>
          <button
            onClick={() => {
              const damagedQuarter = new Coin(
                CoinType.USQuarter,
                CoinStatus.Damaged
              );
              tryInsertCoin(damagedQuarter);
              setBalance();
            }}
          >
            Damaged Coin
          </button>
        </div>
        <div className="App-coin-return">
          <div className="title">Coin Return</div>
          <div className="state">
            rejected coins: {arcadeMachine.getRejectedCoins().length}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
