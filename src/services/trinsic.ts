import { trinsicOptions } from '@/config/env';
import { TrinsicService } from '@trinsic/trinsic';

const trinsic = new TrinsicService({ 
  authToken: trinsicOptions.authToken,
});

export default trinsic;