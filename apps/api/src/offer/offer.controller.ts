import { Controller, Get, Query, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';

@Controller('offers')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post()
  create(@Body() createOfferDto: CreateOfferDto): Promise<Offer> {
    return this.offerService.create(createOfferDto);
  }

  @Get()
  async findAll(@Query('page') page: string, @Query('limit') limit: string): Promise<{ offers: Offer[], totalCount: number, currentPage: number, totalPages: number }> {
    const pageNumber = parseInt(page, 10) || 1; // Default to page 1
    const limitNumber = parseInt(limit, 10) || 10; // Default to limit 10

    const [offers, totalCount] = await this.offerService.findAll(pageNumber, limitNumber);
    const totalPages = Math.ceil(totalCount / limitNumber);

    return {
        offers,
        totalCount,
        currentPage: pageNumber,
        totalPages,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Offer> {
    return this.offerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto): Promise<Offer> {
    return this.offerService.update(id, updateOfferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Offer> {
    return this.offerService.remove(id);
  }
}
