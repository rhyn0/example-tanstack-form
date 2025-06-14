import AddressForm from "@/components/forms/address";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/address")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <main className="flex flex-col justify-center items-center w-full h-full">
            <h1 className="text-3xl">Hello "/address"!</h1>
            <p className="text-sm font-medium text-left max-w-1/2 text-wrap mt-2">
                A form that resets other fields when one is changed.
            </p>
            <div className="w-1/2 mt-10 mx-20">
                <AddressForm />
            </div>
        </main>
    );
}
