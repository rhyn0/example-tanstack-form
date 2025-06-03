"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type React from "react";

type CalendarProps = React.ComponentProps<typeof Calendar>;
export type DatePickerFormProps = {
    value: Date;
    onChange: React.Dispatch<Date | undefined>;
    onBlur: NonNullable<CalendarProps["onDayBlur"]>;
    id: string;
};

export function DatePickerForm(props: DatePickerFormProps) {
    const date = props.value;
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                    )}
                >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    id={props.id}
                    mode="single"
                    selected={date}
                    onSelect={props.onChange}
                    onDayBlur={props.onBlur}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
