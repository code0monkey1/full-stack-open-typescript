import axios from "axios";

import { Entry, NonSensitiveEntries, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const get=async(id: string|undefined):Promise<Patient|undefined>=>{
  const {data} = await axios.get<Patient>(`${apiBaseUrl}/patients/`+id)
  return data;
}

const createPatientEntry=async(id:string,entry:NonSensitiveEntries)=>{
   const {data} = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`,entry)
   return data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, create,get,createPatientEntry
};

