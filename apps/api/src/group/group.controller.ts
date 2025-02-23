import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  async findAll(@Query('page') page: string, @Query('limit') limit: string): Promise<{ groups: Group[], totalCount: number, currentPage: number, totalPages: number }> {
    const pageNumber = parseInt(page, 10) || 1; // Default to page 1
    const limitNumber = parseInt(limit, 10) || 10; // Default to limit 10

    const [groups, totalCount] = await this.groupService.findAll(pageNumber, limitNumber);
    const totalPages = Math.ceil(totalCount / limitNumber);

    return {
        groups,
        totalCount,
        currentPage: pageNumber,
        totalPages,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(id);
  }
}
