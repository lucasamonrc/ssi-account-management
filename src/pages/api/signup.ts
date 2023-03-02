import { v4 as uuid } from 'uuid';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IssueFromTemplateRequest, SendRequest } from '@trinsic/trinsic';
import trinsic from '@/services/trinsic';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const body = request.body

  const issueRequest = IssueFromTemplateRequest.fromPartial({
    templateId: "https://schema.trinsic.cloud/lucasamonrc/demo-account",
    valuesJson: JSON.stringify({
      Name: body.name,
      Email: body.email,
      id: uuid(),
    }),
  });

  const issueResponse = await trinsic.credential().issueFromTemplate(issueRequest);

  await trinsic.credential().send(SendRequest.fromPartial({
    email: body.email,
    documentJson: issueResponse.documentJson ?? "",
  }));

  response.redirect(302, '/');
}