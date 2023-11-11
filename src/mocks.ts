import { generateId } from 'lib/generate-id';
import { ElementsCreatePayload } from 'state/element/elements-create';
import { Layout } from 'state/types';

const generateElement = (
  left: number,
  top: number,
  hue: number
): ElementsCreatePayload[0] => {
  return {
    parentId: 'stage',
    element: {
      id: generateId('box'),
      type: 'box',
      styles: {
        layout1: {
          borderRadius: '5px',
          background: `hsl(${hue}, 100%, 75%)`,
        },
        layout2: {
          borderRadius: '50%',
          background: `hsl(${hue - 50}, 100%, 75%)`,
        },
      },
    },
    baseStyle: {
      top: `${top}px`,
      left: `${left}px`,
      width: '40px',
      height: '40px',
      border: '1px solid black',
    },
  };
};

export const mockElements = Array.from({ length: 1000 }, (_, i) => i).map(
  (i) => {
    const rowLength = 30;
    const pad = 10;
    const hue = i % 360;
    const offsetTop = Math.floor(i / rowLength) * 40 + pad;
    const offsetLeft = (i % rowLength) * 40 + pad;
    return generateElement(offsetLeft, offsetTop, hue);
  }
);

export const mockStage: ElementsCreatePayload = [
  {
    parentId: '',
    element: {
      id: 'stage',
      type: 'stage',
      children: [],
      styles: {
        layout1: {
          background: 'lightblue',
        },
        layout2: {
          background: 'antiquewhite',
        },
      },
    },
    baseStyle: {
      top: '0',
      left: '0',
      width: '600px',
      height: '600px',
      border: '1px solid black',
    },
  },
];

export const layout1: Layout = {
  id: 'layout1',
  name: '300x600',
  deliverable: 'a',
  w: '300px',
  h: '600px',
};

export const layout2: Layout = {
  id: 'layout2',
  name: '728x90',
  deliverable: 'a',
  w: '728px',
  h: '90px',
};
