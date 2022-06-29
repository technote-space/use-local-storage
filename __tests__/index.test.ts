/* eslint-disable no-magic-numbers */
import { describe, expect, it, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import useLocalStorage from '../src';

vi.stubGlobal('localStorage', (() => {
  const store = {
    'store-key1': JSON.stringify({ test1: 1, test2: 'test2' }),
    'store-key3': 'a',
  };

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
  };
})());

describe('useLocalStorage', () => {
  it('should restore localStorage value', () => {
    const { result } = renderHook(() => useLocalStorage('store-key1', {}));
    const value      = result.current[0];

    expect(value).toHaveProperty('test1');
    expect(value).toHaveProperty('test2');
    expect(value['test1']).toBe(1);
    expect(value['test1']).toBe(1);
  });

  it('should use initial value', () => {
    const { result } = renderHook(() => useLocalStorage('store-key2', { test1: 'test1', test3: 3 }));
    const value      = result.current[0];

    expect(value).toHaveProperty('test1');
    expect(value).not.toHaveProperty('test2');
    expect(value).toHaveProperty('test3');
    expect(value['test1']).toBe('test1');
    expect(value['test3']).toBe(3);
  });

  it('should catch json parse error', () => {
    const mock  = vi.fn();
    console.log = mock;

    const { result } = renderHook(() => useLocalStorage('store-key3', { test1: 1 }));
    const value      = result.current[0];

    expect(mock).toBeCalledTimes(1);
    expect(value).toHaveProperty('test1');
    expect(value['test1']).toBe(1);
  });

  it('should set to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('store-key4', 1));

    expect(result.current[0]).toBe(1);

    act(() => {
      result.current[1](2);
    });

    waitFor(() => expect(result.current[0]).toBe(2));
  });

  it('should use memory storage', () => {
    const { result } = renderHook(() => useLocalStorage('store-key5', 1, {
      storage: { 'store-key5': 2 },
    }));

    expect(result.current[0]).toBe(2);
  });

  it('should call updated callback', () => {
    const onChanged           = vi.fn();
    const { result } = renderHook(() => useLocalStorage('store-key6', 1, {
      storage: { 'store-key6': 2 },
      onChanged,
    }));

    expect(result.current[0]).toBe(2);

    act(() => {
      result.current[1](3);
    });

    expect(onChanged).toBeCalledWith('store-key6', 3);
    waitFor(() => expect(result.current[0]).toBe(3));
  });
});
