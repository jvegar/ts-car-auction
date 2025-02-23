import { IsNumber, IsOptional } from 'class-validator';

export class StatsDto {
    @IsNumber()
    views: number;

    @IsNumber()
    interested: number;

    @IsNumber()
    participants: number;

    @IsOptional()
    @IsNumber()
    negotiations: number | null;
} 