export enum CoinType {
  USQuarter = "US Quarter",
  CanadianQuarter = "Canadian Quarter",
}

export enum CoinStatus {
  New = "New",
  Mint = "Mint",
  Used = "Used",
  Acceptable = "Acceptable",
  Damaged = "Damaged",
}

export enum ArcadeCoinMachineMode {
  Free,
  CoinsRequired,
}

export class ArcadeCoinMachine {
  private balance: number = 0;
  private rejectedCoins: Coin[] = [];
  private mode: ArcadeCoinMachineMode = ArcadeCoinMachineMode.Free;
  private readonly quarterValue: number = 0.25;
  setMode(mode: ArcadeCoinMachineMode) {
    this.mode = mode;
  }
  getMode(): ArcadeCoinMachineMode {
    return this.mode;
  }
  validateCoin(coin: Coin): boolean {
    if (
      coin.type === CoinType.USQuarter &&
      coin.status !== CoinStatus.Damaged
    ) {
      console.log("coin accepted");
      return true;
    } else {
      console.log("coin rejected");
      return false;
    }
  }
  insertCoin(coin: Coin) {
    if (this.validateCoin(coin)) {
      this.incrementBalance(this.quarterValue);
    } else {
      this.returnCoin(coin);
    }
  }
  incrementBalance(amount: number) {
    this.balance += amount;
  }
  getBalance(): number {
    return this.balance;
  }
  returnCoin(coin: Coin): Coin[] {
    this.rejectedCoins.push(coin);
    return this.rejectedCoins;
  }
  getRejectedCoins(): Coin[] {
    return this.rejectedCoins;
  }
}

export class Coin {
  public type: CoinType;
  public status: CoinStatus;

  constructor(type: CoinType, status: CoinStatus) {
    this.type = type;
    this.status = status;
  }
}
