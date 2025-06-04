import { formOptions } from "@tanstack/react-form";

// type imports
import { type EventT, eventZ } from "../base-schema";

export const eventFormOptions = formOptions({
    defaultValues: {
        name: "",
        birthday: new Date(),
        email: "",
        organization: "",
        title: "",
        dietaryRestrictions: [],
        tickets: [{ registrationType: "general", numberOfTickets: 0 }],
        wantsMarketingEmails: false,
    } as EventT, // actually very key to do this otherwise the array values get mapped as never[]
    onSubmit: ({ value }) => {
        const parsed = eventZ.safeParse(value);
        if (parsed.success) {
            alert(JSON.stringify(value));
        } else {
            alert(`Invalid input got past field validation - ${parsed.error}`);
        }
    },
});
