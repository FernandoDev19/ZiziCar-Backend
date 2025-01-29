import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Role } from "src/common/enums/role.enum";

export class CreateUserDto{
    @IsString()
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @MaxLength(50)
    username: string;

    @IsOptional()
    @IsEmail()
    @MaxLength(200)
    email?: string;

    @IsString()
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @MaxLength(20)
    phone: string;

    @IsString()
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(50)
    password: string;

    @IsOptional()
    @IsString()
    provider_id?: string;

    @IsOptional()
    @IsString()
    customer_id?: string;

    @IsOptional()
    @IsString()
    employee_id?: string;

    @IsNumber()
    role_id: number;
}