
/*
export {
  getAssessments,
  getTutorEntries,
  submitMarkingHours,
  getAllSubmissions,
} from './fake/api';
// */

//*
import axios from 'axios';

import type { Assessment, Entry, MarkerSubmission } from '@/lib/types';

const API_ROUTE = process.env.NEXT_PUBLIC_API_URL!;

export async function getAssessments(): Promise<Assessment[]> {
  const res = await axios.get<Assessment[]>(`${API_ROUTE}/assessments`);
  return res.data;
}

export async function getTutorEntries(): Promise<Entry[]> {
  const res = await axios.get<Entry[]>(`${API_ROUTE}/hours`);
  return res.data;
}

export async function submitMarkingHours(
  assessmentId: string, hours: number, note: string
) {
  await axios.post(`${API_ROUTE}/hours`, {
    assessmentId,
    hours,
    note,
  });
}

export async function getAllSubmissions() {
  try {
    const res = await axios.get<MarkerSubmission[]>(`${API_ROUTE}/hours/submissions`);
    return res.data.map((submission) => ({
      ...submission,
      timestamp: new Date(submission.timestamp),
    }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        throw new Error('unauthorized');
      }
    }
    throw new Error('other');
  }
}
// */
