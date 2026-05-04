import { testVitest } from "./testVitest";
import {test, expect} from 'vitest';

test('formulaire', () => {
    expect(testVitest(4)).toBe(16)
})