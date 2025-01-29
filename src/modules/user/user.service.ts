import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { HashingService } from 'src/common/services/hashing/hashing.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private hashingService: HashingService,
  ) {}

  async create(user: CreateUserDto) {
    const [userExist, roleExist] = await this.prismaService.$transaction([
      this.prismaService.users.findFirst({
        where: {
          OR: [
            { email: user.email },
            { phone: user.phone },
            { username: user.username },
          ],
        },
      }),
      this.prismaService.roles.findUnique({
        where: {
          id: user.role_id,
        },
      }),
    ]);

    if (userExist) {
      throw new ConflictException(
        'Email, Phone, or Username is already in use',
      );
    }

    if (!roleExist) {
      throw new NotFoundException('Role not found');
    }

    const userCreated = await this.prismaService.users.create({
      data: {
        username: user.username,
        email: user.email,
        phone: user.phone,
        password: await this.hashingService.hashPassword(user.password),
        provider_id: user.provider_id,
        customer_id: user.customer_id,
        employee_id: user.employee_id,
      },
    });

    const assignRole = await this.prismaService.user_roles.create({
      data: {
        user_id: userCreated.id,
        role_id: user.role_id,
      },
    });

    return {
      result: {
        username: userCreated.username,
        role: roleExist.name,
      },
    };
  }

  async findAll() {
    const users = await this.prismaService.users.findMany({
      include: {
        providers: true,
      },
    });

    if (!users || users.length === 0) {
      throw new NotFoundException('Users not found');
    }

    return users;
  }

  async findOneById(id: string){
    const user = await this.prismaService.users.findUnique({
      where: {
        id
      }
    });

    if(!user){
      throw new NotFoundException('User with id ' + id + ' not found');
    }

    return user;
  }

  async update(id: string, user: UpdateUserDto){
    const userExist = await this.prismaService.users.findUnique({
        where: {
            id
        }
    });

    if(!userExist){
        throw new NotFoundException('User not exist');
    }

    return await this.prismaService.users.update({
        where: {
            id
        },
        data: {
            username: user.username,
            email: user.email,
            phone: user.phone,
            status: user.status,
            updated_at: new Date()
        }
    })
  }
}
