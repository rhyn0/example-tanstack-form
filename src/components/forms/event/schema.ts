import { formOptions } from "@tanstack/react-form";
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
    validators: {
        onChange: eventZ,
    },
    onSubmit: ({ value }) => {
        alert(JSON.stringify(value));
    },
});
