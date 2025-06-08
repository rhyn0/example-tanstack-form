import DebouncedForm from "@/components/forms/debounced/component";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debounced-field")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <main className="flex flex-col justify-center items-center w-full h-full">
            <h1 className="text-3xl">Hello "/debounced-field"!</h1>
            <p className="text-sm font-medium text-left max-w-1/2 text-wrap mt-2">
                "Validation" is done for this form using asynchronous methods -
                which could be a network call or otherwise. To stop ourselves
                from spamming network calls on each keystroke, debounce has been
                utilized on the form.
            </p>
            <div className="w-1/2 mt-10 mx-20">
                <DebouncedForm />
            </div>
        </main>
    );
}
