import { ChangeEvent } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

export type TProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  control: Control<T>;
  placeholder?: string;
};

const NumericFormInput = <T extends FieldValues>({
  name,
  label,
  control,
  placeholder,
}: TProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const errorMessage = error?.message;

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
          const numericValue = e.target.value.replace(/[^0-9]/g, ''); // Allow only numbers

          field.onChange(numericValue ? numericValue : '');
        };

        return (
          <div>
            {!!label && <p className="text-stone-300">{label}</p>}
            <div className="bg-neutral-600/50 p-2 rounded-sm">
              <input
                {...field}
                type="text"
                placeholder={placeholder}
                onChange={handleChange}
                className={`w-full bg-transparent focus:ring-0 outline-none ${errorMessage ? 'border-red-500' : ''}`}
              />
            </div>
            {errorMessage && <p className="text-sm/6 text-red-500">{errorMessage}</p>}
          </div>
        );
      }}
    />
  );
};

export default NumericFormInput;
