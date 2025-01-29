import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCustomerDto{
    @IsOptional()
    @IsString()
    @MaxLength(50)
    identification?: string;

    @IsString()
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @MaxLength(150)
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(180)
    credit_card_holder_name?: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    gender?: string;

    @IsOptional()
    birthdate?: Date;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    country?: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    city?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    address?: string;
}