import { createSelector } from "reselect";

const selectWs = (state) => state.chat;

export const selectSocketIoId = createSelector(
  [selectWs],
  (ws) => ws.socketIoClientId
);
