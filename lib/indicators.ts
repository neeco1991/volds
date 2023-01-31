export class Indicators {
  private static _instance: Indicators;

  private constructor() {}

  public static getInstance(): Indicators {
    if (!this._instance) {
      this._instance = new Indicators();
    }

    return this._instance;
  }
}

const indicators = Indicators.getInstance();

export default indicators;
