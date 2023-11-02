import { SessionState, SessionUI } from 'state/types';

type SessionPayload = Partial<SessionUI>;

export function sessionUIUpdate(draft: SessionState, payload: SessionPayload) {
  draft.ui = { ...draft.ui, ...payload };

  return draft;
}
