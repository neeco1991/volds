type Key = 'people' | 'infrastructures' | 'protected' | 'size' | 'upland';

class Indicators {
  private static _instance: Indicators;
  private readonly _colors: string[] = ['', '#ffeb3b', '#f44336'];
  private readonly _tooltips: Record<Key, string[]> = {
    people: [
      'Not affected',
      'May be affected in the next 24 hours',
      'Affected',
    ],
    infrastructures: [
      'Not affected',
      'May be affected in the next 24 hours',
      'Affected',
    ],
    protected: [
      'Not affected',
      'May be affected in the next 24 hours',
      'Affected',
    ],
    size: ['Less than 100 ha', 'Between 100 and 500 ha', 'More than 500 ha'],
    upland: ['Flat', 'Hilly', 'Mountainous'],
  };

  private constructor() {}

  public static getInstance(): Indicators {
    if (!this._instance) {
      this._instance = new Indicators();
    }

    return this._instance;
  }

  get color() {
    return this._colors;
  }

  get tooltips() {
    return this._tooltips;
  }

  info(id: Key, rank: number) {
    return {
      color: this._colors[rank],
      text: this._tooltips[id][rank],
    };
  }
}

const indicators = Indicators.getInstance();

export default indicators;
