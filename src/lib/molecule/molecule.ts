import {
  atom,
  DefaultValue,
  RecoilState,
  selector,
  selectorFamily,
  waitForAll,
} from 'recoil';

import { compareAndSet } from './utils';
import { GetAtomsValue, Molecule, MoleculeShape, Paths } from './types';

const emptyAtom = atom<undefined>({
  key: 'emptyAtom',
  default: undefined,
});

/**
 * Create a molecule from an object literal - consists of atoms for each object key.
 *
 * @param moleculeKey - an unique molecule key
 * @param defaultShape - default value of the object literal.
 */
export const molecule = <T extends MoleculeShape>(
  moleculeKey: string,
  defaultShape: T
): Molecule<T> => {
  const atomKeys = Object.keys(defaultShape);

  // Internally create and store atoms
  const atoms = atomKeys.reduce(
    (carrier, k) => ({
      ...carrier,
      [k]: atom({
        key: `${moleculeKey}.${k}`,
        default: defaultShape[k],
      }),
    }),
    {} as Record<keyof T, RecoilState<T[keyof T]>>
  );

  /**
   * Get an atom by key
   * @param key a key in entity
   */
  const getAtom: Molecule<T>['getAtom'] = (key) => {
    // Force assign type as it can be undefined when atom yet to be created.
    return (atoms[key] ?? emptyAtom) as RecoilState<T[keyof T] | undefined>;
  };

  /**
   * Get atoms by keys
   * @param keys keys in entity
   */
  const getAtoms: Molecule<T>['getAtoms'] = selectorFamily({
    key: `${moleculeKey}-atoms`,
    get:
      (keys) =>
      ({ get }) => {
        const values = get(waitForAll(keys.map((k) => getAtom(k))));

        return keys.reduce(
          (carrier, k, idx) => ({
            ...carrier,
            [k]: values[idx],
          }),
          {} as GetAtomsValue<T>
        );
      },
    set:
      (keys) =>
      ({ get, set, reset }, newValue) => {
        if (newValue instanceof DefaultValue) {
          keys.forEach((k) => reset(getAtom(k)));
          return;
        }

        const _set = compareAndSet(get, set);
        keys.forEach((k) => _set(getAtom(k), newValue[k]));
      },
  });

  /**
   * Get the whole molecule entity
   * Use GET cautiously, this connects to all atoms
   * Optimized to be used as SET
   * @returns RecoilState<T>
   */
  const entity = selector<T>({
    key: moleculeKey,
    get: ({ get }) => {
      const values = get(waitForAll(atomKeys.map((k) => atoms[k])));

      return atomKeys.reduce(
        (carrier, k, idx) => ({
          ...carrier,
          [k]: values[idx],
        }),
        {} as T
      );
    },
    set: ({ get, set, reset }, newValue) => {
      if (newValue instanceof DefaultValue) {
        atomKeys.forEach((k) => reset(getAtom(k)));
        return;
      }

      const _set = compareAndSet(get, set);
      atomKeys.forEach((k) => _set(getAtom(k), newValue[k]));
    },
  });

  return {
    atomKeys,
    getAtom,
    getAtoms,
    molecule: entity,
  };
};

type Primitive = string | boolean | number | null | undefined;

const isPrimitive = (val: unknown): val is Primitive => val !== Object(val);

export const createAtomsFromObject = <T extends Record<string, unknown>>(
  obj: T,
  prefix: string = ''
): Record<Paths<T>, RecoilState<T[Paths<T>]>> => {
  const atomKeys = Object.keys(obj);

  const atoms = atomKeys.reduce((carrier, k) => {
    const subAtoms = isPrimitive(obj[k])
      ? {
          [k]: atom({
            key: prefix ? `${prefix}.${k}` : k,
            default: obj[k],
          }),
        }
      : createAtomsFromObject(obj[k] as Record<string, unknown>, k);

    return {
      ...carrier,
      ...subAtoms,
    };
  }, {} as Record<Paths<T>, RecoilState<T[Paths<T>]>>);

  return atoms;
};

interface Person {
  name: string;
  age: number;
  actions: {
    eat: string;
    drink: string[];
  };
}

const atoms = createAtomsFromObject<Person>(
  {
    name: 'John Doe',
    age: 20,
    test: 'dfasdf',
    actions: {
      eat: 'taco',
      drink: ['coke', 'wine'],
    },
  },
  'test'
);

// atoms['actions.eat'];
const a = atoms['actions.drink.0'];
console.log(a);
