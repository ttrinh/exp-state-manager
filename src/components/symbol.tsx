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
  const symbolId = useRecoilValue(symbolMolecule.getAtom('id'));
  const symbolChildren =
    useRecoilValue(symbolMolecule.getAtom('children')) ?? [];

  const positionStyles = useRecoilValue(
    stylesState
      .getMolecule(`${id}_styles`)
      .getAtoms(['top', 'left', 'width', 'height'])
  );

  console.log(symbolId);

  return (
    <Box
      sx={{
        position: 'relative',
        background: 'yellow',
        ...positionStyles,
      }}
    >
      {symbolChildren.toString()}
    </Box>
  );
});
