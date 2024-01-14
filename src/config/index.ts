import { ConfigFactory } from '@nestjs/config';

import { DatebaseEnvironmentVariables, registerDatebaseConfig } from './database.config';

export type EnvironmentVariables = DatebaseEnvironmentVariables ;

export const loadConfigModule: Array<ConfigFactory> = [
  registerDatebaseConfig,
];
