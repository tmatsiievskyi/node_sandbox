const fs = require('node:fs');

const main = async () => {
  const stream = fs.createReadStream('./07.promises.js', 'utf8');
  for await (const chunk of stream) {
    console.log(chunk);
  }

  const data = await fs.promises.readFile('07.promises.js', 'utf8');
  console.log(data);
};

main().catch(console.error);
