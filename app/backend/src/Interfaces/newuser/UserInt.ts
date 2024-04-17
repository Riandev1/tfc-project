export interface UserInt<T> {
  validation(email: string): Promise<T | null>;
}
