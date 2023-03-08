import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

import trinsic from '@/services/trinsic';
import { appOptions } from '@/config/env';

const allowedMethods = ['GET'];

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (!allowedMethods.includes(request.method!) || request.method == 'OPTIONS') {
    return response.status(405).send({ message: 'Method not allowed.' });
  }
  
  const auth = request.headers.authorization || '';
  const [,token] = auth.split(' ');

  if (!token) {
    return response.status(400).json({ message: 'Missing auth token' });
  }

  try {
    const { credentials, proof } = jwt.verify(token, appOptions.jwtSecret) as any;

    const verifyResponse = await trinsic.credential().verifyProof({
      proofDocumentJson: JSON.stringify(proof),
    });
  
    if (!verifyResponse.isValid) {
      return response.status(401).json({ isValid: false, message: 'Invalid token' });
    }

    return response.status(200).json(credentials);
  } catch (error) {
    return response.status(401).json({ isValid: false, message: 'Invalid token' });
  }
}