import { ObjectId } from 'mongodb'; // Adjust the import path as needed
import { hasDuplicates } from '../duplicator';

describe('hasDuplicates function', () => {
  it('should return false for an empty array', () => {
    expect(hasDuplicates([])).toBe(false);
  });

  it('should return false for an array with no duplicates', () => {
    const array = [new ObjectId(), new ObjectId(), new ObjectId()];
    expect(hasDuplicates(array)).toBe(false);
  });

  it('should return true for an array with duplicates', () => {
    const id = new ObjectId();
    const array = [id, new ObjectId(), id];
    expect(hasDuplicates(array)).toBe(true);
  });

  it('should return false for an array with unique ObjectIds as strings', () => {
    const array = [new ObjectId().toString(), new ObjectId().toString(), new ObjectId().toString()];
    expect(hasDuplicates(array as any)).toBe(false);
  });

  it('should return true for an array with duplicate ObjectIds as strings', () => {
    const id = new ObjectId().toString();
    const array = [id, new ObjectId().toString(), id];
    expect(hasDuplicates(array as any)).toBe(true);
  });

  it('should handle mixed types gracefully', () => {
    const id1 = new ObjectId();
    const id2 = new ObjectId();
    const array = [id1, id1.toString(), id2, id2.toString()];
    expect(hasDuplicates(array as any)).toBe(true);
  });
});
