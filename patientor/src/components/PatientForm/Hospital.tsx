
interface propTypes{
  discharge:{
    date:string,
  criteria:string
  }
  setDate:(value:string)=>void;
  setCriteria:(value:string)=>void;
}

function Hospital({discharge,setDate,setCriteria}:propTypes) {


  return (
    <div>
      <br/>
     <div>Discharge Date:<input value={discharge.date} onChange={({target})=>setDate(target.value)} type='date'/></div> 
     <br/>
     <div>Discharge Criteria: <input value={discharge.criteria} onChange={({target})=>setCriteria(target.value)} type='text'/></div>
    </div>
  )
}

export default Hospital