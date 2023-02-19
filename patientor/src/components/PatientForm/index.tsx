import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import patients from '../../services/patients';
import { Diagnosis, FormTypes, HealthCheckRating, NonSensitiveEntries, Patient } from '../../types';
import Common from './Common';
import HealthCheck from './HealthCheck';
import Hospital from './Hospital';
import OccupationalHealthcare from './OccupationalHealthcare';
type entryTypes='HealthCheck' | 'OccupationalHealthcare' | 'Hospital'

interface propTypes{
  date:string,
  criteria:string
}

const PatientForm =({setPatient}:{setPatient:Dispatch<SetStateAction<Patient | undefined>>})=>{
    const {id} = useParams()  

      //common
     const [description,setDescription]=useState('')
     const [date,setDate]=useState('')
     const [specialist,setSpecialist]=useState('')
     const [diagnosisCodes,setDiagnosisCodes]= useState<Array<Diagnosis['code']>>([])

      //healthcheckEntry
      const [type,setType]=useState<entryTypes>('HealthCheck')
      
      const [healthCheckRating,setHealthCheckRating]= useState<HealthCheckRating>(HealthCheckRating.CriticalRisk)

      const [employerName,setEmployerName]=useState('')
      const [sickLeave,setSickLeave]=useState({startDate:'', endDate:'' })

       const [discharge,setDischarge] =useState<propTypes>({
          date:'',
          criteria:''
        })
      const setDischargeDate = (date:string) =>{
          setDischarge({...discharge,date})
        }
      
      const setCriteria = (criteria:string) =>{
          setDischarge({...discharge,criteria})
        }
      
      
  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as entryTypes);
  };

  const submitEntry=async(event:SyntheticEvent)=>{
    event.preventDefault();

     const result:NonSensitiveEntries={
      date,
      description,
      discharge,
      employerName,
      healthCheckRating,
      specialist,
      type,
      diagnosisCodes,
      sickLeave,
     }

     console.log("result",JSON.stringify(result,null,2));
    try{

      const entry=await patients.createPatientEntry(id as string,result)
      
      console.log("Data received is",JSON.stringify(entry,null,2))
       
       setPatient(( patient )=> {

            const pat = patient as Patient
            return  {...pat,entries:pat?.entries.concat(entry)}
      
      })

    }catch(err){
      
      let errMsg="Error : "
       if(err instanceof Error)
           errMsg+=err.message
          
         console.error(errMsg)
  
    }  
 
  }
   
  console.log("The type is ",type)
  
  return(
    <div style={{border:"2px dashed black",marginTop:"1rem",marginBottom:"1rem",padding:"2rem"}}>
      
      <form onSubmit={submitEntry}>
       
       <label>Type : </label>
         <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Age"
          onChange={handleChange}
        >
          {
          Object.values(FormTypes)
          .map( type =>  <MenuItem key={type}  value={type}>{type}</MenuItem>)
          }
         
        </Select>
        <br/>
        <Common
         description={description}
         setDescription={setDescription}
         date={date}
         setDate={setDate}
         specialist={specialist}
         setSpecialist={setSpecialist}
         selectedCodes={diagnosisCodes}
         setSelectedCodes={setDiagnosisCodes}
        />
        {type==="HealthCheck"?<HealthCheck 
        health={healthCheckRating} 
        setHealth={setHealthCheckRating}/>:""}
        {type==="OccupationalHealthcare"?
          <OccupationalHealthcare 
          employerName={employerName}
          setEmployerName={setEmployerName}
          sickLeave={sickLeave}
          setSickLeave={setSickLeave}
          
          />:""
          }
        {type==="Hospital"?<Hospital discharge={discharge} setDate={setDischargeDate} setCriteria={setCriteria}/>:""}
       <br/>
        <Button variant="contained" color="secondary" type="submit">Submit</Button>
      </form>
    </div>
  )

}

export default PatientForm