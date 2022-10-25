const bcrypt = require('bcryptjs');

export default class Password {
    public async generateSalt(length: number = 10): Promise<string> {
        return await bcrypt.genSalt(length);
    }

    public async generateHash(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }

    public async check(hash1: string, hash2: string): Promise<boolean> {
        return await bcrypt.compare(hash1, hash2);
    }
}