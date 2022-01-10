import bcrypt from 'bcrypt';

export const encrypte = async (value) => {
    console.log(`value = ${value}`)
    const encrypted = await bcrypt.hash(value, 12);

    console.log(`value = ${value}, encrypted = ${encrypted}`)
    return encrypted.toString()
}

export const compare = async (value, hashedValue) => {
    const isCompared = await bcrypt.compare(value, hashedValue)

    return isCompared
}