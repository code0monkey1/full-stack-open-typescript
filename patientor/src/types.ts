export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries:Entry[]
}

interface BaseEntry{
    id:string,
    description: string;
    date: string;
    specialist:string;
    diagnosisCodes?: Array<Diagnosis['code']>

}

export enum HealthCheckRating{
  Healthy="0",
  LowRisk="1",
  HighRisk = "2",
  CriticalRisk= "3"
}


 interface HealthCheckEntry extends BaseEntry{
   type: 'HealthCheck';
   healthCheckRating: HealthCheckRating
}

 interface OccupationalHealthcareEntry extends BaseEntry{
   type:"OccupationalHealthcare";
   employerName:string;
   sickLeave?: {
    "startDate":string,
    "endDate":string
   }

}
 interface HospitalEntry extends BaseEntry{
  type:"Hospital";
  discharge:{
    "date":string,
    "criteria":string
  }
}
export enum FormTypes{
    HealthCheckEntry="HealthCheck",
    OccupationalHealthcareEntry="OccupationalHealthcare",
    HospitalEntry="Hospital"
}
export type Entry = HealthCheckEntry|OccupationalHealthcareEntry|HospitalEntry;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property

export type NonSensitiveEntries =UnionOmit<Entry, 'id'>;

export type PatientFormValues = Omit<Patient, "id" | "entries">;