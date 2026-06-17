export const formatDateTime = (
    date?: string | Date,
    options?: Intl.DateTimeFormatOptions
): string => {
    if (!date) return "-";

    const d = new Date(date);
    if (isNaN(d.getTime())) return "-";

    return d.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        // hour: "2-digit",
        // minute: "2-digit",
        // hour12: true,
        ...options,
    });
};
