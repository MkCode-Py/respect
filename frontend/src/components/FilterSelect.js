import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";

/* Consistent, modern select built on shadcn — replaces native <select> */
export function FilterSelect({ value, onChange, options, placeholder, testId, className = "", size = "md" }) {
  const h = size === "sm" ? "h-8" : "h-9";
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        data-testid={testId}
        className={`${h} min-w-0 rounded-[var(--r-sm)] bg-[var(--layer-1)] border-[var(--hairline)] text-[12px] text-[var(--text-2)] hover:border-[var(--stroke)] focus:ring-2 focus:ring-[var(--gold)]/40 focus:border-[var(--gold)] data-[placeholder]:text-[var(--text-3)] ${className}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-[var(--layer-2)] border-[var(--hairline)] text-[var(--text-1)] max-h-[320px]">
        {options.map((o) => (
          <SelectItem
            key={o.value}
            value={o.value}
            className="text-[12px] focus:bg-[var(--layer-3)] focus:text-[var(--text-1)] data-[state=checked]:text-[var(--gold)]"
          >
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
