import { TrinsicService } from '@trinsic/trinsic';

const trinsic = new TrinsicService({ 
  authToken: process.env.TRINSIC_AUTH_TOKEN as string 
});

export default trinsic;