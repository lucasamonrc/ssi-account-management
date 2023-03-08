import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

import trinsic from '@/services/trinsic';
import { appOptions } from '@/config/env';

const allowedMethods = ['POST'];

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (!allowedMethods.includes(request.method!) || request.method == 'OPTIONS') {
    return response.status(405).send({ message: 'Method not allowed.' });
  }
  
  const { proof } = request.body;

  if (!proof) {
    return response.status(400).json({ message: 'Missing proof' });
  }

  const verifyResponse = await trinsic.credential().verifyProof({
    proofDocumentJson: JSON.stringify(proof),
  });

  if (!verifyResponse.isValid) {
    return response.status(401).json({ isValid: false, message: 'Invalid proof' });
  }

  const token = jwt.sign({ credentials: proof.credentialSubject, proof }, appOptions.jwtSecret);

  return response.status(200).json({ token });
}