import {createCickupTask} from './send-to-clickup.js';
const PostalMime = require('postal-mime/dist/node').postalMime.default;

async function streamToArrayBuffer(stream, streamSize) {
  let result = new Uint8Array(streamSize);
  let bytesRead = 0;
  const reader = stream.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result.set(value, bytesRead);
    bytesRead += value.length;
  }
  return result;
}

async function sendTGMessage(message, env) {
  const token = env.TG_BOT_TOKEN;
  const ids = env.TG_SEND_IDS.split(",");
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const tgResponse = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      chat_id: env.TG_SEND_IDS,
      text: JSON.stringify(message),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  console.log(tgResponse.status, await tgResponse.text())
}
export default {
  async email(message, env, ctx) {

    if (message.raw) {
      const rawEmail = await streamToArrayBuffer(message.raw, message.rawSize);
      const parser = new PostalMime();
      const parsedEmail = await parser.parse(rawEmail)

      console.log(parsedEmail)

      // const decoder = new TextDecoder()

      try {
        await createClickupTask(parsedEmail.html, env.CLICKUP_TOKEN)
        console.log(parsedMessage)
        // await sendTGMessage(parsedMessage, env)
      } catch (error) {
        message.forward('novojilov.ilya@gmail.com')
      }
    }
  },
};
