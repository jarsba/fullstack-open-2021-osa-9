import { BMIResponseType } from './BMIResponseType';

interface BMIValues {
  weight: number;
  height: number;
}

const parseArguments = (args: Array<string>): BMIValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const between = (target: number, floor: number, ceil: number): boolean => {
  if (target >= floor && target < ceil) {
    return true;
  } else {
    return false;
  }
};


export const calculateBmi = (height: number, weight: number): BMIResponseType => {
  const BMI = (weight) / ((height / 100) ** 2);
  let bmi = '';

  if (between(BMI, 0, 15)) {
    bmi = 'Very severely underweight';
  } else if (between(BMI, 15, 16)) {
    bmi = 'Severely underweight';
  } else if (between(BMI, 16, 18.5)) {
    bmi = 'Underweight';
  } else if (between(BMI, 18.5, 25)) {
    bmi = 'Normal (healthy weight)';
  } else if (between(BMI, 25, 30)) {
    bmi = 'Overweight';
  } else if (between(BMI, 30, 35)) {
    bmi = 'Obese Class I (Moderately obese)';
  } else if (between(BMI, 35, 40)) {
    bmi = 'Obese Class II (Severely obese)';
  } else if (between(BMI, 40, Infinity)) {
    bmi = 'Obese Class III (Very severely obese)';
  }

  return {
    weight: weight,
    height: height,
    bmi: bmi
  };
};

try {
  const { height, weight } = parseArguments(process.argv);
  const bmiResponse = calculateBmi(height, weight);
  console.log(bmiResponse);
} catch (e) {
  let message: string;
  if (e instanceof Error) message = e.message;
  else message = String(e);
  console.log('Error, something bad happened, message: ', message);
}