import { SymbolsCreatePayload } from 'state/symbol/symbols-create';
import { Layout, Stage } from 'state/types';

const generateSymbol = (
  left: number,
  top: number,
  hue: number
): SymbolsCreatePayload[0] => {
  return {
    parentId: 'stage',
    symbol: {
      id: '',
      type: 'box',
      styles: {
        base: {
          id: 'base',
          top: `${top}px`,
          left: `${left}px`,
          width: '40px',
          height: '40px',
          border: '1px solid black',
          background: `hsl(${hue}, 100%, 75%)`,
          borderRadius: '5px',
        },
        layout2: {
          id: 'layout2',
          top: `${top}px`,
          left: `${left}px`,
          width: '40px',
          height: '40px',
          border: '1px solid black',
          background: `hsl(${hue}, 100%, 75%)`,
          borderRadius: '50%',
        },
      },
    },
  };
};

export const mockSymbols = Array.from({ length: 500 }, (_, i) => i).map((i) => {
  const rowLength = 25;
  const pad = 50;
  const hue = i % 360;
  const offsetTop = Math.floor(i / rowLength) * 40 + pad;
  const offsetLeft = (i % rowLength) * 40 + pad;
  return generateSymbol(offsetLeft, offsetTop, hue);
});

export const mockStage: Stage = {
  id: 'stage',
  type: 'stage',
  children: [],
  styles: {
    base: {
      id: 'base',
      top: '0',
      left: '0',
      width: '600px',
      height: '600px',
      border: '1px solid black',
      background: 'white',
    },
    layout2: {
      id: 'layout2',
      top: '0',
      left: '0',
      width: '600px',
      height: '600px',
      border: '1px solid black',
      background: 'red',
    },
  },
};

export const layout1: Layout = {
  id: 'base',
  name: 'base',
  deliverable: 'a',
  w: '300px',
  h: '600px',
};

export const layout2: Layout = {
  id: 'layout2',
  name: 'layout2',
  deliverable: 'a',
  w: '728px',
  h: '90px',
};
