
import * as React from 'react';

export default function TabsLayout({
  tabsList,
  exportButton,
  table,
}: {
  tabsList: React.ReactNode;
  exportButton: React.ReactNode;
  table: React.ReactNode;
}) {
  return (
    <div className="max-h-full grid grid-flow-col grid-rows-[auto_minmax(auto,1fr)] gap-y-2">
      <div className="flex justify-between">
        {tabsList}
        {exportButton}
      </div>
      {table}
    </div>
  );
}
