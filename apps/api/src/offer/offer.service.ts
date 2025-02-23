import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Offer } from './entities/offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

@Injectable()
export class OfferService {
    constructor(@InjectModel(Offer.name) private offerModel: Model<Offer>) {}

    async create(createOfferDto: CreateOfferDto): Promise<Offer> {
        const newOffer = new this.offerModel(createOfferDto);
        return newOffer.save();
    }

    async findAll(page: number = 1, limit: number = 10): Promise<Offer[]> {
        const skip = (page - 1) * limit; // Calculate the number of documents to skip
        return this.offerModel.find().skip(skip).limit(limit).exec();
    }

    async findOne(id: string): Promise<Offer> {
        return this.offerModel.findById(id).exec();
    }

    async update(id: string, updateOfferDto: UpdateOfferDto): Promise<Offer> {
        return this.offerModel.findByIdAndUpdate(id, updateOfferDto, { new: true }).exec();
    }

    async remove(id: string): Promise<Offer> {
        return this.offerModel.findByIdAndDelete(id).exec();
    }
}
