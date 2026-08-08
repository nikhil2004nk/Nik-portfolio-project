import { IsString, IsOptional, IsBoolean, IsInt, IsEnum, IsArray, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProjectStatus, ScreenshotType } from '@prisma/client';

export class FeatureDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  order?: number;
}

export class ScreenshotDto {
  @IsString()
  title: string;

  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsString()
  alt?: string;

  @IsEnum(ScreenshotType)
  type: ScreenshotType;

  @IsOptional()
  @IsInt()
  order?: number;
}

export class MetricDto {
  @IsString()
  label: string;

  @IsString()
  value: string;

  @IsOptional()
  @IsInt()
  order?: number;
}

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  gallery?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  thumbnail?: string;

  @ApiPropertyOptional({ enum: ProjectStatus, default: ProjectStatus.COMPLETED })
  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  order?: number;

  // Relations (Simple IDs)
  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  technologyIds?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categoryIds?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tagIds?: string[];

  // Nested Elements
  @ApiPropertyOptional({ type: [FeatureDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeatureDto)
  features?: FeatureDto[];

  @ApiPropertyOptional({ type: [ScreenshotDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScreenshotDto)
  screenshots?: ScreenshotDto[];

  @ApiPropertyOptional({ type: [MetricDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MetricDto)
  metrics?: MetricDto[];

  // JSON fields
  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  highlights?: any;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  caseStudy?: any;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  architecture?: any;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  deployment?: any;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  timeline?: any;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  seo?: any;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  links?: any;
}
