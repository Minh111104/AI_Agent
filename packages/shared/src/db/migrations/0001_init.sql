-- Core schema for autonomous job application agent
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- job postings
CREATE TABLE IF NOT EXISTS job_postings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL,
  source_job_id TEXT NOT NULL,
  company TEXT NOT NULL,
  title TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('intern','newgrad','junior','mid','senior','unknown')),
  location TEXT,
  remote_mode TEXT NOT NULL DEFAULT 'unknown' CHECK (remote_mode IN ('onsite','hybrid','remote','unknown')),
  visa_sponsorship TEXT NOT NULL DEFAULT 'unknown' CHECK (visa_sponsorship IN ('yes','no','unknown')),
  description_raw TEXT NOT NULL,
  description_structured JSONB,
  apply_url TEXT NOT NULL,
  date_posted TIMESTAMPTZ,
  date_discovered TIMESTAMPTZ NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New','Shortlisted','Drafting','ReadyForReview','Applied','Interviewing','Rejected','Archived')),
  fit_score INTEGER,
  fit_reasoning JSONB,
  risks JSONB,
  notes TEXT,
  raw_snapshot_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (source, source_job_id)
);

CREATE INDEX IF NOT EXISTS job_postings_status_score_idx ON job_postings (status, fit_score DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS job_postings_desc_structured_gin ON job_postings USING GIN (description_structured);

-- resume versions
CREATE TABLE IF NOT EXISTS resume_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  base_resume_hash TEXT NOT NULL,
  target_role TEXT NOT NULL,
  tailored_bullets JSONB,
  file_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- applications
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES job_postings(id) ON DELETE CASCADE,
  resume_version_id UUID REFERENCES resume_versions(id) ON DELETE SET NULL,
  cover_letter_id TEXT,
  qa_answers_id TEXT,
  submission_date TIMESTAMPTZ,
  current_stage TEXT,
  next_followup_date DATE,
  contact JSONB,
  activity_log JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- followups
CREATE TABLE IF NOT EXISTS followups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES job_postings(id) ON DELETE CASCADE,
  followup_number INTEGER NOT NULL,
  scheduled_for DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','sent','skipped')),
  draft_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (job_id, followup_number)
);

-- triggers
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS job_postings_updated_at ON job_postings;
CREATE TRIGGER job_postings_updated_at
BEFORE UPDATE ON job_postings
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
