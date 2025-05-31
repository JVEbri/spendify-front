import { useMemo, useState } from "react";
import { Expense } from "../types/expense";
import { Plus, X } from "phosphor-react";
import { useExpensesStore } from "../stores/expensesStore";
import { useGroupsStore } from "../stores/groupStore";
import { useExpensesFilters } from "../pages/expenses/hooks/useExpensesFilters";
interface Props {
  expenses: Expense[];
}

export default function ExpensesTable({ expenses }: Props) {
  const [visibleUsers, setVisibleUsers] = useState<string[]>([]);

  const [editingMetaKey, setEditingMetaKey] = useState<string | null>(null);
  const { selectedGroup } = useGroupsStore();
  const { month, year } = useExpensesFilters();
  const { renameMetaColumn, addMetaColumn, removeMetaColumn } =
    useExpensesStore();
  // Obtener todos los nombres únicos de usuarios
  const users = useMemo(() => {
    const names = new Set<string>();
    expenses.forEach((e) => {
      if (e.user?.name) {
        names.add(e.user.name);
      }
    });
    return Array.from(names);
  }, [expenses]);

  const metaKeys = useMemo(() => {
    const keys = new Set<string>();
    expenses.forEach((e) => {
      if (e.meta) {
        Object.keys(e.meta).forEach((k) => keys.add(k));
      }
    });
    return Array.from(keys).sort(); // opcional: sort para orden alfabético
  }, [expenses]);
  // Extraer todas las claves únicas del campo meta

  const filteredExpenses = useMemo(() => {
    return visibleUsers.length === 0
      ? expenses
      : expenses.filter((e) => visibleUsers.includes(e.user.name));
  }, [visibleUsers, expenses]);

  const toggleUser = (name: string) => {
    setVisibleUsers((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const handleRemoveMetaColumn = async (key: string) => {
    if (selectedGroup) {
      await removeMetaColumn(selectedGroup.id, month, year, key);
    }
  };

  const handleAddMetaColumn = async () => {
    let index = 0;
    let newKey = `new${index}`;

    while (metaKeys.includes(newKey)) {
      index++;
      newKey = `new${index}`;
    }

    if (selectedGroup) {
      await addMetaColumn(selectedGroup.id, month, year, newKey);
    }
  };

  const handleRenameMetaColumn = async (oldKey: string, newKey: string) => {
    if (!newKey || newKey === oldKey || metaKeys.includes(newKey)) return;

    if (selectedGroup) {
      await renameMetaColumn(selectedGroup.id, month, year, oldKey, newKey);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filtros por usuario */}
      <div className="flex flex-wrap gap-4">
        {users.map((name) => (
          <label key={name} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={visibleUsers.includes(name)}
              onChange={() => toggleUser(name)}
              className="accent-primary-light dark:accent-primary-dark"
            />
            <span className="text-textPrimary-light dark:text-textPrimary-dark">
              {name}
            </span>
          </label>
        ))}
      </div>

      {/* Tabla única */}
      <div className="overflow-x-auto shadow-md">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
              <th className="p-2 border">Usuario</th>
              <th className="p-2 border">Concepto</th>
              <th className="p-2 border">Cantidad</th>
              <th className="p-2 border">Moneda</th>
              <th className="p-2 border">Categoría</th>
              <th className="p-2 border">Fecha</th>

              {metaKeys.map((key) => (
                <th key={key} className="p-2 border group relative">
                  <div className="flex items-center justify-between">
                    {editingMetaKey === key ? (
                      <input
                        autoFocus
                        defaultValue={key}
                        onBlur={(e) => {
                          handleRenameMetaColumn(key, e.target.value.trim());
                          setEditingMetaKey(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleRenameMetaColumn(
                              key,
                              (e.target as HTMLInputElement).value.trim()
                            );
                            setEditingMetaKey(null);
                          }
                        }}
                        className="text-sm p-1 rounded w-24 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-black dark:text-white"
                      />
                    ) : (
                      <span
                        className="capitalize cursor-pointer"
                        onClick={() => setEditingMetaKey(key)}
                        title="Haz clic para renombrar"
                      >
                        {key}
                      </span>
                    )}

                    {/* Botón eliminar */}
                    <button
                      onClick={() => handleRemoveMetaColumn(key)}
                      className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity bg-transparent p-0 m-0"
                      title="Eliminar columna"
                    >
                      <X
                        size={18}
                        weight="bold"
                        className="pointer-events-none"
                      />
                    </button>
                  </div>
                </th>
              ))}

              <th className="pl-1">
                <button
                  onClick={handleAddMetaColumn}
                  className="text-green-600 hover:text-green-800 bg-transparent p-1 m-0"
                  title="Añadir columna"
                >
                  <Plus
                    size={18}
                    weight="bold"
                    className="pointer-events-none"
                  />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr
                key={expense.id}
                className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700"
              >
                <td className="p-2 border">{expense.user?.name}</td>
                <td className="p-2 border">{expense.title}</td>
                <td className="p-2 border">{expense.amount}</td>
                <td className="p-2 border">{expense.currency}</td>
                <td className="p-2 border">{expense.category}</td>
                <td className="p-2 border">
                  {new Date(expense.date).toLocaleDateString()}
                </td>
                {metaKeys.map((key) => (
                  <td key={key} className="p-2 border">
                    {expense.meta?.[key] ?? "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
