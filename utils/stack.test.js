import { describe, it, expect, beforeEach } from 'vitest';
import Stack from './stack';

describe('Stack Class suite', () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  it('should push items onto the stack', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.items).toEqual([1, 2, 3]);
  });

  it('should pop the last item from the stack', () => {
    stack.push(1);
    stack.push(2);
    expect(stack.pop()).toBe(2);
    expect(stack.items).toEqual([1]);
  });

  it('should throw an error when popping from an empty stack', () => {
    expect(() => stack.pop()).toThrow('stack is empty');
  });

  it('should check if the stack is empty', () => {
    expect(stack.isEmpty()).toBe(true);
    stack.push(1);
    expect(stack.isEmpty()).toBe(false);
    stack.pop();
    expect(stack.isEmpty()).toBe(true);
  });
});
