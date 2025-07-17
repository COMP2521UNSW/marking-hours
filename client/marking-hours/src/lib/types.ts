
export type Assessment = {
  id: string;
  name: string;
};

export type Entry = {
  assessment: Assessment;
  hours: number;
};

export type Marker = {
  zid: string;
  name: string;
};

export type MarkerEntry = {
  marker: Marker;
  assessment: Assessment;
  hours: number;
};

export type MarkerSubmission = {
  marker: Marker;
  assessment: Assessment;
  hours: number;
  note: string;
  timestamp: Date;
};
