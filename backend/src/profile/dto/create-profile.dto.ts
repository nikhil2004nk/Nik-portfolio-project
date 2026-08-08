import { IsString, IsOptional, IsBoolean, IsInt, IsEmail, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({ example: 'Nikhil' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Full Stack Developer' })
  @IsString()
  headline: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tagline?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ example: 'contact@nikhil.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  resumeUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  profileImage?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  coverImage?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  freelanceAvailable?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  remoteAvailable?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  relocationAvailable?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  currentCompany?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  currentRole?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  yearsExperience?: number;
}
