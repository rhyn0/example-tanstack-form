import { EventForm } from "@/components/forms/event";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/event-form")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <main className="flex flex-col justify-center items-center w-full h-full">
            <h1 className="text-3xl">Hello "/example-form"!</h1>
            <p className="text-sm font-medium text-left max-w-1/2 text-wrap mt-2">
                Example form with various fields, some arrays and various data
                types with their own validations. The error messages read a lot
                like a developer because we are just writing out Zod errors.
                Validation will happen on each field change and will show errors
                for even untouched fields.
            </p>
            <div className="w-1/2 mt-10 mx-20">
                <EventForm />
            </div>
        </main>
    );
}
