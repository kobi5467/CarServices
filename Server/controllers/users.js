import User from '../models/user.js'
import { sendEmailAsync } from '../utils/mailer.js'
import { encrypte, compare } from '../utils/encryption.js'

// input : { email: 'kobi@gmail.com', password: '1234' }
export const login = async (req, res) => {
    console.log(`Controllers: Users.login() - body = ${JSON.stringify(req.body)}`)

    const invalidMessage = "User or password are invalid."
    const loginData = req.body
    try {
        const usersWithSameEmails = await User.find({ email : loginData.email}).limit(1)
        const isUserAlreadyExist = usersWithSameEmails.length > 0
        if (!isUserAlreadyExist) {
            res.status(404).send(invalidMessage)
            return
        }

        const savedPassword = usersWithSameEmails[0].password
        const isPasswordCorrect = await compare(loginData.password, savedPassword)

        if (!isPasswordCorrect) {
            res.status(404).send(invalidMessage)
            return
        }

        res.status(200).send("Login Successfully")
    } catch (err) {
        res.status(500).send(err.message)
    }
}

// input : { firstName : 'Kobi', lastName: 'Malka', email: 'kobi@gmail.com', password: '123456' }
export const signup = async (req, res) => {
    console.log(`Controllers: Users.signup() - body = ${JSON.stringify(req.body)}`)
    const userData = req.body

    try {
        const usersWithSameEmails = await User.find({ email: userData.email }).limit(1)
        const isUserAlreadyExist = usersWithSameEmails.length > 0

        if (isUserAlreadyExist) {
            res.status(401).send("user already exists");
            return
        }

        userData.password = await encrypte(userData.password)
        const newUser = new User(userData)
        await newUser.save()

        sendEmailAsync(userData.email, "Welcome " + userData.firstName, "Test Test")

        res.status(200).send("OK");
    } catch (err) {
        res.status(404).send(err.message);
    }
}

// input : email
export const sendForgotPasswordEmail = (req, res) => {
    res.send('user route: /forget-password: post request')
}

// input : email, password
export const resetPassword = (req, res) => {
    res.send('user route: /forget-password: put request')
}