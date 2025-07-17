'use client';

import { AlertCircleIcon } from 'lucide-react';
import * as React from 'react';

import { getAllSubmissions } from '@/api/api';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/base/alert/alert';
import Spinner from '@/components/ui/base/spinner/spinner';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/base/tabs/tabs';
import type { MarkerEntry, MarkerSubmission } from '@/lib/types';

import EntriesTab from './tabs/entries-tab';
import SubmissionsTab from './tabs/submissions-tab';

type LoadState = {
  loading: true;
} | {
  loading: false;
  content: React.ReactNode;
};

export default function AdminPage() {
  return (
    <>
      <title>Admin | Marking Hours</title>

      <PageLoader />
    </>
  );
}

function PageLoader() {
  const [loadState, setLoadState] = React.useState<LoadState>({
    loading: true,
  });

  React.useEffect(() => {
    getAllSubmissions().then((submissions) => {
      setLoadState({
        loading: false,
        content: (
          <PageContent
            entries={submissionsToEntries(submissions)}
            submissions={submissions}
          />
        ),
      });
    }).catch((error) => {
      if (error.message === 'unauthorized') {
        setLoadState({
          loading: false,
          content: <UnauthorizedErrorAlert />,
        });
      } else {
        setLoadState({
          loading: false,
          content: <ErrorAlert />,
        });
      }
    });

    function submissionsToEntries(submissions: MarkerSubmission[]) {
      return Array.from(
        submissions.reduce<Map<string, MarkerSubmission>>(
          (prev: Map<string, MarkerSubmission>, curr: MarkerSubmission) => {
            if (curr.hours > 0) {
              return prev.set(`${curr.marker.zid}-${curr.assessment.id}`, curr);
            } else {
              prev.delete(`${curr.marker.zid}-${curr.assessment.id}`);
              return prev;
            }
          },
          new Map(),
        ).values()
      );
    };
  }, []);

  return loadState.loading ? (
    <div className="flex justify-center items-center py-3">
      <Spinner className="w-8 h-8 text-black block" />
      <p className="text-xl">Loading</p>
    </div>
  ) : loadState.content;
}

function PageContent({
  entries,
  submissions,
}: {
  entries: MarkerEntry[];
  submissions: MarkerSubmission[];
}) {
  const tabsList = (
    <TabsList>
      <TabsTrigger value="entries">Entries</TabsTrigger>
      <TabsTrigger value="submissions">Submissions</TabsTrigger>
    </TabsList>
  );

  return (
    <Tabs defaultValue="entries" className="h-full">
      <TabsContent value="entries" className="h-full">
        <EntriesTab tabsList={tabsList} entries={entries} />
      </TabsContent>
      <TabsContent value="submissions" className="h-full">
        <SubmissionsTab tabsList={tabsList} submissions={submissions} />
      </TabsContent>
    </Tabs>
  );
}

function UnauthorizedErrorAlert() {
  return (
    <Alert variant="default">
      <AlertCircleIcon />
      <AlertTitle>You don&rsquo;t have permission to access this page.</AlertTitle>
      <AlertDescription>
        <p>If you think you should have access to this page, please contact a course admin.</p>
      </AlertDescription>
    </Alert>
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
