const { execSync } = require('child_process');
const fs = require('fs');

const randomNum = Math.floor(Math.random() * 9000) + 1000;
const randomNumTwo = Math.floor(Math.random() * 9000) + 1000;

execSync('tsc --build');

execSync(`tsc src/client/main.ts --outFile build/client/cl_${randomNum}.js`);
execSync(`tsc src/server/main.ts --outFile build/server/sv_${randomNumTwo}.js`);