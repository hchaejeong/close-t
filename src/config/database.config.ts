import { registerAs } from '@nestjs/config';
import { validateSync, IsString, IsInt, Min, Max } from 'class-validator';
import { Type, plainToInstance } from 'class-transformer';

export interface DatebaseEnvironmentVariables {
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_NAME: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
}

class DatebaseEnvironmentVariablesValidator implements DatebaseEnvironmentVariables {
  @IsString()
  DATABASE_HOST: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(65535)
  DATABASE_PORT: number;

  @IsString()
  DATABASE_NAME: string;

  @IsString()
  DATABASE_USERNAME: string;

  @IsString()
  DATABASE_PASSWORD: string;
}

export const registerDatebaseConfig = registerAs<DatebaseEnvironmentVariables>('database', () => {
  const validateConfig = plainToInstance(DatebaseEnvironmentVariablesValidator, process.env, {
    enableImplicitConversion: false,
  });

  const errors = validateSync(validateConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validateConfig;
});
