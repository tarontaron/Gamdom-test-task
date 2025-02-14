import { useCallback, useState } from 'react';

const useBooleanState = () => {
  const [value, setValue] = useState<boolean>(false);

  const toggle = useCallback(() => setValue(prevState => !prevState), []);
  const activate = useCallback(() => setValue(true), []);
  const deactivate = useCallback(() => setValue(false), []);

  return { isActive: value, toggle, activate, deactivate };
};

export default useBooleanState;
