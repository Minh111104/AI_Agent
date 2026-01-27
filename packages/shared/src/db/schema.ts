export type JobStatus =
  | "New"
  | "Shortlisted"
  | "Drafting"
  | "ReadyForReview"
  | "Applied"
  | "Interviewing"
  | "Rejected"
  | "Archived";

export interface JobPosting {
  id: string;
  source: string;
  sourceJobId: string;
  company: string;
  title: string;
  level: "intern" | "newgrad" | "junior" | "mid" | "senior" | "unknown";
  location: string | null;
  remoteMode: "onsite" | "hybrid" | "remote" | "unknown";
  visaSponsorship: "yes" | "no" | "unknown";
  descriptionRaw: string;
  descriptionStructured?: Record<string, unknown>;
  applyUrl: string;
  datePosted?: string;
  dateDiscovered: string;
  status: JobStatus;
  fitScore?: number;
  fitReasoning?: string[];
  risks?: string[];
  notes?: string;
  rawSnapshotUrl?: string;
}

export interface Application {
  id: string;
  jobId: string;
  resumeVersionId?: string;
  coverLetterId?: string;
  qaAnswersId?: string;
  submissionDate?: string;
  currentStage?: string;
  nextFollowupDate?: string;
  contact?: Record<string, unknown>;
  activityLog?: Record<string, unknown>[];
}

export interface ResumeVersion {
  id: string;
  baseResumeHash: string;
  targetRole: string;
  tailoredBullets?: string[];
  fileUrl?: string;
}

export interface FollowUp {
  id: string;
  jobId: string;
  followupNumber: number;
  scheduledFor: string;
  status: "pending" | "sent" | "skipped";
  draftMessage?: string;
}
