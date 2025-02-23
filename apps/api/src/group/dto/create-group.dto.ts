import { Offer } from "src/offer/entities/offer.entity";
import { IsString, IsOptional, IsBoolean, IsNumber, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGroupDto {
    @IsOptional()
    @IsString()
    owner: string | null;

    @IsString()
    date: string;

    @IsString()
    time: string;

    @IsOptional()
    @IsString()
    url: string | null;

    @IsString()
    group_navigation_url: string;

    @IsNumber()
    offers_count: number;

    @IsOptional()
    @IsString()
    status: string | null;

    @IsArray()
    @Type(() => Offer) // Assuming Offer is a class
    offers: Offer[];

    @IsBoolean()
    with_virtual_inspection: boolean;

    @IsBoolean()
    inspector_is_online: boolean;
}
