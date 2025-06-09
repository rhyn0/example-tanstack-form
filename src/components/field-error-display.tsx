type ErrorDisplayProps = {
    isValid: boolean;
    errors: string[];
};
export function ErrorDisplay({ isValid, errors }: ErrorDisplayProps) {
    return (
        !isValid && <em className="text-sm text-red-400">{errors.join(",")}</em>
    );
}
