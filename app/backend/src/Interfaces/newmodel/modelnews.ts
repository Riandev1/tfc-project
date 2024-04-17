export interface modelnews<T> {
  findAllHome(): Promise<T[]>
  findAllAway(): Promise<T[]>
  findAll(): Promise<T[]>
}
