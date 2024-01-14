import { ConfigFactory } from '@nestjs/config';

import { DatebaseEnvironmentVariables, registerDatebaseConfig } from './database.config';
import { OpenaiEnvironmentVariables, registerOpenaiConfig } from './openai.config';

export type EnvironmentVariables = DatebaseEnvironmentVariables & OpenaiEnvironmentVariables ;

export const loadConfigModule: Array<ConfigFactory> = [
  registerDatebaseConfig,
  registerOpenaiConfig,
];
