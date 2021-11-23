import { DefaultValue, selector } from "recoil";

import { Molecule, MoleculeShape } from "./types";
import { molecule } from "./molecule";

const emptyMolecule = molecule("undefined", {});

/**
 * Create a family manager for a molecule
 */
export const moleculeFamily = <T extends MoleculeShape>(key: string) => {
  let molecules: Record<string, Molecule<T>> = {};

  const addMolecule = (moleculeKey: string, obj: T): void => {
    molecules[moleculeKey] = molecule(moleculeKey, obj);
  };

  const getModuleKeys = (): string[] => Object.keys(molecules);

  const getMolecule = (moleculeKey: string): Molecule<T> =>
    molecules[moleculeKey] || emptyMolecule;

  /**
   * Mainly used for RESET all molecules
   * @returns RecoilState<T>[]
   */
  const entitiesResetSelector = selector({
    key,
    get: () => getModuleKeys().map(getMolecule),
    set: ({ reset }, newValue) => {
      if (newValue instanceof DefaultValue) {
        getModuleKeys()
          .map(getMolecule)
          .forEach((m) => reset(m.molecule));
        molecules = {};
      }
    },
  });

  return {
    addMolecule,
    getModuleKeys,
    getMolecule,
    molecules,
    entitiesResetSelector,
  };
};
