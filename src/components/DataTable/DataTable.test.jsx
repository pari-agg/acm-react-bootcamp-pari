import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DataTable } from './DataTable';

const mockColumns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age' },
];

const mockData = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 20 },
];

describe('DataTable Component', () => {
  describe('Rendering', () => {
    it('renders an HTML table element', () => {
      render(<DataTable columns={mockColumns} data={mockData} />);
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('renders all column headers', () => {
      render(<DataTable columns={mockColumns} data={mockData} />);
      expect(screen.getByText('ID')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Age')).toBeInTheDocument();
    });

    it('maps over array to render all data rows', () => {
      render(<DataTable columns={mockColumns} data={mockData} />);
      // 3 data rows + 1 header row = 4 rows
      const rows = screen.getAllByRole('row');
      expect(rows.length).toBe(4);
    });

    it('renders cell data correctly', () => {
      render(<DataTable columns={mockColumns} data={mockData} />);
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('30')).toBeInTheDocument(); // Bob's age
    });

    it('handles empty data gracefully', () => {
      render(<DataTable columns={mockColumns} data={[]} />);
      expect(screen.getByText('No data available')).toBeInTheDocument();
    });
  });

  describe('Sorting Logic', () => {
    it('sorts data ascending when a header is clicked', () => {
      render(<DataTable columns={mockColumns} data={mockData} />);
      
      fireEvent.click(screen.getByText('Name'));
      
      const rows = screen.getAllByRole('row');
      // Row 0 is header. Row 1 should be Alice (A)
      expect(rows[1]).toHaveTextContent('Alice');
      expect(rows[2]).toHaveTextContent('Bob');
      expect(rows[3]).toHaveTextContent('Charlie');
    });

    it('toggles to descending sort on second click', () => {
      render(<DataTable columns={mockColumns} data={mockData} />);
      
      const nameHeader = screen.getByText('Name');
      
      fireEvent.click(nameHeader); // Ascending
      fireEvent.click(nameHeader); // Descending
      
      const rows = screen.getAllByRole('row');
      // Charlie should be first in descending
      expect(rows[1]).toHaveTextContent('Charlie');
      expect(rows[2]).toHaveTextContent('Bob');
      expect(rows[3]).toHaveTextContent('Alice');
    });

    it('sorts numeric values correctly', () => {
      render(<DataTable columns={mockColumns} data={mockData} />);
      
      const ageHeader = screen.getByText('Age');
      
      fireEvent.click(ageHeader); // Ascending (20, 25, 30)
      let rows = screen.getAllByRole('row');
      expect(rows[1]).toHaveTextContent('Charlie'); // Age 20
      
      fireEvent.click(ageHeader); // Descending (30, 25, 20)
      rows = screen.getAllByRole('row');
      expect(rows[1]).toHaveTextContent('Bob'); // Age 30
    });
  });

  describe('Accessibility', () => {
    it('uses th elements for column headers', () => {
      render(<DataTable columns={mockColumns} data={mockData} />);
      const headers = screen.getAllByRole('columnheader');
      expect(headers.length).toBe(3);
    });

    it('indicates sort direction via aria-sort attribute', () => {
      render(<DataTable columns={mockColumns} data={mockData} />);
      const nameHeader = screen.getByText('Name').closest('th');
      
      fireEvent.click(nameHeader); // Asc
      expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');
      
      fireEvent.click(nameHeader); // Desc
      expect(nameHeader).toHaveAttribute('aria-sort', 'descending');
    });
  });
});
