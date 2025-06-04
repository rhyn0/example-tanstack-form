import { z } from "zod/v4";

/**
 * Fields: Attendee information (name, email, organization, title, dietary restrictions, accessibility needs), 
 * registration type (e.g., general admission, VIP, student – affecting price), 
 * session selection (multiple concurrent sessions, limited capacity),
 * workshop sign-ups, accommodation preferences, payment details, marketing opt-ins, emergency contact.
Validation Rules:

Email format.
Required fields for attendee and emergency contact.
Session capacity checks (real-time updates).
Date/time validation for session overlaps if selecting multiple.
Dietary restrictions from a predefined list.
Payment gateway validation.
Age restrictions for certain events/sessions.
 */

export const validTitles = ["Mr", "Mrs", "Dr"];
export const dietaryRestrictionOptions = [
    "vegetarian",
    "pescatarian",
    "vegan",
    "gluten-free",
];
export const registrationTypeOptions = [
    "general",
    "VIP",
    "student",
    "military",
];

const registrationTicket = z.object({
    registrationType: z.enum(registrationTypeOptions),
    numberOfTickets: z
        .int()
        .min(0, { error: "Negative tickets can't be purchased" }),
});

const dietaryRestrictionZ = z.object({
    value: z.enum(dietaryRestrictionOptions),
});
export type DietaryRestrictionT = z.infer<typeof dietaryRestrictionZ>;

export const eventZ = z.object({
    name: z.string().min(1),
    birthday: z.date().max(new Date()),
    email: z.email(),
    organization: z.string().min(2),
    title: z.enum(validTitles),
    dietaryRestrictions: z.array(dietaryRestrictionZ),
    tickets: z.array(registrationTicket).min(1),
    wantsMarketingEmails: z.boolean(),
});
export type EventT = z.infer<typeof eventZ>;
