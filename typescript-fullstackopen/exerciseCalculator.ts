interface IResult{ 

  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average:number

 }

//  const isValidNumbersArray=(array:string[]) =>{
     
//      for (const num of array)
//         if (isNaN(Number(num)))return false;

//      return true;
//  };

//  const parseInput = (args:Array<string>):Array<number> => {

//   if (args.length<3)
//     throw new Error(`Invalid input length: ${args.length}`);

//   const numbersArray=args.slice(2,);

//   if (!isValidNumbersArray(numbersArray))
//        throw new Error(`Not a numbers only Array`);

//    return numbersArray.map(number_string => Number(number_string));
  
//  };

 export const calculateExercises = (exercise:Array<number>):IResult=>{
    
     const exerciseDays=exercise.slice(1);
     
     const target=exercise[0];
     
    return { 
      periodLength: exerciseDays.length,
      trainingDays: exerciseDays.filter(hours => hours>0).length,
      success: exerciseDays.reduce((acc, exercise) => exercise>=target&&acc ,true),
      rating: exerciseDays.reduce((acc, exercise) =>acc+exercise,0)>10?2:3,
      ratingDescription: 'not too bad but could be better',
      target,
      average: exerciseDays.reduce((acc, exercise) =>acc+exercise,0)/exerciseDays.length*1.0
  };
  
};

// try{

//   const numbersArray = parseInput(process.argv);

//   console.log( calculateExercises(numbersArray));

// }catch(error:unknown){

//   let errorMessage="Error occurred : ";

//   if (error instanceof Error){
//         errorMessage+=error.message;
//   }

//   console.log(errorMessage);
// }