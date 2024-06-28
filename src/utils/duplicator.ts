import { ObjectId } from 'mongodb';

export function hasDuplicates(array: ObjectId[]): boolean {
    const seen = new Set<string>();
    for (const id of array) {
        const idStr = id.toString();
        if (seen.has(idStr)) {
            return true;
        }
        seen.add(idStr);
    }
    return false;
}
