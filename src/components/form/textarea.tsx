import type { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea as UiTextarea } from "@/components/ui/textarea";

interface IFormTextarea<T extends FieldValues> {
  className?: string;
  // control: Control<z.infer<typeof AddDriverFormSchema>>;
  control: Control<T>;
  description?: string;
  label?: string;
  // name: keyof z.infer<typeof AddDriverFormSchema>;
  name: Path<T>;
  placeholder?: string;
  type?: string;
}

export function Textarea<T extends FieldValues>({
  className,
  control,
  description,
  label,
  name,
  placeholder,
  type,
}: IFormTextarea<T>) {
  return (
    <FormField
      control={control}
      name={name}
      rules={undefined}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <UiTextarea placeholder={placeholder ?? ""} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
