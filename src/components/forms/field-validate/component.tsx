import {
    dietaryRestrictionOptions,
    registrationTypeOptions,
    validTitles,
} from "@/components/forms/base-schema";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerForm } from "@/components/ui/date-picker";
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
import { eventFormOptions } from "./schema";

type ErrorDisplayProps = {
    isValid: boolean;
    errors: string[];
};
function ErrorDisplay({ isValid, errors }: ErrorDisplayProps) {
    return (
        !isValid && <em className="text-sm text-red-400">{errors.join(",")}</em>
    );
}

/**
 *  Now with this forms base options don't include a validator, we have to do per field validation.
 */
function FieldEventForm() {
    const form = useForm({
        ...eventFormOptions,
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
                name="name"
                validators={{
                    onChange: ({ value }) => {
                        return value.length < 1
                            ? "Name must have at least one (1) character"
                            : undefined;
                    },
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
                        <ErrorDisplay
                            isValid={field.state.meta.isValid}
                            errors={field.state.meta.errors}
                        />
                    </div>
                )}
            </form.Field>
            <form.Field
                name="title"
                validators={{
                    onChange: ({ value }) => {
                        return validTitles.includes(value)
                            ? undefined
                            : "Please choose a valid title.";
                    },
                }}
            >
                {(field) => (
                    <div className="flex flex-col space-y-1">
                        <Select
                            onValueChange={field.handleChange}
                            value={field.state.value}
                        >
                            <Label htmlFor={field.name}>Title:</Label>
                            <SelectTrigger id={field.name} name={field.name}>
                                <SelectValue placeholder="Title" />
                            </SelectTrigger>
                            <SelectContent>
                                {validTitles.map((op) => (
                                    <SelectItem
                                        key={op}
                                        value={op}
                                        className="capitalize"
                                    >
                                        {op}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                            <ErrorDisplay
                                isValid={field.state.meta.isValid}
                                errors={field.state.meta.errors}
                            />
                        </Select>
                    </div>
                )}
            </form.Field>
            <form.Field
                name="birthday"
                validators={{
                    onChange: ({ value }) => {
                        return value < new Date()
                            ? undefined
                            : "Birthday can't be in the future.";
                    },
                }}
            >
                {(field) => (
                    <div className="flex flex-col space-y-1">
                        <Label htmlFor={field.name}>Birth Date:</Label>
                        <DatePickerForm
                            id={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) =>
                                field.handleChange(e ?? new Date())
                            }
                        />
                        <ErrorDisplay
                            isValid={field.state.meta.isValid}
                            errors={field.state.meta.errors}
                        />
                    </div>
                )}
            </form.Field>
            <form.Field
                name="email"
                validators={{
                    onChange: ({ value }) => {
                        return value.includes("@")
                            ? undefined
                            : "email must have the @ symbol";
                    },
                }}
            >
                {(field) => (
                    <div className="flex flex-col space-y-1">
                        <Label htmlFor={field.name}>Email:</Label>
                        <em className="text-xs">
                            While not the best validation, its just an example.
                        </em>
                        <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <ErrorDisplay
                            isValid={field.state.meta.isValid}
                            errors={field.state.meta.errors}
                        />
                    </div>
                )}
            </form.Field>
            <form.Field
                name="organization"
                validators={{
                    onChange: ({ value }) => {
                        return value.length > 2
                            ? undefined
                            : "Organization must be 2 characters long";
                    },
                }}
            >
                {(field) => (
                    <div className="flex flex-col space-y-1">
                        <Label htmlFor={field.name}>Organization:</Label>
                        <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <ErrorDisplay
                            isValid={field.state.meta.isValid}
                            errors={field.state.meta.errors}
                        />
                    </div>
                )}
            </form.Field>
            <form.Field name="dietaryRestrictions" mode="array">
                {(field) => {
                    return (
                        <div>
                            <h3>Any Dietary Restrictions?</h3>
                            {field.state.value.map((_, i) => {
                                return (
                                    <div
                                        // biome-ignore lint/suspicious/noArrayIndexKey: only way
                                        key={i}
                                        className="flex flex-row space-x-2"
                                    >
                                        <form.Field
                                            name={`dietaryRestrictions[${i}].value`}
                                            validators={{
                                                onChange: ({ value }) => {
                                                    dietaryRestrictionOptions.includes(
                                                        value,
                                                    )
                                                        ? undefined
                                                        : "Unrecognized dietary restriction";
                                                },
                                            }}
                                        >
                                            {(subField) => (
                                                <div>
                                                    <Label>
                                                        <span>
                                                            Dietary Restriction{" "}
                                                            {i + 1}
                                                        </span>
                                                        <Select
                                                            onValueChange={
                                                                subField.handleChange
                                                            }
                                                            value={
                                                                subField.state
                                                                    .value
                                                            }
                                                        >
                                                            <SelectTrigger
                                                                id={
                                                                    subField.name
                                                                }
                                                                name={
                                                                    subField.name
                                                                }
                                                            >
                                                                <SelectValue placeholder="Restriction" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {dietaryRestrictionOptions.map(
                                                                    (op) => (
                                                                        <SelectItem
                                                                            key={
                                                                                op
                                                                            }
                                                                            value={
                                                                                op
                                                                            }
                                                                            className="capitalize"
                                                                        >
                                                                            {op}
                                                                        </SelectItem>
                                                                    ),
                                                                )}
                                                            </SelectContent>
                                                        </Select>
                                                    </Label>
                                                </div>
                                            )}
                                        </form.Field>
                                        <Button
                                            variant="destructive"
                                            onClick={() => field.removeValue(i)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                );
                            })}
                            <ErrorDisplay
                                isValid={field.state.meta.isValid}
                                errors={field.state.meta.errors}
                            />
                            <Button
                                onClick={() => field.pushValue({ value: "" })}
                                type="button"
                            >
                                Add Dietary Restrictions
                            </Button>
                        </div>
                    );
                }}
            </form.Field>
            <h2 className="text-2xl font-semibold">Tickets</h2>
            <form.Field
                name="tickets"
                mode="array"
                validators={{
                    onChange: ({ value }) => {
                        const totalTickets = value.reduce(
                            (acc, ticketChoice) =>
                                acc + ticketChoice.numberOfTickets,
                            0,
                        );
                        const uniqueTicketTypes = new Set(
                            value.map(
                                (ticketChoice) => ticketChoice.registrationType,
                            ),
                        );
                        const positiveNumberTickets = totalTickets > 0;
                        const noRepeatingTicketTypes =
                            uniqueTicketTypes.size === value.length;

                        return !positiveNumberTickets
                            ? "Must buy at least one ticket"
                            : !noRepeatingTicketTypes
                              ? "Please group ticket types together"
                              : undefined;
                    },
                }}
            >
                {(field) => {
                    return (
                        <div>
                            <h3>Add Tickets</h3>
                            {field.state.value.map((_, i) => {
                                return (
                                    <div
                                        // biome-ignore lint/suspicious/noArrayIndexKey: only way
                                        key={i}
                                        className="flex flex-row space-x-2"
                                    >
                                        <form.Field
                                            name={`tickets[${i}].registrationType`}
                                            validators={{
                                                onMount: ({ value }) => {
                                                    return registrationTypeOptions.includes(
                                                        value,
                                                    )
                                                        ? undefined
                                                        : "Please select a type of ticket";
                                                },
                                                onBlur: ({ value }) => {
                                                    return registrationTypeOptions.includes(
                                                        value,
                                                    )
                                                        ? undefined
                                                        : "Please select a type of ticket";
                                                },
                                                onChange: ({ value }) => {
                                                    return registrationTypeOptions.includes(
                                                        value,
                                                    )
                                                        ? undefined
                                                        : "Please select a type of ticket";
                                                },
                                            }}
                                        >
                                            {(subField) => (
                                                <div>
                                                    <Select
                                                        onValueChange={
                                                            subField.handleChange
                                                        }
                                                        value={
                                                            subField.state.value
                                                        }
                                                    >
                                                        <SelectTrigger
                                                            id={subField.name}
                                                            name={subField.name}
                                                        >
                                                            <SelectValue placeholder="Ticket choice" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {registrationTypeOptions.map(
                                                                (op) => (
                                                                    <SelectItem
                                                                        key={op}
                                                                        value={
                                                                            op
                                                                        }
                                                                        className="capitalize"
                                                                    >
                                                                        {op}
                                                                    </SelectItem>
                                                                ),
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            )}
                                        </form.Field>
                                        <form.Field
                                            // biome-ignore lint/suspicious/noArrayIndexKey: only way
                                            key={i}
                                            name={`tickets[${i}].numberOfTickets`}
                                        >
                                            {(subField) => (
                                                <div>
                                                    <Label>
                                                        <span>
                                                            Ticket Type {i + 1}
                                                        </span>
                                                        <Input
                                                            value={
                                                                subField.state
                                                                    .value
                                                            }
                                                            onChange={(e) =>
                                                                subField.handleChange(
                                                                    Number(
                                                                        e.target
                                                                            .value,
                                                                    ),
                                                                )
                                                            }
                                                            onBlur={
                                                                subField.handleBlur
                                                            }
                                                            type="number"
                                                        />
                                                    </Label>
                                                </div>
                                            )}
                                        </form.Field>
                                        <Button
                                            variant="destructive"
                                            onClick={() => field.removeValue(i)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                );
                            })}
                            <ErrorDisplay
                                isValid={field.state.meta.isValid}
                                errors={field.state.meta.errors}
                            />
                            <Button
                                onClick={() =>
                                    field.pushValue({
                                        registrationType: "",
                                        numberOfTickets: 0,
                                    })
                                }
                                type="button"
                            >
                                Add Ticket
                            </Button>
                        </div>
                    );
                }}
            </form.Field>
            <form.Field name="wantsMarketingEmails">
                {(field) => {
                    return (
                        <div>
                            <Label htmlFor={field.name}>
                                <span>
                                    Want to get marketing emails and offers?
                                </span>
                                <Checkbox
                                    id={field.name}
                                    name={field.name}
                                    checked={field.state.value}
                                    // @ts-expect-error - indeterminate case should be error
                                    onCheckedChange={field.handleChange}
                                    onBlur={field.handleBlur}
                                />
                            </Label>
                        </div>
                    );
                }}
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
