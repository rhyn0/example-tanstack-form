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
import {
    dietaryRestrictionOptions,
    eventFormOptions,
    registrationTypeOptions,
    validTitles,
} from "./schema";

function EventForm() {
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

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <h2 className="text-2xl font-semibold">Personal Information</h2>
            <form.Field name="name">
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
                                {field.state.meta.errors
                                    .map((e) => e.message)
                                    .join(",")}
                            </em>
                        )}
                    </div>
                )}
            </form.Field>
            <form.Field name="title">
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
                            {!field.state.meta.isValid && (
                                <em className="text-sm text-red-400">
                                    {field.state.meta.errors
                                        .map((e) => e.message)
                                        .join(",")}
                                </em>
                            )}
                        </Select>
                    </div>
                )}
            </form.Field>
            <form.Field name="birthday">
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
                        {!field.state.meta.isValid && (
                            <em className="text-sm text-red-400">
                                {field.state.meta.errors
                                    .map((e) => e.message)
                                    .join(",")}
                            </em>
                        )}
                    </div>
                )}
            </form.Field>
            <form.Field name="email">
                {(field) => (
                    <div className="flex flex-col space-y-1">
                        <Label htmlFor={field.name}>Email:</Label>
                        <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {!field.state.meta.isValid && (
                            <em className="text-sm text-red-400">
                                {field.state.meta.errors
                                    .map((e) => e.message)
                                    .join(",")}
                            </em>
                        )}
                    </div>
                )}
            </form.Field>
            <form.Field name="organization">
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
                        {!field.state.meta.isValid && (
                            <em className="text-sm text-red-400">
                                {field.state.meta.errors
                                    .map((e) => e.message)
                                    .join(",")}
                            </em>
                        )}
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
                            {!field.state.meta.isValid && (
                                <em className="text-sm text-red-400">
                                    {field.state.meta.errors
                                        .map((e) => e.message)
                                        .join(",")}
                                </em>
                            )}
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
            <form.Field name="tickets" mode="array">
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
                            {!field.state.meta.isValid && (
                                <em className="text-sm text-red-400">
                                    {field.state.meta.errors
                                        .map((e) => e.message)
                                        .join(",")}
                                </em>
                            )}
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
        </form>
    );
}

export default EventForm;
