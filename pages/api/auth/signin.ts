import { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import * as jose from 'jose';
import { setCookie } from 'cookies-next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const errors: string[] = [];

    const validationSchema = [
      {
        valid: validator.isLength(password, {
          min: 1,
        }),
        errorMessage: 'Password is invalid',
      },
      {
        valid: validator.isEmail(email),
        errorMessage: 'Email is invalid',
      },
    ];

    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    if (errors.length) {
      return res.status(422).json({ errorMessage: errors[0] });
    }

    const retrievedUser = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        password: true,
        first_name: true,
        last_name: true,
        phone: true,
        city: true,
      },
    });

    if (!retrievedUser) {
      return res
        .status(401)
        .json({ errorMessage: 'Email or password incorrect.' });
    }

    const isMatched = await bcrypt.compare(password, retrievedUser.password);

    if (!isMatched) {
      return res
        .status(401)
        .json({ errorMessage: 'Email or password incorrect.' });
    }

    const alg = 'HS256';
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new jose.SignJWT({ email: retrievedUser.email })
      .setProtectedHeader({ alg })
      .setExpirationTime('24h')
      .sign(secret);

    setCookie('jwt', token, { req, res, maxAge: 60 * 6 * 24 });

    return res.status(200).json({
      firstName: retrievedUser.first_name,
      lastName: retrievedUser.last_name,
      email: retrievedUser.email,
      phone: retrievedUser.phone,
      city: retrievedUser.city,
    });
  }

  return res.status(400).json('Unknown method');
}
