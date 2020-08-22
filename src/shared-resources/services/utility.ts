import { v4 as uuidv4 } from 'uuid';

export function createUUID() {
    return uuidv4();
}

export function addDays(date: any, days: number): Date {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result
}
