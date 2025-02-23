import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Offer } from 'src/offer/entities/offer.entity'; // Adjust the import path as necessary

@Schema()
export class Group extends Document {
    @Prop({ type: String, required: false })
    owner: string | null;

    @Prop({ type: String, required: true })
    date: string;

    @Prop({ type: String, required: true })
    time: string;

    @Prop({ type: String, required: false })
    url: string | null;

    @Prop({ type: String, required: true })
    group_navigation_url: string;

    @Prop({ type: Number, required: true })
    offers_count: number;

    @Prop({ type: String, required: false })
    status: string | null;

    @Prop({ type: [Offer], required: true }) // Assuming Offer is a Mongoose schema
    offers: Offer[];

    @Prop({ type: Boolean, required: true })
    with_virtual_inspection: boolean;

    @Prop({ type: Boolean, required: true })
    inspector_is_online: boolean;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
