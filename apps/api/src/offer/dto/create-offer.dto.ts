// apps/api/src/offer/dto/create-offer.dto.ts
import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { StatsDto } from './stats.dto';
import { OwnerDto } from './owner.dto';

export class CreateOfferDto {
    @IsString()
    id: string;

    @IsString()
    group_id: string;

    @IsString()
    state: string;

    @IsString()
    offer_type: string;

    @IsString()
    image_xs: string;

    @IsString()
    image_md: string;

    @IsString()
    name: string;

    @IsString()
    model_year: string;

    @IsBoolean()
    is_financing: boolean;

    @IsOptional()
    @IsNumber()
    mileage: number | null;

    @IsNumber()
    base_price: number;

    @IsOptional()
    @IsNumber()
    win_now: number | null;

    @IsOptional()
    @IsString()
    live_tag: string | null;

    @IsString()
    close_date: string;

    readable_close_date: {
        date: string;
        time: string;
        meridian: string;
    };

    stats: StatsDto;

    owner: OwnerDto;

    @IsBoolean()
    with_virtual_inspection: boolean;

    @IsBoolean()
    inspector_is_online: boolean;
}