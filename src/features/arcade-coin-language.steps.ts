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
  const givenMyMachineRequiresCoins = (given: DefineStepFunction) => {
    given(
      "my machine is configured to require coins",
      () => {
        arcadeCoinMachine.setMode(ArcadeCoinMachineMode.CoinsRequired);
        expect(arcadeCoinMachine.getMode()).toEqual(ArcadeCoinMachineMode.CoinsRequired);
      }
    );
  };
  const givenIHaveNotInsertedAnyCoins = (given: DefineStepFunction) => {
    given("I have not inserted any coins", () => {
        const balance = arcadeCoinMachine.getBalance();
        expect(balance).toEqual(0);
    });
  };

  const whenInsertOneUSQuarter = (when: DefineStepFunction) => {
    when("I insert one US Quarter", () => {
        const USQuarter = new Coin(CoinType.USQuarter, CoinStatus.New);
        arcadeCoinMachine.insertCoin(USQuarter);
    });
  };
  const thenIShouldHaveABalanceOfCents = (then: DefineStepFunction) => {
    then(/^I should have a balance of (.*) cents$/, (arg0) => {
        const balance = arcadeCoinMachine.getBalance();
        expect(balance).toEqual(0.25);
    });
  };

  test("Successfully inserting coins", ({ given, when, then, and }) => {
    givenMyMachineRequiresCoins(given);
    givenIHaveNotInsertedAnyCoins(given);
    whenInsertOneUSQuarter(when);
    thenIShouldHaveABalanceOfCents(then);
  });
});
