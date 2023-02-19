

import { HealthCheckRating } from '../../types'
interface propTypes{
  health:string,
  setHealth:(val:any)=>void,
}

const HealthCheck=({health,setHealth}:propTypes)=>{
    
   console.log(Object.entries(HealthCheckRating))
   
   const HEALTH_LABEL=0
   const HEALTH_VALUE=1

  return (
    
    <div>
      <br/>
     <fieldset>
        <legend>Health Check Rating:</legend>
        
        {
          Object.entries(HealthCheckRating).map(item=> ( 
          <div key={item[HEALTH_LABEL]}>
           
            <input
             onChange={({target})=>{setHealth(target.value)}}
             type="radio" 
             id={item[HEALTH_LABEL]} 
             name="item"
             value={item[HEALTH_VALUE]}
             checked={item[HEALTH_VALUE]===health}
             required={true}
             />
             
            <label>{item[HEALTH_LABEL]}</label>
            
          </div>))
        }
      
    </fieldset>

    </div>
  )
}

export default HealthCheck