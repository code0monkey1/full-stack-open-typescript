
interface PropTypes{
  employerName:string,
  setEmployerName:(value:any)=>void,
  sickLeave:{startDate:string,endDate:string},
  setSickLeave:(value:{startDate:string,endDate:string})=>void
}

const OccupationalHealthcare=({employerName,setEmployerName,sickLeave,setSickLeave}:PropTypes)=> {
   

  return (
       <>
         <div> 
          <br/>
          Employer : <input type='text' value={employerName} onChange={({target})=>setEmployerName(target.value)}/>
         </div>
        <br/>
          <fieldset>

            <legend>Sick Leave</legend>
             <br/>
            <span>StartDate : </span> 
            <input type="date" 
            value={sickLeave?.startDate} 
            onChange={({target})=>setSickLeave({...sickLeave,startDate:target.value})}/>
            <hr/>
            <span>EndDate : </span> 
            <input type="date" 
            value={sickLeave?.endDate} 
            onChange={({target})=>setSickLeave({...sickLeave,endDate:target.value})}/>
            <br/>
          </fieldset>
       </>
  )
}

export default OccupationalHealthcare