'use client';

import { Copy, Download } from 'lucide-react';
import * as React from 'react';
import type { ColumnDef } from "@tanstack/react-table";

import { Button } from '@/components/ui/base/button/button';
import { Checkbox } from '@/components/ui/base/checkbox/checkbox';
import type { DataTableHandle } from '@/components/ui/base/data-table/data-table';
import { DataTable } from '@/components/ui/base/data-table/data-table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/base/dialog/dialog';
import { Input } from '@/components/ui/base/input/input';
import { Label } from '@/components/ui/base/label/label';
import { Textarea } from '@/components/ui/base/textarea/textarea';
import type { MarkerEntry } from '@/lib/types';

import TabsLayout from './tabs-layout';

export const columns: ColumnDef<MarkerEntry>[] = [
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
];

export const initialFilters = [
  {
    id: "assessment",
    value: [],
  },
];

export default function EntriesTab({
  tabsList,
  entries,
}: {
  tabsList: React.ReactNode;
  entries: MarkerEntry[];
}) {
  const tableInstance = React.useRef<DataTableHandle<MarkerEntry> | null>(null);

  return (
    <TabsLayout
      tabsList={tabsList}
      exportButton={<ExportDialog tableInstance={tableInstance} />}
      table={
        <DataTable
          columns={columns}
          initialFilters={initialFilters}
          emptyText="No entries"
          data={entries}
          ref={tableInstance}
        />
      }
    />
  );
}

function ExportDialog({
  tableInstance,
}: {
  tableInstance: React.RefObject<DataTableHandle<MarkerEntry> | null>;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button><Download /> Export to TSV</Button>
      </DialogTrigger>

      <DialogContent className="w-[calc(100%_-_1rem)] max-w-2xl max-h-[calc(100%_-_1rem)] overflow-y-auto p-4">
        <DialogHeader>
          <DialogTitle>Export to TSV</DialogTitle>
          <DialogDescription>
            Export marking hours to a TSV that can be uploaded to CASTLE.
          </DialogDescription>
        </DialogHeader>

        <ExportDialogContent tableInstance={tableInstance} />
      </DialogContent>
    </Dialog>
  );
}

function ExportDialogContent({
  tableInstance,
}: {
  tableInstance: React.RefObject<DataTableHandle<MarkerEntry> | null>;
}) {
  const [courseCode, setCourseCode] = React.useState<string>(
    process.env.NEXT_PUBLIC_COURSE_CODE || 'COMP1234'
  );
  const [autoDesc, setAutoDesc] = React.useState<boolean>(true);
  const [description, setDescription] = React.useState<string>('Marking');
  const [week, setWeek] = React.useState<string>('1');
  const [payCode, setPayCode] = React.useState<string>('PAY MARK STD');

  const headerText = (
    'COURSE_CODE\tCASUAL_ZID\tCASUAL_NAME\t' +
    'ACTIVITY_DESCRIPTION\tWEEKS\tVARIATION_HOURS\tPAYCODE'
  );

  const dataText = tableInstance.current?.getRowModel().rows.map(
    (row) => row.original
  ).map((entry) => {
    const desc = autoDesc ? `${entry.assessment.name} Marking` : description;
    
    return (
      `${courseCode}\t${entry.marker.zid}\t${entry.marker.name}\t` +
      `${desc}\t${week}\t${entry.hours} hours\t${payCode}`
    );
  }).join('\n');

  const tsvText = `${headerText}\n${dataText}`;

  const copyTsvText = () => {
    navigator.clipboard.writeText(tsvText);
  };

  const downloadTsvFile = () => {
    const element = document.createElement('a');
    const file = new Blob([tsvText]);
    element.href = URL.createObjectURL(file);
    element.download = 'marking-hours.tsv';
    element.click();
  };

  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor="course-code" className="mb-2">Course code</Label>
        <Input
          type="text"
          id="course-code"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
        />
      </div>

      <div>
        <Label className="mb-2">Description</Label>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Checkbox
              className="w-5 h-5" id="auto-description"
              checked={autoDesc}
              onCheckedChange={(checked) => {setAutoDesc(checked === true)}}
            />
            <Label htmlFor="auto-description">
              Automatically generate from assessment name
            </Label>
          </div>
          {!autoDesc &&
            <Input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          }
        </div>
      </div>

      <div>
        <Label htmlFor="week" className="mb-2">Week</Label>
        <Input
          type="text"
          id="week"
          value={week}
          onChange={(e) => setWeek(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="pay-code" className="mb-2">Pay code</Label>
        <Input
          type="text"
          id="pay-code"
          value={payCode}
          onChange={(e) => setPayCode(e.target.value)}
        />
      </div>

      <div>
        <Label className="mb-2">TSV text</Label>
        <Textarea
          className="h-32 field-sizing-fixed whitespace-pre"
          value={`${headerText}   \n${dataText}`} disabled
        />
      </div>

      <div className="flex justify-end gap-2">
        <CopyButton onClick={copyTsvText} />
        <Button onClick={downloadTsvFile}><Download />Download</Button>
      </div>
    </div>
  );
}

function CopyButton({
  onClick,
}: {
  onClick: () => void;
}) {
  const [recentlyClicked, setRecentlyClicked] = React.useState(false);
  const [timeoutId, setTimeoutId] = React.useState<NodeJS.Timeout | null>(null);

  const handleClick = () => {
    onClick();
    setRecentlyClicked(true);
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    setTimeoutId(setTimeout(() => setRecentlyClicked(false), 750));
  };

  return (
    <Button variant="secondary" onClick={handleClick}>
      <Copy />
      {recentlyClicked ? "Copied!" : "Copy text"}
    </Button>
  );
}
