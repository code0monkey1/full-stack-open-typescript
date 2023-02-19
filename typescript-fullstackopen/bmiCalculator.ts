
export interface IPropTypes{
  height: number,
  weight: number
}

// export const parseValues=(args:Array<string>):IPropTypes=>{
    
//    if (args.length!==4)
//      throw new Error("args value should be 4");
//    if ( isNaN(Number(args[2])) || isNaN(Number(args[3])))
//      throw new Error("args should be be a number");
    
//    return {
//     height:Number(args[2]),
//     weight:Number(args[3])
//    };

// };

export const calculateBmi=( height:number, weight:number):string=>{

  const bmi = (weight/(height*height))*(10000);
   
    if (bmi<18.5)
      return "underweight";
    else if (bmi>=18.5 && bmi<25)
       return "Normal (healthy weight)";
    else if (bmi>=25 && bmi<30)
        return "Overweight";
  
    return "Obese";

};


// try{
//    const {height,weight} = parseValues(process.argv);
//    console.log(calculateBmi(height,weight));
// }
// catch(error:unknown){
//   let errorMessage = "Something is wrong with the inputs";

//   if (error instanceof Error)
//     errorMessage+=` : ${error.message}`;
   
//   console.log(errorMessage);

// }