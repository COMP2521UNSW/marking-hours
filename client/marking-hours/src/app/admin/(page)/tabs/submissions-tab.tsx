
import dayjs from 'dayjs';
import * as React from 'react';
import type { ColumnDef } from '@tanstack/react-table';

import { DataTable } from '@/components/ui/base/data-table/data-table';
import type { MarkerSubmission } from '@/lib/types';

import TabsLayout from './tabs-layout';

export const columns: ColumnDef<MarkerSubmission>[] = [
  {
    id: "zid",
    accessorFn: (row) => row.marker.zid,
    header: "zID",
    sortDescFirst: false,
    meta: {
      style: { textAlign: 'center' },
    },
  },
  {
    id: "name",
    accessorFn: (row) => row.marker.name,
    header: "Name",
    sortDescFirst: false,
    meta: {
      style: { textAlign: 'center' },
    },
  },
  {
    id: "assessment",
    accessorFn: (row) => row.assessment.name,
    header: "Assessment",
    sortDescFirst: false,
    filterFn: (row, columnId, filterValue: string[]) => {
      return (
        filterValue.length === 0 ||
        filterValue.includes(row.getValue(columnId))
      );
    },
    meta: {
      filterVariant: 'select',
      style: { textAlign: 'center' },
    },
  },
  {
    accessorKey: "hours",
    header: "Hours",
    sortDescFirst: false,
    meta: {
      style: { textAlign: 'center' },
    },
  },
  {
    accessorKey: "timestamp",
    header: "Time",
    cell: (props) => {
      const date = props.getValue() as Date;
      return dayjs(date).format('ddd DD MMMM YYYY HH:mm:ss');
    },
    sortDescFirst: false,
    meta: {
      style: { textAlign: 'center' },
    },
  },
  {
    accessorKey: "note",
    header: "Note",
    sortDescFirst: false,
    meta: {
      style: { textAlign: 'center' },
    },
    maxSize: 300,
  },
];

export const initialFilters = [
  {
    id: "assessment",
    value: [],
  },
];

export default function SubmissionsTab({
  tabsList,
  submissions,
}: {
  tabsList: React.ReactNode;
  submissions: MarkerSubmission[];
}) {
  return (
    <TabsLayout
      tabsList={tabsList}
      exportButton={null}
      table={
        <DataTable
          columns={columns}
          initialFilters={initialFilters}
          emptyText="No submissions"
          data={submissions}
        />
      }
    />
  );
}
