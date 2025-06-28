import type { Control, FieldValues, Path } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select as UiSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface IFormInput<T extends FieldValues> {
  className?: string
  // control: Control<z.infer<typeof AddDriverFormSchema>>;
  control: Control<T>
  description?: string
  label?: string
  // name: keyof z.infer<typeof AddDriverFormSchema>;
  name: Path<T>
  placeholder?: string
  options: {
    value: string
    label: string | number
  }[]
}

export function Select<T extends FieldValues>({
  control,
  label,
  name,
  description,
  placeholder,
  className,
  options,
}: IFormInput<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <UiSelect onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option, key) => (
                  <SelectItem key={key} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </UiSelect>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
