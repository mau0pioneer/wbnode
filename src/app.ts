import { addKeyword, createProvider, createFlow, createBot, MemoryDB } from '@bot-whatsapp/bot';
import { BaileysProvider, handleCtx } from '@bot-whatsapp/provider-baileys';

const flowWelcome = addKeyword('hola').addAnswer('Hola, ¿en qué puedo ayudarte?');

const main = async () => {
  const provider = createProvider(BaileysProvider)

  provider.initHttpServer(3002);

  provider.http?.server.post('/send/message', handleCtx(async (bot, req, res) => {
    const phone = req.body.number;
    const message = req.body.message;
    const media = req.body.media;

    if(!phone || !message) {
      res.end('Phone and message are required')
      return
    }

    await bot.sendMessage(phone, message, {
      media,
    })
    res.end('Message sent')
  }))

  createBot({
    flow: createFlow([flowWelcome]),
    database: new MemoryDB(),
    provider,
  })

}

main();
