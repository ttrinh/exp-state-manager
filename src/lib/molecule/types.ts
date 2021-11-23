import { RecoilState } from "recoil";

// 'any' usage is essential here to correctly extract type of key and value from entity
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MoleculeShape = Record<string, any>;

export interface Molecule<T> {
  atomKeys: Array<keyof T>;
  getAtom: <J extends keyof T>(key: J) => RecoilState<T[J] | undefined>;
  getAtoms: <J extends keyof T>(keys: Array<J>) => RecoilState<Pick<T, J>>;
  molecule: RecoilState<T>;
}

export type GetAtomsValue<T> = ReturnType<Molecule<T>["getAtoms"]>;
