import { createContext, useContext } from "react";

export interface CursorState {
  clientX: number;
  clientY: number;
  active: boolean;
}

export const GlassCursorContext = createContext<CursorState>({
  clientX: -9999,
  clientY: -9999,
  active: false,
});

export function useGlassCursor() {
  return useContext(GlassCursorContext);
}
