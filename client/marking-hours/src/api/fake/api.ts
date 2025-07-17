
import { fakeAssessments, fakeSubmissions, fakeTutorEntries } from './data';

////////////////////////////////////////////////////////////////////////

export async function getAssessments() {
  await syntheticDelay();

  return fakeAssessments;
}

export async function getTutorEntries() {
  await syntheticDelay();

  return fakeTutorEntries;
}

////////////////////////////////////////////////////////////////////////

export async function submitMarkingHours(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  assessmentId: string, hours: number, note: string
) {
  await syntheticDelay();
}

////////////////////////////////////////////////////////////////////////

export async function getAllSubmissions() {
  await syntheticDelay();

  return fakeSubmissions;
}

////////////////////////////////////////////////////////////////////////

async function syntheticDelay() {
  await delay(1000);
}

async function delay(ms: number) {
  await new Promise((res) => setTimeout(res, ms));
}

////////////////////////////////////////////////////////////////////////
