// src/components/DataTable/DataTable.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import DataTable from './DataTable';

// Mock data and columns for the stories
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
];

const userColumns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role', sortable: true },
];

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  // Removed 'autodocs' tag to fix the linter warning
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Sets the table to a loading state.',
    },
    selectable: {
      control: 'boolean',
      description: 'Enables row selection with checkboxes.',
    },
  },
  args: {
    data: mockUsers,
    columns: userColumns,
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Default: Story = {};

export const WithRowSelection: Story = {
  args: {
    selectable: true,
  },
};

export const LoadingState: Story = {
  args: {
    loading: true,
  },
};

export const EmptyState: Story = {
  args: {
    data: [],
  },
};