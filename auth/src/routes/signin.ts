import express, {Request, Response} from 'express'
import { body, } from 'express-validator';
import Jwt from 'jsonwebtoken'

import { Password } from '../services/password';
import { validateRequest, BadRequestError } from '@ck-tickets/common'
import { User } from '../models/user';


const router = express.Router();

router.post('/api/users/signin', 
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must supply a password')
    ], 
    validateRequest, 
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            throw new BadRequestError('Invalid credentials')
        }

        const passwordMatch = await Password.compare(
            existingUser.password, 
            password)
        if (!passwordMatch) {
            throw new BadRequestError('Invalid credentials')
        }

         // generate JWT
        const userJwt = Jwt.sign(
            {
            id: existingUser.id,
            email: existingUser.email
            }, process.env.JWT_KEY!
        )
      
  
        // Store it on session object
        req.session = {
            jwt: userJwt
        };

        res.status(200).send(existingUser);
    }
);

export { router as signinRouter } ;