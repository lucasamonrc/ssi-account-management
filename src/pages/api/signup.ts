import { v4 as uuid } from 'uuid';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IssueFromTemplateRequest, SendRequest } from '@trinsic/trinsic';

import trinsic from '@/services/trinsic';
import { trinsicOptions } from '@/config/env';

const allowedMethods = ['POST'];

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (!allowedMethods.includes(request.method!) || request.method == 'OPTIONS') {
    return response.status(405).send({ message: 'Method not allowed.' });
  }
  
  const { name, email, role, pictureUrl = '' } = request.body;

  const errors = { invalid: false, name: '', email: '', role: '' };

  if (!name) {
    errors.invalid = true;
    errors.name = 'Name is required.';
  }

  if (!email) {
    errors.invalid = true;
    errors.email = 'Email is required.';
  }

  if (!role && role !== 0) {
    errors.invalid = true;
    errors.role = 'Role is required.';
  }

  if (Number.isNaN(role)) {
    errors.invalid = true;
    errors.role = 'Role must be a number.';
  }

  if (errors.invalid) {
    return response.status(400).json(errors);
  }

  try {
    const issueRequest = IssueFromTemplateRequest.fromPartial({
      templateId: trinsicOptions.schema,
      valuesJson: JSON.stringify({
        name,
        email,
        role: Number(role),
        memberId: uuid(),
        pictureUrl,
      }),
    });
  
    const issueResponse = await trinsic.credential().issueFromTemplate(issueRequest);
  
    await trinsic.credential().send(SendRequest.fromPartial({
      email,
      sendNotification: true,
      documentJson: issueResponse.documentJson,
    }));
  } catch (error) {
    return response.status(500).json({ success: false, error });
  }

  return response.status(201).json({ success: true });
}