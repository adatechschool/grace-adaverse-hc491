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
    });

    it("Test si demoLink pas url", () => {
        const result = Form.safeParse({...validData, demoLink:"coucou"});

        expect(result.success).toBe(false);
        expect(result.error?.flatten().fieldErrors.demoLink).toEqual(["Ce n'est pas une URL"])
    });

    it("Test si programmeId pas un nombre", () => {
        const result = Form.safeParse({...validData, programmeId : "coucou"});

        expect(result.success).toBe(false);
        expect(result.error?.flatten().fieldErrors.programmeId).toEqual(["Le projet n'est pas correct"])
    });

    it("Test si promotionId pas un nombre", () => {
        const result = Form.safeParse({...validData, promotionId : "+2a3"});

        expect(result.success).toBe(false);
        expect(result.error?.flatten().fieldErrors.promotionId).toEqual(["La promotion n'est pas correcte"])
    });

    it("Test du coerce promo/programme", () => {
        const result = Form.safeParse({...validData, promotionId : "42", programmeId: "4"});

        expect(result.success).toBe(false);
        expect(typeof result.data?.programmeId).toBe("number");
        expect(typeof result.data?.promotionId).toBe("number");
    })

})