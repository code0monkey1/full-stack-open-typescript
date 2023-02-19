import { Checkbox, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import diagnoses from '../../data';
import { Diagnosis } from '../../types';

interface PropTypes{
  description:string,
  setDescription:(value:any)=>void,
  date:string,
  setDate:(value:any)=>void,
  specialist:string,
  setSpecialist:(value:any)=>void,
  selectedCodes:Array<Diagnosis['code']>,
  setSelectedCodes:(value:any)=>void,
}

function Common({description,setDescription,date,setDate,specialist,setSpecialist,selectedCodes,setSelectedCodes}:PropTypes) {


    const handleChange = (event: SelectChangeEvent<typeof selectedCodes>) => {
      const {
        target: { value },
      } = event;
      setSelectedCodes(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
  };
     
  return (
    <div>
      <br/>
        <div>
          Description:<input  value={description} required={true}
           onChange={({target})=>{setDescription (target.value)}}  name="description" type="text"/>
        </div>
      <br/>
        <div>
          Date:<input value={date} required={true}
          onChange={({target})=>{setDate (target.value)}} name="date" type="date"/>
        </div>
      <br/>
        <div>
          Specialist:
          <input value={specialist} required={true}
          onChange={({target})=>{setSpecialist (target.value)}} name="specialist" type="text"/>
        </div>
      <br/>
      <div >
         <InputLabel id="demo-multiple-name-label">Diagnostic Codes</InputLabel>
        {<Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selectedCodes}
          onChange={handleChange}
          input={<OutlinedInput  label="Tag"/>}
          renderValue={(selected) => selected.join(', ')}
          >
            
        { 
          diagnoses?.map(disease => disease.code).map((code) => (
                  <MenuItem  sx={{height:"auto",overflow:'scroll'}}  key={code} value={code}>
                    <Checkbox checked={selectedCodes.indexOf(code) > -1} />
                    <ListItemText primary={code} />
                  </MenuItem>
                ))
          }
        </Select>
        
        }
      </div>
    </div>
  )
}

export default Common