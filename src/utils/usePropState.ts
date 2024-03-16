import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function usePropState<T>(initial: T): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(initial);
  useEffect(() => setState(initial), [initial]);
  return [state, setState];
}
