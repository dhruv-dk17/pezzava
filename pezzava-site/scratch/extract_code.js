const fs = require('fs');
const logPath = 'C:\\Users\\NILAXI\\.gemini\\antigravity\\brain\\6f85ab7f-ce69-4f8f-924b-3fb1d7f4166b\\.system_generated\\logs\\overview.txt';
const content = fs.readFileSync(logPath, 'utf8');
const index = 0;
if (index !== -1) {
    console.log(content.substring(index, index + 10000));
} else {
    console.log('Not found');
}
