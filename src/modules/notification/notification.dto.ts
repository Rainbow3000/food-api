import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  content: string;

  @IsArray()
  @IsOptional()
  data?: any;
}

export class UpdateNotificationDto {
  @IsString()
  @IsOptional()
  content: string;

  @IsBoolean()
  @IsOptional()
  isSeen: boolean;
}

export class GetListNotificationDto {
  @IsOptional()
  @IsNumber()
  page: number;

  @IsNumber()
  @IsOptional()
  limit: number;

  @IsString()
  @IsOptional()
  q?: string;

  @IsOptional()
  @IsBoolean()
  isSeen: boolean;
}
