import { testVitest } from "./test";
import {test,expect }from "vitest"

test('form', ()=> {expect(testVitest(2)).toBe(4)})