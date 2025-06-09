import { ErrorDisplay } from "@/components/field-error-display";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
import React from "react";

/**
 *  Now with this forms base options don't include a validator, we have to do per field validation.
 */
function FieldEventForm() {
    const form = useForm({
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const handleSubmit = React.useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            form.handleSubmit();
        },
        [form.handleSubmit],
    );
    const handleReset = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            form.reset();
        },
        [form.reset],
    );

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <h2 className="text-2xl font-semibold">Personal Information</h2>
            <form.Field
                name="password"
                validators={{
                    onChange: ({ value }) => {
                        return value.length < 8
                            ? "Password must be at least eight (8) characters"
                            : undefined;
                    },
                }}
            >
                {(field) => (
                    <div className="flex flex-col space-y-1">
                        <Label htmlFor={field.name}>
                            Password:
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                            />
                        </Label>
                        <ErrorDisplay
                            isValid={field.state.meta.isValid}
                            errors={field.state.meta.errors as string[]}
                        />
                    </div>
                )}
            </form.Field>
            <form.Field
                name="confirmPassword"
                validators={{
                    onChangeListenTo: ["password"],
                    onChange: ({ value, fieldApi }) => {
                        if (value !== fieldApi.form.getFieldValue("password")) {
                            return "Passwords do not match";
                        }
                        return undefined;
                    },
                }}
            >
                {(field) => (
                    <div className="flex flex-col space-y-1">
                        <Label htmlFor={field.name}>
                            Confirm Password:
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                            />
                        </Label>
                        <ErrorDisplay
                            isValid={field.state.meta.isValid}
                            errors={field.state.meta.errors as string[]}
                        />
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
            <Button variant="destructive" type="reset" onClick={handleReset}>
                Reset
            </Button>
        </form>
    );
}

export default FieldEventForm;
