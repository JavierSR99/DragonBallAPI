import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

async function hashPlainText(text: string): Promise<string> {
    const hash = await bcrypt.hash(text.toString(), SALT_ROUNDS);
    return hash;
}

async function comparePlainToHash(plain: string, hash: string): Promise<boolean> {
    const isEqual = await bcrypt.compare(plain,hash);
    return isEqual;
}

export { hashPlainText };