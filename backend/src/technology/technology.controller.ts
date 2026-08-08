import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TechnologyService } from './technology.service';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';

@Controller('technology')
export class TechnologyController {
  constructor(private readonly technologyService: TechnologyService) {}

  @Get()
  findAll() {
    return this.technologyService.findAll();
  }
}
