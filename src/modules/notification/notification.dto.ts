import { IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @ValidateIf((o) => !o.image)
  content: string;
}

export class UpdateNotificationDto {
  @IsString()
  content: string;
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
}
