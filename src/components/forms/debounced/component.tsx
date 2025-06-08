import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import sleep from "@/lib/sleep";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import React from "react";

function DebouncedForm() {
    const validationMutation = useMutation({
        mutationFn: async (vars: string) => {
            console.log("validating...", vars);
            await sleep(2_000); // wait 2 seconds
            return vars.toLowerCase().includes("ryan");
        },
    });
    const handleChange = React.useCallback(
        async (vars: { value: string }) => {
            const x = await validationMutation.mutateAsync(vars.value);
            return x ? undefined : "Error - Author name not found";
        },
        [validationMutation.mutateAsync],
    );
    const form = useForm({
        defaultValues: {
            name: "",
            fieldName: "",
        },
        asyncDebounceMs: 1000, // this has no affect on debounce as no async validators here.
        onSubmit: ({ value }) => {
            alert(JSON.stringify(value));
        },
    });

    const handleSubmit = React.useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            void form.handleSubmit();
        },
        [form.handleSubmit],
    );

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <h2 className="text-2xl font-semibold">Personal Information</h2>
            <h3 className="italic text-xl font-light">
                Is validating: {validationMutation.isPending ? "True" : "False"}
            </h3>
            <form.Field
                name="name"
                asyncDebounceMs={1000}
                validators={{
                    onChangeAsync: handleChange,
                }}
            >
                {(field) => (
                    <div className="flex flex-col space-y-1">
                        <Label htmlFor={field.name}>Name:</Label>
                        <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {!field.state.meta.isValid && (
                            <em className="text-sm text-red-400">
                                {field.state.meta.errors.join(",")}
                            </em>
                        )}
                    </div>
                )}
            </form.Field>
            <form.Field
                name="fieldName"
                validators={{
                    onChangeAsyncDebounceMs: 5000,
                    onChangeAsync: handleChange,
                }}
            >
                {(field) => (
                    <div className="flex flex-col space-y-1">
                        <Label htmlFor={field.name}>Field Name:</Label>
                        <p>Has longer debounce.</p>
                        <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {!field.state.meta.isValid && (
                            <em className="text-sm text-red-400">
                                {field.state.meta.errors.join(",")}
                            </em>
                        )}
                    </div>
                )}
            </form.Field>
            <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
                {([canSubmit, isSubmitting]) => (
                    <Button
                        type="submit"
                        disabled={!canSubmit}
                        className="mt-4"
                    >
                        {isSubmitting ? "..." : "Submit"}
                    </Button>
                )}
            </form.Subscribe>
        </form>
    );
}

export default DebouncedForm;
