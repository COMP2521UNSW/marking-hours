
CREATE TABLE Submissions (
	id            INTEGER PRIMARY KEY,
	zid           TEXT NOT NULL,
	assessment_id TEXT NOT NULL,
	hours         REAL NOT NULL,
	note          TEXT,
	timestamp     TIMESTAMP NOT NULL DEFAULT current_timestamp,

	UNIQUE (zid, assessment_id, timestamp)
);
