"use client";

import { ChevronDown, ChevronsUpDown, ChevronUp, Funnel } from "lucide-react";
import * as React from "react";
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  RowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/base/checkbox/checkbox";
import { Label } from "@/components/ui/base/label/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/base/popover/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/base/table/table";
import { cn } from "@/lib/utils";

export interface DataTableHandle<TData> {
  getRowModel: () => RowModel<TData>;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  initialFilters: ColumnFiltersState;
  emptyText?: string;
  data: TData[];
  ref?: React.RefObject<DataTableHandle<TData> | null>;
}

export function DataTable<TData, TValue>({
  columns,
  initialFilters,
  emptyText = 'No results',
  data,
  ref,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    initialFilters,
  );

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      columnFilters,
    },
  });

  React.useImperativeHandle(ref, () => ({
    getRowModel: () => table.getRowModel(),
  }));

  return (
    <div className="overflow-hidden rounded-md border">
      <div className="w-full h-full overflow-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="sticky top-0 z-20 bg-background border-b font-semibold"
                      style={{
                        ...header.column.columnDef.meta?.style,
                      }}
                    >
                      <div
                        className={cn(
                          "flex justify-center items-center gap-1",
                          header.column.getCanSort() && "cursor-pointer select-none"
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        {header.column.getCanSort()
                          && <Sorter column={header.column} />
                        }

                        {header.column.getCanFilter()
                          ? <span className="mb-1" onClick={(e) => e.stopPropagation()}>
                              <Filter column={header.column} />
                            </span>
                          : null
                        }
                      </div>
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="max-h-full overflow-y">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      align={cell.column.columnDef.meta?.style?.textAlign}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {emptyText}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function Sorter<TData, TValue>({ column }: { column: Column<TData, TValue> }) {
  const sorted = column.getIsSorted();

  return (
    !sorted
      ? <ChevronsUpDown className="inline w-4 h-4 stroke-table-icon-inactive" />
    
    : sorted === 'asc'
      ? <ChevronDown className="inline w-4 h-4" />
    
      : <ChevronUp className="inline w-4 h-4" />
  );
}

function Filter<TData, TValue>({ column }: { column: Column<TData, TValue> }) {
  const { filterVariant } = column.columnDef.meta ?? {};

  return (
    filterVariant === 'select'
      ? <CheckboxSelectFilter column={column} />
      : null
  );
}

export function CheckboxSelectFilter<TData, TValue>({
  column,
}: {
  column: Column<TData, TValue>;
}) {
  const columnFilterValue = column.getFilterValue() as string[];

  const sortedUniqueValues = Array.from(
    column.getFacetedUniqueValues().keys()
  ).sort();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Funnel className={cn(
          "inline w-4 h-4",
          columnFilterValue.length === 0
            ? "stroke-table-icon-inactive"
            : "stroke-table-icon-active"
        )} />
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <div className="flex flex-col gap-3">
          {sortedUniqueValues.map((value: string) => (
            <div key={value} className="flex items-center gap-3">
              <Checkbox
                id={value}
                checked={columnFilterValue.includes(value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    column.setFilterValue((values: string[]) =>
                      [...values, value]);
                  } else {
                    column.setFilterValue((values: string[]) =>
                      values.filter((arrValue) => arrValue !== value));
                  }
                }}
              />
              <Label htmlFor={value}>{value}</Label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
