import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export const MyEnum = {
  FOO: 'FOO',
  BAR: 'BAR',
} as const;
export type MyEnum = (typeof MyEnum)[keyof typeof MyEnum];

export class MyDto {
  @ApiPropertyOptional()
  // @ApiPropertyOptional({ enum: MyEnum })
  @IsOptional()
  someEnum?: MyEnum;
}
