import {
  Controller,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface SelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: Option[];
  label?: string;
  placeholder?: string;
  rules?: RegisterOptions<T>;
  onChange?: (value: string) => void; // ⬅️ Permite ejecutar acciones personalizadas
}

export default function Select<T extends FieldValues>({
  name,
  control,
  options,
  label,
  placeholder = "Selecciona una opción...",
  rules,
  onChange,
}: SelectProps<T>) {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label className="text-sm font-medium text-textPrimary-light dark:text-textPrimary-dark">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <div>
            <select
              {...field}
              onChange={(e) => {
                field.onChange(e); // ⬅️ Actualiza el formulario
                if (onChange) onChange(e.target.value); // ⬅️ Ejecuta la acción personalizada
              }}
              className={`dark:hover:border-blue-500 w-full bg-card-light dark:bg-card-dark text-textPrimary-light dark:text-textPrimary-dark border ${
                fieldState.error
                  ? "border-red-500"
                  : "border-gray-400 dark:border-gray-600"
              } p-2 rounded-md focus:outline-none focus:ring-2 ${
                fieldState.error
                  ? "focus:ring-red-500"
                  : "focus:ring-blue-500 focus:border-blue-500"
              }`}
            >
              <option value="" disabled>
                {placeholder}
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {fieldState.error && (
              <p className="text-red-500 text-sm mt-1">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
}
