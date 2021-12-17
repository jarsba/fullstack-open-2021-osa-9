export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export type SickLeave = {
  startDate: string;
  endDate: string;
} | undefined;

export type Discharge = {
  date: string;
  criteria: string;
};

export type UnknownDiagnoseEntry = { code: unknown, name: unknown, latin?: unknown};

export type DiagnoseCodes = Array<DiagnoseEntry['code']>;

export enum EntryType {
  "HealthCheck",
  "OccupationalHealthcare",
  "Hospital"
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: DiagnoseCodes;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcare extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string,
  sickLeave?: {
    startDate: string,
    endDate: string
  }
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string,
    criteria: string
  },
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcare
  | HealthCheckEntry;

interface NewBaseEntry {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: DiagnoseCodes;
}

interface NewHealthCheckEntry extends NewBaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface NewOccupationalHealthcare extends NewBaseEntry {
  type: "OccupationalHealthcare";
  employerName: string,
  sickLeave?: {
    startDate: string,
    endDate: string
  }
}

interface NewHospitalEntry extends NewBaseEntry {
  type: "Hospital";
  discharge: {
    date: string,
    criteria: string
  },
}

export type NewEntry =
  | NewHospitalEntry
  | NewOccupationalHealthcare
  | NewHealthCheckEntry;


interface NewUnknownBaseEntry {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: Array<unknown>;
}

interface NewUnknownHealthCheckEntry extends NewUnknownBaseEntry {
  type: "HealthCheck";
  healthCheckRating: unknown;
}

interface NewUnknownOccupationalHealthcare extends NewUnknownBaseEntry {
  type: "OccupationalHealthcare";
  employerName: unknown,
  sickLeave?: {
    startDate: unknown,
    endDate: unknown
  }
}

interface NewUnknownHospitalEntry extends NewUnknownBaseEntry {
  type: "Hospital";
  discharge: {
    date: unknown,
    criteria: unknown
  },
}
  
export type NewUnknownEntry =
  | NewUnknownHospitalEntry
  | NewUnknownOccupationalHealthcare
  | NewUnknownHealthCheckEntry;
  

export interface Patient {
  id: string;
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[];
}

export type NewPatient = Omit<Patient, 'id' | 'entries' >; 

export type UnknownPatient = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown }; 

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;