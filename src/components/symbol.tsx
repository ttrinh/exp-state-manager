import { Box } from '@mui/system';
import { memo } from 'react';
import shallow from 'zustand/shallow';

import { useStore } from 'state-zustand';

interface SymbolProps {
  id: string;
}

export const Symbol = memo(({ id }: SymbolProps) => {
  const sym = useStore(
    (state) => ({
      top: state.styles[id]?.top,
      left: state.styles[id]?.left,
      width: state.styles[id]?.width,
      height: state.styles[id]?.height,
      background: state.styles[id]?.background,
      border: state.styles[id]?.border,
      children: state.symbols[id]?.children ?? [],
    }),
    shallow
  );

  const { children, ...symbolStyles } = sym;

  return (
    <Box
      sx={{
        position: 'relative',
        ...symbolStyles,
      }}
    >
      {children.map((childId) => (
        <Symbol key={childId} id={childId} />
      ))}
    </Box>
  );
});
