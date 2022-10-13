import { defineFeature, DefineStepFunction, loadFeature } from "jest-cucumber";
import {
  ArcadeCoinMachine,
  ArcadeCoinMachineMode,
  Coin,
  CoinStatus,
  CoinType,
} from "../ArcadeMachine";

const feature = loadFeature("./src/features/arcade-coin.feature");

defineFeature(feature, (test) => {
  let arcadeCoinMachine: ArcadeCoinMachine;
  beforeEach(() => {
    arcadeCoinMachine = new ArcadeCoinMachine();
  });
  test("Successfully inserting coins", ({ given, when, then, and }) => {
    given("my machine is configured to require coins", () => {
        arcadeCoinMachine.setMode(ArcadeCoinMachineMode.CoinsRequired);
        expect(arcadeCoinMachine.getMode()).toEqual(ArcadeCoinMachineMode.CoinsRequired);
    });

    given("I have not inserted any coins", () => {
        expect(arcadeCoinMachine.getBalance()).toEqual(0);
    });

    when("I insert one US Quarter", () => {
        const USQuarter = new Coin(CoinType.USQuarter, CoinStatus.New);
        arcadeCoinMachine.insertCoin(USQuarter);
    });

    then(/^I should have a balance of (.*) cents$/, (arg0) => {
        expect(arcadeCoinMachine.getBalance()).toEqual(0.25);
    });
  });
});


