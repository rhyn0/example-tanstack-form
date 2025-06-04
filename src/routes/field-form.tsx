import { FieldEventForm } from "@/components/forms/field-validate";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/field-form")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <main className="flex flex-col justify-center items-center w-full h-full">
            <h1 className="text-3xl">Hello "/field-form"!</h1>
            <p className="text-sm font-medium text-left max-w-1/2 text-wrap mt-2">
                Validation of the data is done by a validator on each field -
                rather than using Zod at the root of the form. <br />
                One thing you will notice about this is that it is possible to
                submit invalid values if you just don't touch them. Try filling
                out all the fields besides birthday. You can submit and it will
                cause an error on the backend.
            </p>
            <div className="w-1/2 mt-10 mx-20">
                <FieldEventForm />
            </div>
        </main>
    );
}
