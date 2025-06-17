//An Custom Error Handler For Handleing The Mongoose Duplicate Error

import { TErrorSources } from '../interface/error';

const handleDuplicateError = (err: any) => {
  const statusCode = 400;
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorSources: TErrorSources = [
    {
      path: err.keyValue,
      message: `${extractedMessage} already exists try another`,
    },
  ];
  return { statusCode, message: `${extractedMessage} already exists try another`, errorSources };
};

export default handleDuplicateError;
