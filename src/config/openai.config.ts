import { registerAs } from "@nestjs/config";
import { plainToInstance } from "class-transformer";
import { IsString, validateSync } from "class-validator";

export interface OpenaiEnvironmentVariables {
    OPENAI_API_KEY: string;
}

class OpenaiEnvironmentVariablesValidator implements OpenaiEnvironmentVariables {
    @IsString()
    OPENAI_API_KEY: string;
}

export const registerOpenaiConfig = registerAs<OpenaiEnvironmentVariables>('openai', () => {
    const validatedConfig = plainToInstance(OpenaiEnvironmentVariablesValidator, process.env, {
        enableImplicitConversion: false,
    });

    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
    });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }

    return validatedConfig;
})