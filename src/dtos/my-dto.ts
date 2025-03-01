import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { MyNestedDto } from './my-nested-dto';

export const MyEnum = {
  FOO: 'FOO',
  BAR: 'BAR',
} as const;
export type MyEnum = (typeof MyEnum)[keyof typeof MyEnum];

export const MyEnum2 = {
  FOO: 'FOO',
  BAR: 'BAR',
} as const;
export type MyEnum2Type = (typeof MyEnum2)[keyof typeof MyEnum2];

export class MyDto {
  @ApiPropertyOptional()
  // @ApiPropertyOptional({ enum: MyEnum }) // comment me in to make me work
  @IsOptional()
  someEnum?: MyEnum;

  @ApiPropertyOptional() // leads to no error if type of the enum's type name is different
  someNum2?: MyEnum2Type;

  @ApiPropertyOptional({
    type: () => MyNestedDto,
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @Type(() => MyNestedDto)
  @ValidateNested()
  someNested?: MyNestedDto[];
}
