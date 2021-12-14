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

export type UnknownDiagnoseEntry = { code: unknown, name: unknown, latin?: unknown};

export interface PatientEntry {
  id: string;
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string
}

export type NewPatientEntry = Omit<PatientEntry, 'id'>; 

export type UnknownPatientEntry = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown }; 

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;