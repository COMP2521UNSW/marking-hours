
import type { Assessment, Entry, MarkerSubmission } from "@/lib/types";

const assessmentMap = {
  ass1: { id: 'ass1', name: 'Assignment 1' },
  ass2: { id: 'ass2', name: 'Assignment 2' },
  exam: { id: 'exam', name: 'Exam' },
  suppExam: { id: 'supp-exam', name: 'Supp Exam' },
};

export const fakeAssessments: Assessment[] = [
  assessmentMap.ass1,
  assessmentMap.ass2,
  assessmentMap.exam,
  assessmentMap.suppExam,
];

export const fakeTutorEntries: Entry[] = [
  { assessment: assessmentMap.ass1, hours: 3 },
  { assessment: assessmentMap.ass2, hours: 5 },
];

export const fakeSubmissions: MarkerSubmission[] = [
  {
    marker: {
      zid: '3267363',
      name: "Christopher Watson",
    },
    assessment: assessmentMap.ass1,
    hours: 3.5,
    note: '',
    timestamp: new Date(2025, 3, 8, 12, 17),
  },
  {
    marker: {
      zid: '3519327',
      name: "Jeff Collins",
    },
    assessment: assessmentMap.ass1,
    hours: 3.5,
    note: '',
    timestamp: new Date(2025, 3, 11, 12, 8),
  },
  {
    marker: {
      zid: '3519327',
      name: "Jeff Collins",
    },
    assessment: assessmentMap.ass1,
    hours: 7,
    note: '',
    timestamp: new Date(2025, 3, 11, 12, 12),
  },
  {
    marker: {
      zid: '3519327',
      name: "Jeff Collins",
    },
    assessment: assessmentMap.ass1,
    hours: 10,
    note: '',
    timestamp: new Date(2025, 3, 11, 14, 32),
  },
  {
    marker: {
      zid: '3731098',
      name: "Michael Wright",
    },
    assessment: assessmentMap.ass1,
    hours: 4,
    note: '',
    timestamp: new Date(2025, 3, 11, 16, 26),
  },
  {
    marker: {
      zid: '3828291',
      name: "Kelly Keith",
    },
    assessment: assessmentMap.ass1,
    hours: 2,
    note: '',
    timestamp: new Date(2025, 3, 14, 21, 19),
  },
  {
    marker: {
      zid: '3036621',
      name: "Cathy Carr",
    },
    assessment: assessmentMap.ass1,
    hours: 8,
    note: '',
    timestamp: new Date(2025, 3, 15, 13, 27),
  },
  {
    marker: {
      zid: '3626386',
      name: "Ryan Rojas",
    },
    assessment: assessmentMap.ass1,
    hours: 11.5,
    note: '',
    timestamp: new Date(2025, 3, 16, 0, 2),
  },
  {
    marker: {
      zid: '3036621',
      name: "Cathy Carr",
    },
    assessment: assessmentMap.ass1,
    hours: 9.5,
    note: '',
    timestamp: new Date(2025, 3, 16, 18, 54),
  },
  {
    marker: {
      zid: '3181330',
      name: "Mark Hodges",
    },
    assessment: assessmentMap.ass1,
    hours: 5,
    note: '',
    timestamp: new Date(2025, 3, 17, 14, 16),
  },
  {
    marker: {
      zid: '3912293',
      name: "Ann Mueller",
    },
    assessment: assessmentMap.ass1,
    hours: 2,
    note: '',
    timestamp: new Date(2025, 3, 17, 21, 34),
  },
  {
    marker: {
      zid: '3336888',
      name: "Sarah Moore",
    },
    assessment: assessmentMap.ass1,
    hours: 3,
    note: '',
    timestamp: new Date(2025, 3, 18, 11, 50),
  },
  {
    marker: {
      zid: '3694782',
      name: "Joy King",
    },
    assessment: assessmentMap.ass1,
    hours: 3.5,
    note: '',
    timestamp: new Date(2025, 3, 18, 23, 50),
  },
  {
    marker: {
      zid: '3719657',
      name: "Sara Lara",
    },
    assessment: assessmentMap.ass1,
    hours: 5,
    note: '',
    timestamp: new Date(2025, 3, 19, 16, 40),
  },
  {
    marker: {
      zid: '3405855',
      name: "Vincent Cruz",
    },
    assessment: assessmentMap.ass1,
    hours: 5,
    note: '',
    timestamp: new Date(2025, 3, 20, 13, 19),
  },
  {
    marker: {
      zid: '3437285',
      name: "Rita Pugh",
    },
    assessment: assessmentMap.ass1,
    hours: 4.5,
    note: '',
    timestamp: new Date(2025, 3, 20, 14, 11),
  },
  {
    marker: {
      zid: '3694782',
      name: "Joy King",
    },
    assessment: assessmentMap.ass1,
    hours: 4.5,
    note: '',
    timestamp: new Date(2025, 3, 20, 15, 37),
  },
  {
    marker: {
      zid: '3279885',
      name: "Joseph Wilson",
    },
    assessment: assessmentMap.ass1,
    hours: 6,
    note: '',
    timestamp: new Date(2025, 3, 20, 17, 27),
  },
  {
    marker: {
      zid: '3279885',
      name: "Joseph Wilson",
    },
    assessment: assessmentMap.ass1,
    hours: 6,
    note: '',
    timestamp: new Date(2025, 3, 20, 17, 28),
  },
  {
    marker: {
      zid: '3626386',
      name: "Ryan Rojas",
    },
    assessment: assessmentMap.ass1,
    hours: 15,
    note: 'marked Dan\'s',
    timestamp: new Date(2025, 3, 20, 17, 34),
  },
  {
    marker: {
      zid: '3392638',
      name: "Julie Summers",
    },
    assessment: assessmentMap.ass1,
    hours: 9,
    note: '',
    timestamp: new Date(2025, 3, 20, 18, 8),
  },
  {
    marker: {
      zid: '3040709',
      name: "James Vaughn",
    },
    assessment: assessmentMap.ass1,
    hours: 3,
    note: '',
    timestamp: new Date(2025, 3, 20, 20, 9),
  },
  {
    marker: {
      zid: '3845650',
      name: "Jimmy Lindsey",
    },
    assessment: assessmentMap.ass1,
    hours: 12,
    note: '',
    timestamp: new Date(2025, 3, 20, 20, 14),
  },
  {
    marker: {
      zid: '3661232',
      name: "Tammy Davis",
    },
    assessment: assessmentMap.ass1,
    hours: 5,
    note: '',
    timestamp: new Date(2025, 3, 20, 22, 20),
  },
  {
    marker: {
      zid: '3267363',
      name: "Christopher Watson",
    },
    assessment: assessmentMap.ass1,
    hours: 1,
    note: '',
    timestamp: new Date(2025, 3, 20, 22, 28),
  },
  {
    marker: {
      zid: '3112867',
      name: "Heather Jimenez",
    },
    assessment: assessmentMap.ass1,
    hours: 3.5,
    note: '',
    timestamp: new Date(2025, 3, 20, 22, 53),
  },
  {
    marker: {
      zid: '3585686',
      name: "Terry Anderson",
    },
    assessment: assessmentMap.ass1,
    hours: 2,
    note: '',
    timestamp: new Date(2025, 3, 21, 2, 25),
  },
  {
    marker: {
      zid: '3262000',
      name: "Thomas Reed",
    },
    assessment: assessmentMap.ass1,
    hours: 9,
    note: '',
    timestamp: new Date(2025, 3, 21, 8, 41),
  },
  {
    marker: {
      zid: '3792375',
      name: "Daniel Wagner",
    },
    assessment: assessmentMap.ass1,
    hours: 6,
    note: '',
    timestamp: new Date(2025, 3, 21, 13, 34),
  },
  {
    marker: {
      zid: '3212206',
      name: "Amy Lee",
    },
    assessment: assessmentMap.ass1,
    hours: 1,
    note: '',
    timestamp: new Date(2025, 3, 21, 15, 37),
  },
  {
    marker: {
      zid: '3256398',
      name: "Vicki King",
    },
    assessment: assessmentMap.ass1,
    hours: 1,
    note: '',
    timestamp: new Date(2025, 3, 21, 17, 1),
  },
  {
    marker: {
      zid: '3066637',
      name: "Amy Sims",
    },
    assessment: assessmentMap.ass1,
    hours: 2.5,
    note: '',
    timestamp: new Date(2025, 3, 21, 17, 31),
  },
  {
    marker: {
      zid: '3828291',
      name: "Kelly Keith",
    },
    assessment: assessmentMap.ass1,
    hours: 4,
    note: 'marked Ann\'s half',
    timestamp: new Date(2025, 3, 21, 21, 5),
  },
  {
    marker: {
      zid: '3597585',
      name: "Morgan Brown",
    },
    assessment: assessmentMap.ass1,
    hours: 5.5,
    note: '',
    timestamp: new Date(2025, 3, 21, 21, 26),
  },
  {
    marker: {
      zid: '3579273',
      name: "Scott Hall",
    },
    assessment: assessmentMap.ass1,
    hours: 2,
    note: '',
    timestamp: new Date(2025, 3, 21, 21, 46),
  },
  {
    marker: {
      zid: '3637493',
      name: "Samuel Pacheco",
    },
    assessment: assessmentMap.ass1,
    hours: 6.5,
    note: '',
    timestamp: new Date(2025, 3, 22, 1, 7),
  },
  {
    marker: {
      zid: '3126234',
      name: "Matthew Mitchell",
    },
    assessment: assessmentMap.ass1,
    hours: 2.5,
    note: '',
    timestamp: new Date(2025, 3, 22, 13, 15),
  },
  {
    marker: {
      zid: '3267736',
      name: "Paul Garrett",
    },
    assessment: assessmentMap.ass1,
    hours: 3.5,
    note: '',
    timestamp: new Date(2025, 3, 22, 15, 41),
  },
  {
    marker: {
      zid: '3405855',
      name: "Vincent Cruz",
    },
    assessment: assessmentMap.ass1,
    hours: 5.5,
    note: '',
    timestamp: new Date(2025, 3, 22, 17, 5),
  },
  {
    marker: {
      zid: '3650130',
      name: "Lauren Wood",
    },
    assessment: assessmentMap.ass1,
    hours: 4.5,
    note: '',
    timestamp: new Date(2025, 3, 22, 21, 9),
  },
  {
    marker: {
      zid: '3267363',
      name: "Christopher Watson",
    },
    assessment: assessmentMap.ass1,
    hours: 0.5,
    note: '',
    timestamp: new Date(2025, 3, 22, 21, 40),
  },
  {
    marker: {
      zid: '3641873',
      name: "Barbara Campbell",
    },
    assessment: assessmentMap.ass1,
    hours: 2.5,
    note: '',
    timestamp: new Date(2025, 3, 23, 18, 58),
  },
  {
    marker: {
      zid: '3828291',
      name: "Kelly Keith",
    },
    assessment: assessmentMap.ass2,
    hours: 2,
    note: '',
    timestamp: new Date(2025, 4, 5, 21, 7),
  },
  {
    marker: {
      zid: '3267363',
      name: "Christopher Watson",
    },
    assessment: assessmentMap.ass2,
    hours: 4,
    note: '',
    timestamp: new Date(2025, 4, 6, 20, 45),
  },
  {
    marker: {
      zid: '3405855',
      name: "Vincent Cruz",
    },
    assessment: assessmentMap.ass2,
    hours: 3.5,
    note: '',
    timestamp: new Date(2025, 4, 10, 23, 10),
  },
  {
    marker: {
      zid: '3405855',
      name: "Vincent Cruz",
    },
    assessment: assessmentMap.exam,
    hours: 1.5,
    note: '',
    timestamp: new Date(2025, 4, 11, 18, 11),
  },
  {
    marker: {
      zid: '3519327',
      name: "Jeff Collins",
    },
    assessment: assessmentMap.ass2,
    hours: 6.5,
    note: '',
    timestamp: new Date(2025, 4, 11, 21, 30),
  },
  {
    marker: {
      zid: '3694782',
      name: "Joy King",
    },
    assessment: assessmentMap.ass2,
    hours: 2,
    note: '',
    timestamp: new Date(2025, 4, 13, 14, 50),
  },
  {
    marker: {
      zid: '3405855',
      name: "Vincent Cruz",
    },
    assessment: assessmentMap.exam,
    hours: 3.5,
    note: '',
    timestamp: new Date(2025, 4, 13, 19, 51),
  },
  {
    marker: {
      zid: '3694782',
      name: "Joy King",
    },
    assessment: assessmentMap.ass2,
    hours: 4,
    note: '',
    timestamp: new Date(2025, 4, 13, 19, 59),
  },
  {
    marker: {
      zid: '3405855',
      name: "Vincent Cruz",
    },
    assessment: assessmentMap.exam,
    hours: 0.5,
    note: '',
    timestamp: new Date(2025, 4, 13, 20, 1),
  },
  {
    marker: {
      zid: '3027917',
      name: "John Steele",
    },
    assessment: assessmentMap.ass2,
    hours: 2,
    note: '',
    timestamp: new Date(2025, 4, 14, 17, 43),
  },
  {
    marker: {
      zid: '3519327',
      name: "Jeff Collins",
    },
    assessment: assessmentMap.ass2,
    hours: 7,
    note: '',
    timestamp: new Date(2025, 4, 14, 21, 19),
  },
  {
    marker: {
      zid: '3519327',
      name: "Jeff Collins",
    },
    assessment: assessmentMap.exam,
    hours: 13.5,
    note: '',
    timestamp: new Date(2025, 4, 14, 21, 20),
  },
  {
    marker: {
      zid: '3694782',
      name: "Joy King",
    },
    assessment: assessmentMap.ass2,
    hours: 5,
    note: '',
    timestamp: new Date(2025, 4, 14, 22, 1),
  },
  {
    marker: {
      zid: '3405855',
      name: "Vincent Cruz",
    },
    assessment: assessmentMap.ass2,
    hours: 1,
    note: '',
    timestamp: new Date(2025, 4, 14, 22, 28),
  },
  {
    marker: {
      zid: '3719657',
      name: "Sara Lara",
    },
    assessment: assessmentMap.ass2,
    hours: 4.5,
    note: '',
    timestamp: new Date(2025, 4, 14, 23, 48),
  },
  {
    marker: {
      zid: '3661232',
      name: "Tammy Davis",
    },
    assessment: assessmentMap.ass2,
    hours: 5,
    note: '',
    timestamp: new Date(2025, 4, 15, 15, 18),
  },
  {
    marker: {
      zid: '3392638',
      name: "Julie Summers",
    },
    assessment: assessmentMap.ass2,
    hours: 6,
    note: '',
    timestamp: new Date(2025, 4, 15, 22, 21),
  },
  {
    marker: {
      zid: '3912293',
      name: "Ann Mueller",
    },
    assessment: assessmentMap.ass2,
    hours: 4,
    note: '',
    timestamp: new Date(2025, 4, 16, 1, 12),
  },
  {
    marker: {
      zid: '3450594',
      name: "James Moore",
    },
    assessment: assessmentMap.ass2,
    hours: 3.5,
    note: '',
    timestamp: new Date(2025, 4, 16, 2, 43),
  },
  {
    marker: {
      zid: '3719657',
      name: "Sara Lara",
    },
    assessment: assessmentMap.exam,
    hours: 5.5,
    note: '',
    timestamp: new Date(2025, 4, 16, 13, 0),
  },
  {
    marker: {
      zid: '3212206',
      name: "Amy Lee",
    },
    assessment: assessmentMap.ass2,
    hours: 1.5,
    note: '',
    timestamp: new Date(2025, 4, 16, 13, 16),
  },
  {
    marker: {
      zid: '3036621',
      name: "Cathy Carr",
    },
    assessment: assessmentMap.ass2,
    hours: 5.5,
    note: '',
    timestamp: new Date(2025, 4, 16, 13, 47),
  },
  {
    marker: {
      zid: '3126234',
      name: "Matthew Mitchell",
    },
    assessment: assessmentMap.ass2,
    hours: 3.5,
    note: '',
    timestamp: new Date(2025, 4, 16, 14, 12),
  },
  {
    marker: {
      zid: '3845650',
      name: "Jimmy Lindsey",
    },
    assessment: assessmentMap.ass2,
    hours: 5,
    note: '',
    timestamp: new Date(2025, 4, 16, 14, 25),
  },
  {
    marker: {
      zid: '3845650',
      name: "Jimmy Lindsey",
    },
    assessment: assessmentMap.ass2,
    hours: 5.5,
    note: '',
    timestamp: new Date(2025, 4, 16, 14, 40),
  },
  {
    marker: {
      zid: '3371234',
      name: "Jackie Hunter",
    },
    assessment: assessmentMap.ass2,
    hours: 3.5,
    note: '',
    timestamp: new Date(2025, 4, 16, 15, 12),
  },
  {
    marker: {
      zid: '3336888',
      name: "Sarah Moore",
    },
    assessment: assessmentMap.ass2,
    hours: 2,
    note: '',
    timestamp: new Date(2025, 4, 16, 16, 20),
  },
  {
    marker: {
      zid: '3792375',
      name: "Daniel Wagner",
    },
    assessment: assessmentMap.ass2,
    hours: 5.5,
    note: '',
    timestamp: new Date(2025, 4, 16, 16, 28),
  },
  {
    marker: {
      zid: '3267363',
      name: "Christopher Watson",
    },
    assessment: assessmentMap.ass2,
    hours: 6,
    note: '',
    timestamp: new Date(2025, 4, 16, 18, 20),
  },
  {
    marker: {
      zid: '3279885',
      name: "Joseph Wilson",
    },
    assessment: assessmentMap.ass2,
    hours: 1,
    note: '',
    timestamp: new Date(2025, 4, 16, 18, 36),
  },
  {
    marker: {
      zid: '3437285',
      name: "Rita Pugh",
    },
    assessment: assessmentMap.ass2,
    hours: 3,
    note: '',
    timestamp: new Date(2025, 4, 16, 18, 49),
  },
  {
    marker: {
      zid: '3519327',
      name: "Jeff Collins",
    },
    assessment: assessmentMap.ass2,
    hours: 9,
    note: '',
    timestamp: new Date(2025, 4, 16, 19, 31),
  },
  {
    marker: {
      zid: '3626386',
      name: "Ryan Rojas",
    },
    assessment: assessmentMap.ass2,
    hours: 20,
    note: '',
    timestamp: new Date(2025, 4, 16, 19, 32),
  },
  {
    marker: {
      zid: '3519327',
      name: "Jeff Collins",
    },
    assessment: assessmentMap.exam,
    hours: 16.5,
    note: '',
    timestamp: new Date(2025, 4, 16, 19, 33),
  },
  {
    marker: {
      zid: '3181330',
      name: "Mark Hodges",
    },
    assessment: assessmentMap.ass2,
    hours: 14.5,
    note: '',
    timestamp: new Date(2025, 4, 16, 20, 47),
  },
  {
    marker: {
      zid: '3694782',
      name: "Joy King",
    },
    assessment: assessmentMap.exam,
    hours: 6,
    note: '',
    timestamp: new Date(2025, 4, 16, 21, 5),
  },
  {
    marker: {
      zid: '3585686',
      name: "Terry Anderson",
    },
    assessment: assessmentMap.ass2,
    hours: 2,
    note: '',
    timestamp: new Date(2025, 4, 16, 21, 32),
  },
  {
    marker: {
      zid: '3650130',
      name: "Lauren Wood",
    },
    assessment: assessmentMap.ass2,
    hours: 4.5,
    note: '',
    timestamp: new Date(2025, 4, 16, 22, 46),
  },
  {
    marker: {
      zid: '3432323',
      name: "Matthew Pena",
    },
    assessment: assessmentMap.exam,
    hours: 5,
    note: '',
    timestamp: new Date(2025, 4, 16, 23, 37),
  },
  {
    marker: {
      zid: '3112867',
      name: "Heather Jimenez",
    },
    assessment: assessmentMap.ass2,
    hours: 3,
    note: '',
    timestamp: new Date(2025, 4, 16, 23, 43),
  },
  {
    marker: {
      zid: '3641873',
      name: "Barbara Campbell",
    },
    assessment: assessmentMap.ass2,
    hours: 3.5,
    note: '',
    timestamp: new Date(2025, 4, 17, 0, 26),
  },
  {
    marker: {
      zid: '3036621',
      name: "Cathy Carr",
    },
    assessment: assessmentMap.exam,
    hours: 7,
    note: '',
    timestamp: new Date(2025, 4, 17, 11, 30),
  },
  {
    marker: {
      zid: '3036621',
      name: "Cathy Carr",
    },
    assessment: assessmentMap.ass2,
    hours: 6.5,
    note: '',
    timestamp: new Date(2025, 4, 17, 11, 31),
  },
  {
    marker: {
      zid: '3336888',
      name: "Sarah Moore",
    },
    assessment: assessmentMap.exam,
    hours: 5,
    note: '',
    timestamp: new Date(2025, 4, 17, 12, 55),
  },
  {
    marker: {
      zid: '3912293',
      name: "Ann Mueller",
    },
    assessment: assessmentMap.ass2,
    hours: 4,
    note: '',
    timestamp: new Date(2025, 4, 17, 16, 13),
  },
  {
    marker: {
      zid: '3279885',
      name: "Joseph Wilson",
    },
    assessment: assessmentMap.exam,
    hours: 8,
    note: '',
    timestamp: new Date(2025, 4, 17, 19, 18),
  },
  {
    marker: {
      zid: '3181330',
      name: "Mark Hodges",
    },
    assessment: assessmentMap.exam,
    hours: 10,
    note: '',
    timestamp: new Date(2025, 4, 17, 19, 54),
  },
  {
    marker: {
      zid: '3262000',
      name: "Thomas Reed",
    },
    assessment: assessmentMap.ass2,
    hours: 11,
    note: '',
    timestamp: new Date(2025, 4, 17, 19, 54),
  },
  {
    marker: {
      zid: '3262000',
      name: "Thomas Reed",
    },
    assessment: assessmentMap.exam,
    hours: 12,
    note: '',
    timestamp: new Date(2025, 4, 17, 19, 55),
  },
  {
    marker: {
      zid: '3519327',
      name: "Jeff Collins",
    },
    assessment: assessmentMap.exam,
    hours: 14,
    note: '',
    timestamp: new Date(2025, 4, 17, 19, 58),
  },
  {
    marker: {
      zid: '3637493',
      name: "Samuel Pacheco",
    },
    assessment: assessmentMap.ass2,
    hours: 6.5,
    note: '',
    timestamp: new Date(2025, 4, 17, 21, 16),
  },
  {
    marker: {
      zid: '3637493',
      name: "Samuel Pacheco",
    },
    assessment: assessmentMap.exam,
    hours: 7.5,
    note: '',
    timestamp: new Date(2025, 4, 17, 21, 18),
  },
  {
    marker: {
      zid: '3267363',
      name: "Christopher Watson",
    },
    assessment: assessmentMap.exam,
    hours: 10,
    note: '',
    timestamp: new Date(2025, 4, 17, 21, 49),
  },
  {
    marker: {
      zid: '3864051',
      name: "Charles Hays",
    },
    assessment: assessmentMap.ass2,
    hours: 2,
    note: '',
    timestamp: new Date(2025, 4, 18, 1, 55),
  },
  {
    marker: {
      zid: '3040709',
      name: "James Vaughn",
    },
    assessment: assessmentMap.exam,
    hours: 17,
    note: '',
    timestamp: new Date(2025, 4, 18, 2, 30),
  },
  {
    marker: {
      zid: '3641873',
      name: "Barbara Campbell",
    },
    assessment: assessmentMap.exam,
    hours: 6,
    note: 'marked exam Q12A',
    timestamp: new Date(2025, 4, 18, 16, 53),
  },
  {
    marker: {
      zid: '3912293',
      name: "Ann Mueller",
    },
    assessment: assessmentMap.exam,
    hours: 12,
    note: '',
    timestamp: new Date(2025, 4, 19, 11, 35),
  },
  {
    marker: {
      zid: '3126234',
      name: "Matthew Mitchell",
    },
    assessment: assessmentMap.exam,
    hours: 13.5,
    note: '',
    timestamp: new Date(2025, 4, 19, 13, 30),
  },
  {
    marker: {
      zid: '3344153',
      name: "Daniel Galloway",
    },
    assessment: assessmentMap.exam,
    hours: 5,
    note: '',
    timestamp: new Date(2025, 4, 19, 14, 12),
  },
  {
    marker: {
      zid: '3597585',
      name: "Morgan Brown",
    },
    assessment: assessmentMap.exam,
    hours: 8.5,
    note: '',
    timestamp: new Date(2025, 4, 19, 17, 9),
  },
  {
    marker: {
      zid: '3597585',
      name: "Morgan Brown",
    },
    assessment: assessmentMap.ass2,
    hours: 4.5,
    note: '',
    timestamp: new Date(2025, 4, 19, 17, 9),
  },
  {
    marker: {
      zid: '3267736',
      name: "Paul Garrett",
    },
    assessment: assessmentMap.exam,
    hours: 13,
    note: '',
    timestamp: new Date(2025, 4, 20, 22, 22),
  },
  {
    marker: {
      zid: '3519327',
      name: "Jeff Collins",
    },
    assessment: assessmentMap.suppExam,
    hours: 3.5,
    note: '',
    timestamp: new Date(2025, 4, 29, 16, 4),
  },
  {
    marker: {
      zid: '3694782',
      name: "Joy King",
    },
    assessment: assessmentMap.suppExam,
    hours: 0.5,
    note: '',
    timestamp: new Date(2025, 4, 29, 17, 25),
  },
  {
    marker: {
      zid: '3405855',
      name: "Vincent Cruz",
    },
    assessment: assessmentMap.suppExam,
    hours: 0.5,
    note: '',
    timestamp: new Date(2025, 4, 29, 20, 17),
  },
  {
    marker: {
      zid: '3036621',
      name: "Cathy Carr",
    },
    assessment: assessmentMap.suppExam,
    hours: 3,
    note: '',
    timestamp: new Date(2025, 4, 29, 23, 33),
  },
  {
    marker: {
      zid: '3267363',
      name: "Christopher Watson",
    },
    assessment: assessmentMap.suppExam,
    hours: 5.5,
    note: '',
    timestamp: new Date(2025, 4, 30, 0, 26),
  },
  {
    marker: {
      zid: '3912293',
      name: "Ann Mueller",
    },
    assessment: assessmentMap.suppExam,
    hours: 1,
    note: '',
    timestamp: new Date(2025, 4, 31, 1, 31),
  },
  {
    marker: {
      zid: '3597585',
      name: "Morgan Brown",
    },
    assessment: assessmentMap.suppExam,
    hours: 1.5,
    note: '',
    timestamp: new Date(2025, 4, 31, 11, 47),
  },
  {
    marker: {
      zid: '3336888',
      name: "Sarah Moore",
    },
    assessment: assessmentMap.suppExam,
    hours: 1.5,
    note: '',
    timestamp: new Date(2025, 4, 31, 12, 6),
  },
  {
    marker: {
      zid: '3641873',
      name: "Barbara Campbell",
    },
    assessment: assessmentMap.suppExam,
    hours: 1.5,
    note: '',
    timestamp: new Date(2025, 4, 31, 19, 12),
  },
  {
    marker: {
      zid: '3040709',
      name: "James Vaughn",
    },
    assessment: assessmentMap.suppExam,
    hours: 3,
    note: '',
    timestamp: new Date(2025, 4, 31, 20, 2),
  },
];
