export interface newTeamsInt<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
}
