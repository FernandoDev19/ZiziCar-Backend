import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
    private readonly saltRounds = 10;

    async hashPassword(password: string): Promise<string>
    {
        return await bcrypt.hash(password, this.saltRounds);
    }

    async comparePassword(password: string, hash: string): Promise<boolean>
    {
        return await bcrypt.compare(password, hash);
    }
}
