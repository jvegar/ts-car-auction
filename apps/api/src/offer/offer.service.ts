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

  async findAll(
    page: number,
    limit: number,
    search?: string,
    sort?: string,
  ): Promise<[Offer[], number]> {
    const queryBuilder = this.offerModel.find();

    if (search) {
      queryBuilder.where({
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ],
      });
    }

    if (sort) {
      const [sortField, sortOrder] = sort.split(':');
      queryBuilder.sort({
        [sortField]: sortOrder.toUpperCase() === 'DESC' ? -1 : 1,
      });
    }

    const offers = await queryBuilder
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const totalCount = await this.offerModel
      .countDocuments(
        search
          ? {
              $or: [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
              ],
            }
          : {},
      )
      .exec();

    return [offers, totalCount];
  }

  async findOne(id: string): Promise<Offer> {
    return this.offerModel.findById(id).exec();
  }

  async update(id: string, updateOfferDto: UpdateOfferDto): Promise<Offer> {
    return this.offerModel
      .findByIdAndUpdate(id, updateOfferDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Offer> {
    return this.offerModel.findByIdAndDelete(id).exec();
  }
}
