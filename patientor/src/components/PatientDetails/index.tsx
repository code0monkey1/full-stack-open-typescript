import AltRouteIcon from '@mui/icons-material/AltRoute';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import diagnostics from '../../services/diagnosis';
import patients from '../../services/patients';
import { Diagnosis, Entry, Gender, Patient } from '../../types';
import PatientForm from '../PatientForm';

const PatientDetails = () => {
   
  const {id} = useParams() 

  const [patient,setPatient]=useState<Patient>() 
  
 useEffect(()=>{
     
    patients.get(id)
    .then(patient => setPatient(patient))
    .catch(err =>{
         
      console.error(err.message);
    })

 },[id])


  return (
    <>
    <PatientForm setPatient={setPatient}/>
    <>
    
    </>
    {patient?<div>
      
          <h2>{patient.name}{'         '}{patient.gender===Gender.Male
          ?<MaleIcon/>:patient.gender===Gender.Female?<FemaleIcon/>:<AltRouteIcon/>}</h2>
          <h3>ssh: {patient.ssn}</h3>
          <h3>occupation: {patient.occupation}</h3>
        
          <h2>Entries :</h2>
          <ul>
          {
            patient.entries?.map(entry =>
                    <li key={entry.id} style={{border:"2px black solid",padding:4,borderRadius:"2rem",marginBottom:"2rem",listStyleType:"none"}}>
                      {<GetCommonEntry entry={entry}/>}
                      {<GetEntry entry={entry}/>}
                      </li>)
          }
          </ul>
      
      </div>:""
    }
    </>
  )
}

const GetCommonEntry=({entry}:{entry:Entry}) :JSX.Element=> {
 
  const [diagnosis,setDiagnosis] = useState<Diagnosis[]>()

  useEffect(()=>{
        diagnostics
        .getDiagnosis()
        .then(d => {       
           console.log("Diagnoses",d)

            return setDiagnosis(d)
          }
            
            )
        .catch(err =>{
          console.error(err.message)
        })
  
  },[entry])
  
  const getExplanation=(code:string)=>{
      
     const disease = diagnosis?.find( d => d.code===code)

     return disease?.name
  }

  return(<>
  <h4>Date:{entry.date}</h4> 
  <h4>Description:{entry.description}</h4>
  {entry.diagnosisCodes?
  <h4>Codes:<ul>{entry?.diagnosisCodes?.map(code =><li key={code}>{code}:{getExplanation(code)}</li>)}</ul></h4>:""
  }
  <h4>Specialist:{entry.specialist}</h4>
  <h4>Type:{entry.type}</h4>
  </>)
  
}

const GetEntry=({entry}:{entry:Entry}):JSX.Element=>{
    
  const assertNever = (data:unknown):never =>{
     
     throw Error("This should never be called"+data)
  }
  
  switch(entry.type){
     
    case 'HealthCheck':
      return <div>
        {<h4>HealthCheck Rating : {entry.healthCheckRating}</h4>}
      </div>
    case 'Hospital':
      return <div>
        {<h4>Date:{entry.discharge.date}</h4>}
        {<h4>Criteria:{entry.discharge.criteria}</h4>}
        </div>
    case 'OccupationalHealthcare':
      return <div>
         {<h4>Employer : {entry.employerName}</h4>}
         {<h4>Start Date:{entry.sickLeave?.startDate}</h4>}
        {<h4>End Date:{entry.sickLeave?.endDate}</h4>}
      </div>
    default:
      return assertNever(entry)

  }
  
}

export default PatientDetails