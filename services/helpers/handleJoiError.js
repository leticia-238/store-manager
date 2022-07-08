const UnprocessableEntityError = require('../../errors/UnprocessableEntityError');

const handleJoiError = (error) => {
  const [{ code }] = error;
  if (code === 'string.min' || code === 'number.min') {
    return new UnprocessableEntityError(error);
  }
  return error;
};

module.exports = handleJoiError;