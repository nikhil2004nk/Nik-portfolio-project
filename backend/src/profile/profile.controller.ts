import { Controller, Get, Body, Patch } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  find() {
    return this.profileService.find();
  }

  @Patch()
  update(@Body() updateProfileDto: any) {
    return this.profileService.update(updateProfileDto);
  }
}
