import { renderHook, act } from '@testing-library/react';
import useBooleanState from '../src/hooks/useBooleanState';

describe('useBooleanState Hook', () => {
  it('initially returns false', () => {
    const { result } = renderHook(() => useBooleanState());
    expect(result.current.isActive).toBe(false);
  });

  it('toggles the value when toggle is called', () => {
    const { result } = renderHook(() => useBooleanState());

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isActive).toBe(true);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isActive).toBe(false);
  });

  it('activates when activate is called', () => {
    const { result } = renderHook(() => useBooleanState());

    act(() => {
      result.current.activate();
    });

    expect(result.current.isActive).toBe(true);
  });

  it('deactivates when deactivate is called', () => {
    const { result } = renderHook(() => useBooleanState());

    act(() => {
      result.current.activate();
      result.current.deactivate();
    });

    expect(result.current.isActive).toBe(false);
  });
});
