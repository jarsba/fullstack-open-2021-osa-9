import { DiagnoseEntry, NewPatient, UnknownDiagnoseEntry, UnknownPatient, Gender, NewUnknownEntry, NewEntry, DiagnoseCodes, HealthCheckRating, EntryType, SickLeave, Discharge } from '../types';

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const isNumber = (number: unknown): number is number => {
  return typeof number === 'number' || number instanceof Number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(rating);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEntryType = (entryType: any): entryType is EntryType => {
  const isEntryType = entryType !== null && isString(entryType) && Object.values(EntryType).includes(entryType);
  return isEntryType;
};

export const parseText = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing text');
  }
  return text;
};

export const parseNumber = (number: unknown): number => {
  if (!number || !isNumber(number)) {
    throw new Error('Incorrect or missing number');
  }
  return number;
};

export const parseOptionalText = (text: unknown): string | undefined => {
  if (!text) {
    return undefined;
  }

  if (!isString(text)) {
    throw new Error('Incorrect or missing optional text');
  }

  return text;
};

export const parseEntryType = (entryType: unknown): EntryType => {
  if (!isEntryType(entryType)) {
    throw new Error('Incorrect or missing entry type ' + entryType);
  }
  return entryType;
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};


export const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

export const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);

  }
  return healthCheckRating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};


export const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isSickLeave = (sickLeave: any): sickLeave is SickLeave => {
  return sickLeave !== null && typeof sickLeave === 'object' && "startDate" in sickLeave && "endDate" in sickLeave && isString(sickLeave.startDate) && isString(sickLeave.endDate);
};

export const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave) {
    return undefined;
  }
  if (!isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sick leave: ' + sickLeave);
  }
  return sickLeave;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isDischarge = (discharge: any): discharge is Discharge => {
  return discharge !== null && typeof discharge === 'object' && "date" in discharge && "criteria" in discharge && isString(discharge.date) && isString(discharge.criteria);
};

export const parseDischarge = (discharge: unknown): Discharge => {
  if (!isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge: ' + discharge);
  }
  return discharge;
};

export const parseDiagnoseCodes = (unknownDiagnoseEntries: Array<unknown> | undefined): DiagnoseCodes | undefined => {
  if (unknownDiagnoseEntries) {
    const diagnoseCodes = unknownDiagnoseEntries.map(n => parseText(n));
    return diagnoseCodes;
  }
  return undefined;
};

export const toNewDiagnoseEntry = ({ code, name, latin }: UnknownDiagnoseEntry): DiagnoseEntry => {
  const newDiagnose: DiagnoseEntry = {
    code: parseText(code),
    name: parseText(name),
    latin: parseOptionalText(latin),
  };

  return newDiagnose;
};

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: UnknownPatient): NewPatient => {
  const newPatient: NewPatient = {
    name: parseText(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseText(ssn),
    gender: parseGender(gender),
    occupation: parseText(occupation),
  };

  return newPatient;
};

export const toNewEntry = (entry: NewUnknownEntry): NewEntry => {

  let newEntry;

  switch (entry.type) {
    case "HealthCheck":
      newEntry = {
        description: parseText(entry.description),
        date: parseDate(entry.date),
        specialist: parseText(entry.specialist),
        diagnosisCodes: parseDiagnoseCodes(entry.diagnosisCodes),
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
        type: entry.type
      };
      return newEntry;
    case "OccupationalHealthcare":
      newEntry = {
        description: parseText(entry.description),
        date: parseDate(entry.date),
        specialist: parseText(entry.specialist),
        diagnosisCodes: parseDiagnoseCodes(entry.diagnosisCodes),
        employerName: parseText(entry.employerName),
        sickLeave: parseSickLeave(entry.sickLeave),
        type: entry.type
      };
      return newEntry;
    case "Hospital":
      newEntry = {
        description: parseText(entry.description),
        date: parseDate(entry.date),
        specialist: parseText(entry.specialist),
        diagnosisCodes: parseDiagnoseCodes(entry.diagnosisCodes),
        discharge: parseDischarge(entry.discharge),
        type: entry.type
      };
      return newEntry;
    default:
      return assertNever(entry);
  }
};

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};