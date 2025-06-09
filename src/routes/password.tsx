import { PasswordForm } from "@/components/forms/password";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/password")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <main className="flex flex-col justify-center items-center w-full h-full">
            <h1 className="text-3xl">Hello "/password"!</h1>
            <p className="text-sm font-medium text-left max-w-1/2 text-wrap mt-2">
                The confirm password field gets its validation updated every
                time the normal password field gets updated.
            </p>
            <div className="w-1/2 mt-10 mx-20">
                <PasswordForm />
            </div>
        </main>
    );
}
