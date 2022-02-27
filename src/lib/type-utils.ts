export type WithoutId<T extends object> = Omit<T, 'id'>;
export type Without<T extends object, K extends keyof T> = Omit<T, K>;
