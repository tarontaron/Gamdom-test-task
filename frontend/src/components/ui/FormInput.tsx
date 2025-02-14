import { Control, Controller, FieldValues, Path } from 'react-hook-form';

export type TProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  placeholder?: string;
  type?: 'text' | 'password';
};

const FormInput = <T extends FieldValues>({
  name,
  label,
  control,
  placeholder,
  type,
}: TProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const errorMessage = error?.message;

        return (
          <div>
            <p className="text-stone-300">{label}</p>
            <div className="bg-neutral-600/50 p-2 rounded-sm">
              <input
                {...field}
                type={type}
                placeholder={placeholder}
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

export default FormInput;
