import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupService {
  constructor(@InjectModel(Group.name) private groupModel: Model<Group>) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const createdGroup = new this.groupModel(createGroupDto);
    return createdGroup.save();
  }

  async findAll(page: number = 1, limit: number = 10): Promise<Group[]> {
    const skip = (page - 1) * limit; // Calculate the number of documents to skip
    return this.groupModel.find()
        .skip(skip)
        .limit(limit)
        .exec();
  }

  async findOne(id: string): Promise<Group> {
    return this.groupModel.findById(id).exec();
  }

  async update(id: string, updateOfferGroupDto: UpdateGroupDto): Promise<Group> {
    return this.groupModel.findByIdAndUpdate(id, updateOfferGroupDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Group> {
    return this.groupModel.findByIdAndDelete(id).exec();
  }
}
