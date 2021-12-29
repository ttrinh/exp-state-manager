import { atom, RecoilState } from 'recoil';

import { Paths } from './types';

type Primitive = string | boolean | number | null | undefined | Array<string>;
type ObjectLiteral = Record<string, unknown>;

const isPrimitive = (val: unknown): val is Primitive =>
  typeof val !== 'object' || val === null;

const isObjectLiteral = (val: unknown): val is ObjectLiteral =>
  typeof val === 'object' && val !== null;

export const createAtomsFromObject = <T extends ObjectLiteral>(
  obj: T,
  prefix: string = ''
): Record<Paths<T>, RecoilState<T[Paths<T>]>> => {
  const initVal = {} as Record<Paths<T>, RecoilState<T[Paths<T>]>>;

  return Object.keys(obj).reduce((carrier, k) => {
    const value = obj[k];
    if (isPrimitive(value)) {
      return {
        ...carrier,
        ...{
          [k]: atom({
            key: prefix ? `${prefix}.${k}` : k,
            default: value,
          }),
        },
      };
    }

    if (isObjectLiteral(value)) {
      return {
        ...carrier,
        ...createAtomsFromObject(value, k),
      };
    }

    return carrier;
  }, initVal);
};

export interface Person {
  name: string;
  age: number;
  actions: {
    eat: string;
    drink: string[];
  };
}

const atoms = createAtomsFromObject(
  {
    name: 'John Doe',
    age: 20,
    test: 'dfasdf',
    wut: 'yeah',
    actions: {
      eat: 'taco',
      drink: ['coke', 'wine'],
      play: [{ id: 'sport', name: 'sport' }],
    },
  },
  'test'
);

const a = atoms['actions.drink.0'];
const b = atoms['actions.eat'];
const c = atoms['actions.play.0.id'];
console.log(a, b, c);
