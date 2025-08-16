import React, { useState, useMemo } from 'react';
import type { ChangeEvent, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

// SVG Icons (Self-contained)
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.19 10.19 0 0 1 12 20c-7 0-10-7-10-7a1.18 1.18 0 0 1 0-.68" />
    <path d="M2 2l22 22" />
    <path d="M7.06 6.06A10.19 10.19 0 0 1 12 4c7 0 10 7 10 7a1.18 1.18 0 0 1 0 .68" />
    <line x1="12" x2="12" y1="17" y2="17" />
  </svg>
);
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);
const LoaderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
const SortAscIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5V19M12 5l-7 7M12 5l7 7" />
  </svg>
);
const SortDescIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5M12 19l7-7M12 19l-7-7" />
  </svg>
);

// Define the component's props interface as specified in the assignment
interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  inputSize?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  inputSize = 'md',
  loading = false,
  type = 'text',
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // TailwindCSS class logic for variants, sizes, and states
  const baseClasses = 'w-full rounded-lg transition-all duration-200 focus:ring-2';
  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg',
  };
  const variantClasses = {
    outlined: 'border border-gray-300 focus:outline-none focus:ring-blue-500',
    filled: 'bg-gray-100 border border-transparent focus:outline-none focus:ring-blue-500',
    ghost: 'bg-transparent border-b border-gray-300 focus:outline-none focus:ring-blue-500',
  };

  const stateClasses = {
    disabled: 'opacity-50 cursor-not-allowed',
    invalid: 'border-red-500 focus:ring-red-500',
  };

  const inputClasses = classNames(
    baseClasses,
    sizeClasses[inputSize],
    variantClasses[variant],
    {
      [stateClasses.invalid]: invalid,
      [stateClasses.disabled]: disabled,
    }
  );

  const isPassword = type === 'password';
  const hasValue = value && value.length > 0;

  return (
    <div className="flex flex-col space-y-1 items-center justify-center">
      {label && <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
      <div className="relative w-full flex justify-center">
      <input
        type={isPassword && !showPassword ? 'password' : 'text'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled || loading}
        className={inputClasses}
          {...rest}
        />
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 animate-spin">
            <LoaderIcon />
          </div>
        )}
        {!loading && hasValue && (
          <>
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            )}
            {!isPassword && (
              <button
                type="button"
                onClick={() => onChange?.({ target: { value: '' } } as ChangeEvent<HTMLInputElement>)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <XIcon />
              </button>
            )}
          </>
        )}
      </div>
      {helperText && !errorMessage && <p className="text-xs text-gray-500 dark:text-gray-400">{helperText}</p>}
      {errorMessage && invalid && <p className="text-xs text-red-500 dark:text-red-400">{errorMessage}</p>}
    </div>
  );
};

// Define the generic props for DataTable as specified in the assignment
interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

const DataTable = <T extends object>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) => {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const key = sortConfig.key as keyof T;
        const aValue = a[key];
        const bValue = b[key];
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          if (aValue < bValue) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (aValue > bValue) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
        }
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          if (aValue < bValue) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (aValue > bValue) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const handleSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleRowSelection = (row: T) => {
    const isSelected = selectedRows.includes(row);
    let newSelectedRows: T[];
    if (isSelected) {
      newSelectedRows = selectedRows.filter((r) => r !== row);
    } else {
      newSelectedRows = [...selectedRows, row];
    }
    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(data);
      onRowSelect?.(data);
    } else {
      setSelectedRows([]);
      onRowSelect?.([]);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500 dark:text-gray-400">
        <LoaderIcon />
        Loading...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500 dark:text-gray-400">
        No data to display.
      </div>
    );
  }

  const allSelected = selectedRows.length === data.length && data.length > 0;

  return (
    <div className="w-full overflow-x-auto shadow-lg rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {selectable && (
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={allSelected}
                  className="rounded-sm text-blue-600 focus:ring-blue-500"
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key as string}
                className={classNames(
                  "p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                  { "cursor-pointer select-none": column.sortable }
                )}
                onClick={() => column.sortable && handleSort(column.key as string)}
              >
                <div className="flex items-center">
                  {column.header}
                  {column.sortable && (
                    <span className="ml-1 text-xs">
                      {sortConfig?.key === column.key ? (
                        sortConfig.direction === 'ascending' ? (
                          <SortAscIcon />
                        ) : (
                          <SortDescIcon />
                        )
                      ) : (
                        <span className="opacity-30">
                          <SortDescIcon />
                        </span>
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
          {sortedData.map((row, rowIndex) => (
            <tr key={rowIndex} className={classNames('hover:bg-gray-100 dark:hover:bg-gray-700', { 'bg-blue-50 dark:bg-blue-900': selectedRows.includes(row) })}>
              {selectable && (
                <td className="p-3 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row)}
                    onChange={() => handleRowSelection(row)}
                    className="rounded-sm text-blue-600 focus:ring-blue-500"
                  />
                </td>
              )}
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="p-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {column.render ? column.render(row) : (row[column.key as keyof T] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Main App component to showcase the components
function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  // Example data for DataTable
  interface User {
    id: number;
    name: string;
    email: string;
    role: string;
  }
  
  const mockUsers: User[] = [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Admin' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User' },
    { id: 4, name: 'David Wilson', email: 'david@example.com', role: 'Editor' },
    { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'User' },
  ];

  const userColumns: Column<User>[] = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role', sortable: true },
  ];

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setInvalidEmail(!e.target.value.includes('@'));
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  
  const handleLogin = () => {
    setLoading(true);
    // Simulate a network request
    setTimeout(() => {
      setLoading(false);
      console.log('Login attempt with:', { email, password });
    }, 2000);
  };

  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const handleRowSelect = (rows: User[]) => {
    setSelectedUsers(rows);
    console.log('Selected rows:', rows);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen dark:bg-gray-950 dark:text-gray-200 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Component Showcase
        </h1>

        {/* InputField Section */}
        <section className="bg-white p-8 rounded-xl shadow-lg dark:bg-gray-900">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            InputField Component
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InputField
                label="Outlined Email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
                invalid={invalidEmail}
                errorMessage={invalidEmail ? 'Invalid email format' : undefined}
              />
              <InputField
                label="Filled Password"
                type="password"
                variant="filled"
                value={password}
                onChange={handlePasswordChange}
              />
              <InputField
                label="Ghost Input"
                variant="ghost"
                placeholder="Enter something here"
              />
              <InputField
                label="Disabled Input"
                disabled
                value="Can't type here"
              />
              <InputField
                label="Small Size"
                inputSize="sm"
                placeholder="Small input"
              />
              <InputField
                label="Large Size"
                inputSize="lg"
                placeholder="Large input"
              />
              <InputField
                label="Loading State"
                loading
                value="Submitting..."
                disabled
              />
            </div>
          </div>
          <button
            onClick={handleLogin}
            className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </section>

        {/* DataTable Section */}
        <section className="bg-white p-8 rounded-xl shadow-lg dark:bg-gray-900">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            DataTable Component
          </h2>
          <div className="space-y-6">
            <h3 className="text-xl font-medium">Sortable Table</h3>
            <DataTable data={mockUsers} columns={userColumns} />
            
            <h3 className="text-xl font-medium mt-8">Table with Row Selection</h3>
            <DataTable 
              data={mockUsers} 
              columns={userColumns} 
              selectable
              onRowSelect={handleRowSelect}
            />
            
            <h3 className="text-xl font-medium mt-8">Loading State</h3>
            <DataTable data={[]} columns={userColumns} loading />

            <h3 className="text-xl font-medium mt-8">Empty State</h3>
            <DataTable data={[]} columns={userColumns} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
