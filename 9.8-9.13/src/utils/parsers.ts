import { DiagnoseEntry, NewPatientEntry, UnknownDiagnoseEntry, UnknownPatientEntry, Gender } from '../types';

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const parseText = (text: unknown): string => {
  if(!text || !isString(text)) {
    throw new Error('Incorrect or missing text');
  }
  return text;
};

export const parseOptionalText = (text: unknown): string | undefined => {
  if(!text) {
    return undefined;
  }

  if(!isString(text)) {
    throw new Error('Incorrect or missing optional text');
  }

  return text;
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

export const toNewDiagnoseEntry = ({ code, name, latin }: UnknownDiagnoseEntry): DiagnoseEntry => {
  const newEntry: DiagnoseEntry = {
    code: parseText(code),
    name: parseText(name),
    latin: parseOptionalText(latin),
  };

  return newEntry;
};

export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }: UnknownPatientEntry): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseText(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseText(ssn),
    gender: parseGender(gender),
    occupation: parseText(occupation),
  };

  return newEntry;
};