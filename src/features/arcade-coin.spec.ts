import {
  Coin,
  CoinType,
  CoinStatus,
  ArcadeCoinMachine,
  ArcadeCoinMachineMode,
} from "../ArcadeMachine";

describe("ArcadeCoin", () => {
  it("should increment balance by 25 cents", () => {
    const arcadeMachine = new ArcadeCoinMachine();
    arcadeMachine.setMode(ArcadeCoinMachineMode.CoinsRequired);
    const USQuarter = new Coin(CoinType.USQuarter, CoinStatus.New);
    arcadeMachine.insertCoin(USQuarter);
    expect(arcadeMachine.getBalance()).toEqual(0.25);
  });
});
