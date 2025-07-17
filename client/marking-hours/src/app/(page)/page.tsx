'use client';

import { AlertCircleIcon, Plus } from 'lucide-react';
import * as React from 'react';

import { getAssessments, getTutorEntries } from '@/api/api';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/base/alert/alert';
import { Button } from '@/components/ui/base/button/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/base/dialog/dialog';
import Spinner from '@/components/ui/base/spinner/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/base/table/table';
import { Text } from '@/components/ui/base/typography/typography';
import type { Assessment, Entry } from '@/lib/types';

import UpdateHoursForm from './update-form';

type LoadState = {
  loading: true;
} | {
  loading: false;
  content: React.ReactNode;
};

export default function HomePage() {
  return (
    <>
      <title>Marking Hours</title>

      <PageLoader />
    </>
  );
}

function PageLoader() {
  const [loadState, setLoadState] = React.useState<LoadState>({
    loading: true,
  });

  React.useEffect(() => {
    Promise.all([
      getAssessments(),
      getTutorEntries(),
    ]).then(([assessments, entries]) => {
      setLoadState({
        loading: false,
        content: (
          <PageContent
            assessments={assessments}
            entries={entries}
          />
        ),
      });
    }).catch(() => {
      setLoadState({
        loading: false,
        content: <ErrorAlert />,
      });
    });
  }, []);

  return loadState.loading ? (
    <div className="flex justify-center items-center py-3">
      <Spinner className="w-8 h-8 text-black block" />
      <p className="text-xl">Loading</p>
    </div>
  ) : loadState.content;
}

function PageContent({
  assessments,
  entries: initialEntries,
}: {
  assessments: Assessment[];
  entries: Entry[];
}) {
  const [entries, setEntries] = React.useState<Entry[]>(initialEntries);

  const handleUpdated = (assessmentId: string, hours: number) => {
    const assessment = assessments.find((a) => a.id === assessmentId);
    const entryIdx = entries.findIndex((e) => e.assessment.id === assessmentId);

    if (assessment === undefined) {
      return;
    }

    if (entryIdx !== -1) {
      if (hours > 0) {
        setEntries([
          ...entries.slice(0, entryIdx),
          { assessment, hours },
          ...entries.slice(entryIdx + 1),
        ]);
      } else {
        setEntries([
          ...entries.slice(0, entryIdx),
          ...entries.slice(entryIdx + 1),
        ]);
      }
    } else {
      if (hours > 0) {
        setEntries([...entries, { assessment, hours }]);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <Text>Your marking hours</Text>

        <UpdateDialog
          assessments={assessments} entries={entries}
          onUpdated={handleUpdated}
        />
      </div>
      <div className="h-3" />
      <HoursTable entries={entries} />
    </div>
  );
}

function HoursTable({
  entries,
}: {
  entries: Entry[];
}) {
  return (
    <div className="rounded-md border">
      <Table className="text-center">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center font-semibold">Assessment</TableHead>
            <TableHead className="text-center font-semibold">Hours</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2}>No marking hours</TableCell>
            </TableRow>
          ) : (
            entries.map((entry) => (
              <TableRow key={entry.assessment.id}>
                <TableCell>{entry.assessment.name}</TableCell>
                <TableCell>{entry.hours}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function UpdateDialog({
  assessments,
  entries,
  onUpdated,
}: {
  assessments: Assessment[];
  entries: Entry[];
  onUpdated: (assessmentId: string, hours: number) => void;
}) {
  const [open, setOpen] = React.useState(false);

  const handleUpdated = (assessmentId: string, hours: number) => {
    setOpen(false);
    onUpdated(assessmentId, hours);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="-m-1 !size-5" /> Add/Update
        </Button>
      </DialogTrigger>

      <DialogContent
        className="w-[calc(100%_-_1rem)] max-w-md max-h-[calc(100%_-_1rem)] overflow-y-auto rounded-md p-4"
      >
        <DialogHeader>
          <DialogTitle>Add/Update Marking Hours</DialogTitle>
          <DialogDescription>
            Add or update your marking hours for an assessment.
          </DialogDescription>
        </DialogHeader>

        <UpdateHoursForm
          assessments={assessments} entries={entries}
          onUpdated={handleUpdated} onCancelled={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

function ErrorAlert() {
  return (
    <Alert variant="default">
      <AlertCircleIcon />
      <AlertTitle>An error occurred.</AlertTitle>
      <AlertDescription>
        <p>Please try again later. If the problem persists, please contact a course admin.</p>
      </AlertDescription>
    </Alert>
  );
}
