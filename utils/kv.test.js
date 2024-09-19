import { describe, it, expect, beforeEach } from 'vitest';
import KV from './kv';

describe('KV Class suite', () => {
  let kv;

  beforeEach(() => {
    kv = new KV();
  });

  it('should add and retrieve a key-value pair', () => {
    kv.set('name', 'John');
    expect(kv.get('name').value).toBe('John');
  });

  it('should throw an error when getting a non-existent key', () => {
    expect(() => kv.get('badKey')).toThrow('Key "badKey" does not exist.');
  });

  it('should set a key with a TTL and expire it', async () => {
    kv.set('testKey', 'value', 1);

    expect(kv.get('testKey').value).toBe('value');

    await new Promise((resolve) => setTimeout(resolve, 1100));

    expect(() => kv.get('testKey')).toThrow('Key "testKey" has expired.');
  });

  it('should delete a key', () => {
    kv.set('age', 30);
    kv.delete('age');
    expect(() => kv.get('age')).toThrow('Key "age" does not exist.');
  });

  it('should throw an error when deleting a key that doesnt exist', () => {
    expect(() => kv.delete('unknown')).toThrow('Key "unknown" does not exist');
  });
});
