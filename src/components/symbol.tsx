import { memo } from 'react';
import { MoveableContainer } from './moveable-container';
import { useCampaignStore, shallow } from 'state/use-store';
import {
  getSymbolChildren,
  getSymbolPosition,
  getSymbolStyles,
} from 'state/selectors';

interface SymbolProps {
  id: string;
}

export const Symbol = memo(({ id }: SymbolProps) => {
  const children = useCampaignStore(getSymbolChildren(id), shallow);
  const styles = useCampaignStore(getSymbolStyles(id), shallow);
  const position = useCampaignStore(getSymbolPosition(id), shallow);

  return (
    <MoveableContainer id={id} {...position}>
      <div
        style={{
          ...styles,
          position: 'relative',
          top: '0px',
          left: '0px',
          width: '100%',
          height: '100%',
        }}
      >
        {children &&
          children.map((childId) => <Symbol key={childId} id={childId} />)}
      </div>
    </MoveableContainer>
  );
});
