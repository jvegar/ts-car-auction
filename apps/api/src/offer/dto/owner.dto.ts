import { IsString, IsOptional, IsNumber } from 'class-validator';

export class OwnerDto {
    @IsOptional()
    @IsString()
    name: string | null;

    @IsNumber()
    subascore: number;
} 