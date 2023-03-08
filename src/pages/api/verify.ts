import type { NextApiRequest, NextApiResponse } from 'next';
import { CreateProofRequest, IssueFromTemplateRequest, SendRequest } from '@trinsic/trinsic';
import trinsic from '@/services/trinsic';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const body = request.body;

  const result = await trinsic.credential().verifyProof({
    proofDocumentJson: JSON.stringify(body),
  });

  console.log(result.validationResults?.SchemaConformance.messages);

  return response.json({ success: true });
}