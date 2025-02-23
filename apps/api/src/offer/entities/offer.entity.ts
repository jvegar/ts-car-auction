import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { StatsDto } from '../dto/stats.dto';
import { OwnerDto } from '../dto/owner.dto';

@Schema()
export class Offer extends Document {
    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    group_id: string;

    @Prop({ required: true })
    state: string;

    @Prop({ required: true })
    offer_type: string;

    @Prop({ required: true })
    image_xs: string;

    @Prop({ required: true })
    image_md: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    model_year: string;

    @Prop({ required: true })
    is_financing: boolean;

    @Prop({ type: Number, default: null })
    mileage: number | null;

    @Prop({ required: true })
    base_price: number;

    @Prop({ type: Number, default: null })
    win_now: number | null;

    @Prop({ type: String, default: null })
    live_tag: string | null;

    @Prop({ required: true })
    close_date: string;

    @Prop({ type: Object, required: true })
    readable_close_date: {
        date: string;
        time: string;
        meridian: string;
    };

    @Prop({ type: Object, required: true })
    stats: StatsDto;

    @Prop({ type: Object, required: true })
    owner: OwnerDto;

    @Prop({ required: true })
    with_virtual_inspection: boolean;

    @Prop({ required: true })
    inspector_is_online: boolean;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
