const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const cron = require('node-cron')

// Path where the session data will be stored
const SESSION_FILE_PATH = 'session.json';

// Load the session data if it has been previously saved
let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}
const client = new Client({
    authStrategy: new LocalAuth({ clientId: "client-one" })
});
const client2 = new Client({
    authStrategy: new LocalAuth({ clientId: "client-dua" })
});
client.initialize();

 // Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    sessionData = session;
    // fs.writeFile(SESSION_FILE_PATH, session, (err) => {
    //     if (err) {
    //         console.error(err);
    //     }
    // });
});

 
client.on('qr', (qr) => {
    qrcode.generate(qr,{small:true})
});

client.on('ready', () => {
    console.log('Client is ready!');
    cron.schedule('59 * * * * *', function() {
        console.log('Running task pendak 59 detik');
        client.sendMessage('120363044307954794@g.us', 'Ngirim pesan pendak 59 detik')
        client.sendMessage('6285700883202@c.us', 'Ngirim pesan pendak 59 detik')
        // client.sendMessage('6289696207319', 'Running task every second')
      });
});
client.on('message', message => {
	console.log(message);
});

 

 

 

 