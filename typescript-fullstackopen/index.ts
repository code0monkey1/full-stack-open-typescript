import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json())

app.get('/hello',(_req, res) => {
  
    res.send("Hello Full Stack!");
});

app.post('/bmi',(req, res) => {

 try{
 
   const {height,weight} = req.query;

    if ( isNaN(Number(height)) || isNaN(Number(weight)))
     throw new Error("args should be be a number");
   
   const bmi =calculateBmi(Number(height),Number(weight));
   
   res.send({
    height,
    weight,
    bmi
   });
   
}
catch(error:unknown){

  res.status(404).json({
  error: "malformatted parameters",
});

}
});

app.post('/exercise',(req,res)=>{


  try{

   // verify that the daily exercise exists and target exists
   
   //eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!req.body['daily_exercises'] || !req.body['target'])
     throw new Error("parameters missing");
  
   //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const {daily_exercises,target}=req.body;
      
  //eslint-disable-next-line  @typescript-eslint/no-unsafe-argument
  if (isNaN(target) || !(daily_exercises instanceof Array<number>))
       throw new Error("malformatted parameters");

   daily_exercises.unshift(target)   ;
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result=calculateExercises(daily_exercises);

  res.json(result) ;

  }catch(error:unknown){
    
    let errorMessage='';
    
    if (error instanceof Error)
        errorMessage+=error.message;

    res.json({error:errorMessage});
    
  }

});

const PORT =process.env.PORT || 3000;

app.listen(PORT,() => {
  console.log(`Listening to port ${PORT}`);
});

