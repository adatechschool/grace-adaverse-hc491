import {describe, it, expect,test} from "vitest";
import { Form } from "./zod-schema";

describe("Mon schema Zod", () => {
    const validData = {
        title: "Mon projet",
        gitHubLink: "https://github.com/user/repo",
        demoLink: "https://demo.example.com",
        programmeId: "1",
        promotionId: "2"
    };

    test("Test avec un objet valide", () => {
        const result = Form.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it("Test sans demolink", () => {
        const result = Form.safeParse({...validData, demoLink : ""});

        expect(result.data?.demoLink).toBe(undefined);
        expect(result.success).toBe(true);
    });

    it("Test avec GitHubLink qui n'est pas une URL", () => {
        const result = Form.safeParse({...validData, gitHubLink: "coucou"});
        expect(result.success).toBe(false);
    });

        it("Test avec GitHubLink qui n'est pas une URL Github", () => {
        const result = Form.safeParse({...validData, gitHubLink: "https://google.com"});
        expect(result.success).toBe(false);
    });

    it("Test avec titre vide", () => {
        const result = Form.safeParse({...validData, title:""});

        expect(result.success).toBe(false);
        expect(result.error?.flatten().fieldErrors.title).toEqual(["Trop court !"]);
    });

        it("Test avec titre juste un espace", () => {
        const result = Form.safeParse({...validData, title:" "});

        expect(result.success).toBe(false);
        expect(result.error?.flatten().fieldErrors.title).toEqual(["Trop court !"]);
    })
})