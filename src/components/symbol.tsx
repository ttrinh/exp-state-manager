import { Box } from '@mui/system';
import { useRecoilValue } from 'recoil';
import { symbolState } from 'state/symbol/symbol-state';
import { stylesState } from 'state/styles/styles-state';
import { memo } from 'react';

interface SymbolProps {
  id: string;
}

export const Symbol = memo(({ id }: SymbolProps) => {
  const symbolMolecule = symbolState.getMolecule(id);
  const symbolChildren =
    useRecoilValue(symbolMolecule.getAtom('children')) ?? [];

  const positionStyles = useRecoilValue(
    stylesState
      .getMolecule(`${id}_styles`)
      .getAtoms(['top', 'left', 'width', 'height', 'background', 'border'])
  );

  return (
    <Box
      sx={{
        position: 'relative',
        ...positionStyles,
      }}
    >
      {symbolChildren.map((childId) => (
        <Symbol key={childId} id={childId} />
      ))}
    </Box>
  );
});
