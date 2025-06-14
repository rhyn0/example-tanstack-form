import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm } from "@tanstack/react-form";
import React from "react";
import { ErrorDisplay } from "../field-error-display";

const validCountries = ["USA", "Canada", "Mexico"];

/**
 *  Now with this forms base options don't include a validator, we have to do per field validation.
 */
function AddressForm() {
    const form = useForm({
        defaultValues: {
            country: "",
            province: "",
        },
        validators: {
            onChange: ({ value }) => {
                const errors = [];
                if (!validCountries.includes(value.country)) {
                    errors.push(["country", "Please choose a valid country."]);
                }
                if (value.province.length < 2) {
                    errors.push([
                        "province",
                        "Province name must be longer than 2 letters.",
                    ]);
                }
                if (errors.length === 0) {
                    return null;
                }
                return {
                    form: "Invalid Data",
                    fields: Object.fromEntries(errors),
                };
            },
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
    const handleCountryChange = React.useCallback(
        ({ value }: { value: string }) => {
            console.log(`Country changed to ${value}`);
            form.setFieldValue("province", "");
        },
        [form.setFieldValue],
    );

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <h2 className="text-2xl font-semibold">Address</h2>
            <form.Field
                name="country"
                listeners={{
                    onChange: handleCountryChange,
                }}
            >
                {(field) => (
                    <div className="flex flex-col space-y-1">
                        <Label htmlFor={field.name}>
                            Country:
                            <Select
                                value={field.state.value}
                                onValueChange={field.handleChange}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Country" />
                                </SelectTrigger>
                                <SelectContent>
                                    {validCountries.map((c) => (
                                        <SelectItem key={c} value={c}>
                                            {c}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Label>
                        <ErrorDisplay
                            isValid={field.state.meta.isValid}
                            errors={field.state.meta.errors as string[]}
                        />
                    </div>
                )}
            </form.Field>
            <form.Field name="province">
                {(field) => (
                    <div className="flex flex-col space-y-1">
                        <Label htmlFor={field.name}>
                            Province:
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
            <form.Subscribe selector={(state) => [state.isValid, state.errors]}>
                {([isValid, errors]) => (
                    <ErrorDisplay
                        isValid={isValid as boolean}
                        errors={errors as unknown as string[]}
                    />
                )}
            </form.Subscribe>
            <Button variant="destructive" type="reset" onClick={handleReset}>
                Reset
            </Button>
        </form>
    );
}

export default AddressForm;
