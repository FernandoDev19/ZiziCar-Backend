import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProviderDto{
    @IsString()
    @Transform(({value}) => value.trim)
    @IsNotEmpty()
    nit: string;

    @IsString()
    @Transform(({value}) => value.trim)
    @IsNotEmpty()
    company_name: string;
}