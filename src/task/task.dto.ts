/* eslint-disable prettier/prettier */

import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsInt, IsString } from 'class-validator';
import { OmitType } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsString({ message: 'name is required' })
  name: string;
  @IsString({ message: 'description is required' })
  description: string;
  constructor() {
    
  }
}

export class UpdateTaskDto {
  @IsEnum(['New', 'In progress', 'In review', 'Done'])
  status: 'New' | 'In progress' | 'In review' | 'Done';
  @IsString({ message: 'description is required' })
  description: string;
}
