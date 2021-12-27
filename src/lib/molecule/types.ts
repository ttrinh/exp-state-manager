import { RecoilState } from 'recoil';

// 'any' usage is essential here to correctly extract type of key and value from entity
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MoleculeShape = Record<string, any>;

export interface Molecule<T> {
  atomKeys: Array<keyof T>;
  getAtom: <J extends keyof T>(key: J) => RecoilState<T[J] | undefined>;
  getAtoms: <J extends keyof T>(keys: Array<J>) => RecoilState<Pick<T, J>>;
  molecule: RecoilState<T>;
}

export type GetAtomsValue<T> = ReturnType<Molecule<T>['getAtoms']>;

/**
 * NEST PATH TO OBJECT
 */
type Prev = [
  never,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  ...0[]
];

export type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;

export type Paths<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${K}` | Join<K, Paths<T[K], Prev[D]>>
        : never;
    }[keyof T]
  : '';

export type Leaves<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T]
  : '';
