import React from 'react';

const AdminTable = ({ columns, data, keyField = '_id' }) => {
  return (
    <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border-warm)] shadow-sm overflow-hidden">
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left font-sans text-sm whitespace-nowrap">
          <thead className="bg-[var(--color-background)] border-b border-[var(--color-border-warm)]">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="px-6 py-4 font-semibold text-[var(--color-ink-deep)] tracking-wide">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border-warm)]/50">
            {data.length > 0 ? data.map((row) => (
              <tr key={row[keyField]} className="hover:bg-[var(--color-background)]/50 transition-colors">
                {columns.map((col, index) => (
                  <td key={index} className="px-6 py-4 text-[var(--color-ink-muted)]">
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            )) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-16 text-center text-[var(--color-ink-muted)]">
                  <span className="block font-sans font-medium text-xl mb-1 text-[var(--color-ink-deep)]">No records found</span>
                  <span className="font-sans text-sm">There is no data to display in this view.</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;
