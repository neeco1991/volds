export type Coordinates = [number, number];

interface Base {
  id: number;
  code: string;
  name: string;
  coordinates: Coordinates;
}

export const bases: Base[] = [
  { id: 1, code: 'rome', name: 'Rome', coordinates: [12.51133, 41.89193] },
  {
    id: 2,
    code: 'marseille',
    name: 'Marseille',
    coordinates: [5.36978, 43.296482],
  },
  { id: 3, code: 'madrid', name: 'Madrid', coordinates: [-3.70256, 40.4165] },
];

export class Distances {
  public static distance(x: Coordinates, y: Coordinates) {
    let lon1 = this.toRadian(x[0]);
    let lat1 = this.toRadian(x[1]);
    let lon2 = this.toRadian(y[0]);
    let lat2 = this.toRadian(y[1]);
    let deltaLon = lon2 - lon1;
    let deltaLat = lat2 - lat1;
    let a =
      Math.pow(Math.sin(deltaLat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
    let c = 2 * Math.asin(Math.sqrt(a));
    const EARTH_RADIUS = 6371;
    return Math.round(c * EARTH_RADIUS);
  }

  public static estimatedTime(distance: number) {
    const cruiseSpeed = 300;
    return distance / cruiseSpeed;
  }

  private static toRadian(degree: number) {
    return (degree * Math.PI) / 180;
  }
}
