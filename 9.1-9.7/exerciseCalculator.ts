
export interface exerciseResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}


export interface exerciseInput {
  target: number;
  hours: Array<number>;
}


const parseArguments = (args: Array<string>): exerciseInput => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const target = Number(args[2]);
  const hoursArray = args.slice(3);
  const hours = hoursArray.map(Number);
  const hoursAreNumbers = hours.every(n => typeof n === 'number');

  if (!isNaN(target) && Array.isArray(hours) && hoursAreNumbers) {
    return {
      target: target,
      hours: hours,
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};



export const calculateExercise = (target: number, hours: Array<number>): exerciseResult => {

  const average = hours.length > 0 ? hours.reduce((sum, x) => sum + x) / hours.length : 0;
  const success = average > target;
  const ratingMetric = average / target;
  let rating = 1;
  let ratingDescription = 'poor job';

  if (ratingMetric >= 1) {
    rating = 3;
    ratingDescription = 'great job';
  } else if (0.8 <= ratingMetric && ratingMetric < 1) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  }

  return {
    periodLength: hours.length,
    trainingDays: hours.filter(n => n > 0).length,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  };
  
};

try {
  const { target, hours } = parseArguments(process.argv);
  const result = calculateExercise(target, hours);
  console.log(result);
} catch (e) {
  let message: string;
  if (e instanceof Error) message = e.message;
  else message = String(e);

  console.log('Error, something bad happened, message: ', message);
}