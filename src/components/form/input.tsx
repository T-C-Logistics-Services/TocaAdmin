import type { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input as UiInput } from "@/components/ui/input";

interface IFormInput<T extends FieldValues> {
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

export function Input<T extends FieldValues>({
  className,
  control,
  description,
  label,
  name,
  placeholder,
  type,
}: IFormInput<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <UiInput type={type} placeholder={placeholder ?? ""} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
