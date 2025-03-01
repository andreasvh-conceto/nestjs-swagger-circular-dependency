import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class MyNestedDto {
  @ApiProperty()
  @IsDefined()
  someNestedPropety: string;
}
