import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`Email e/ou Senha foram preenchidos de forma incorreta.`);
    }

    return user;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: {id} })

    if (!user) {
      throw new NotFoundException(`Email e/ou Senha foram preenchidos de forma incorreta.`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userRepository.findOne({ where: {id} });

    if (!existingUser) {
      throw new NotFoundException(`ID #${id} não foi encontrado`);
    }

    // Perform the update
    this.userRepository.merge(existingUser, updateUserDto);

    return this.userRepository.save(existingUser);
  }

  async remove(id: number) {
    const userToRemove = await this.userRepository.findOne({ where: {id} });

    if (!userToRemove) {
      throw new NotFoundException(`ID #${id} não foi encontrado`);
    }

    return this.userRepository.remove(userToRemove);
  }
}
