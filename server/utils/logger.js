/* eslint-disable no-undef */
import fs from 'fs';
import path from 'path';

export const logMessageToJSON = (message) => {
    const filePath = path.join(process.cwd(), 'messages.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        let messages = [];
        if (!err && data) {
            messages = JSON.parse(data);
        }

        messages.push(message);

        fs.writeFile(filePath, JSON.stringify(messages, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing message log:', writeErr);
            }
        });
    });
};
