import { memo } from 'react';
import { MoveableContainer } from './moveable-container';
import { useCampaignStore, shallow } from 'state/use-store';
import {
  getSymbolChildren,
  getSymbolPosition,
  getSymbolStylesByLayout,
  getUIValue,
} from 'state/selectors';

interface SymbolProps {
  id: string;
}

export const Symbol = memo(({ id }: SymbolProps) => {
  const activeLayout = useCampaignStore(getUIValue('activeLayout'));
  const children = useCampaignStore(getSymbolChildren(id), shallow);
  const style = useCampaignStore(
    getSymbolStylesByLayout(id, activeLayout),
    shallow
  );
  const position = useCampaignStore(getSymbolPosition(id), shallow);

  return (
    <MoveableContainer id={id} {...position}>
      <div
        style={{
          ...style,
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

interface SymbolWithoutPositionProps {
  layoutId: string;
  symbolId: string;
}

/** Symbol rendered without position based on layout, its nested children should also positioned correctly */
export const SymbolWithoutPosition = ({
  symbolId,
  layoutId,
}: SymbolWithoutPositionProps) => {
  const children = useCampaignStore(getSymbolChildren(symbolId), shallow);
  const style = useCampaignStore(
    getSymbolStylesByLayout(symbolId, layoutId),
    shallow
  );

  return (
    <div style={style}>
      {children &&
        children.map((childId) => <Symbol key={childId} id={childId} />)}
    </div>
  );
};
