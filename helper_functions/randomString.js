function generateRandomString() {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < characters.length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result.substring(0, 6);
};

module.exports = generateRandomString;
