import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createProvider, createFlow, createBot, MemoryDB, addKeyword } from '@bot-whatsapp/bot';
import { BaileysProvider, handleCtx } from '@bot-whatsapp/provider-baileys';

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(cors()); // Configuración básica de CORS para permitir acceso desde cualquier origen

const provider = createProvider(BaileysProvider);

app.post('/send/message', handleCtx(async (bot, req, res) => {
    const phone = req.body.number;
    const message = req.body.message;
    const media = req.body.media;

    console.log('Phone:', phone);
    console.log('Message:', message);

    if (!phone || !message) {
        res.end('Phone and message are required. ' + phone + ' ' + message);
        return;
    }

    await provider.sendMessage(phone, message, {
        media
    });
    res.end('Message sent');
}));

const flowWelcome = addKeyword(['hola']).addAnswer('Hola, ¿en qué puedo ayudarte?');

createBot({
    flow: createFlow([flowWelcome]),
    database: new MemoryDB(),
    provider,
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
