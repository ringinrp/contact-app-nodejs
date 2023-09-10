const fs = require('fs');
const rl = require('readline');

const rl = readline.creatInterface({
    input: input,
    output: output,
});

rl.question('Masukkan nama anda : ', (nama) => {
    rl.question('Masukkan nomer HP anda : ', (noHP)=>{
        const contact = {nama,noHP};
        const file = fs.readFileSync('data/contacts.json', 'utf-8');
        const contacts = JSON.parse(file); 

        contacts.push(contact);

        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2));

        console.log(`Terima kasih ${nama} telah memasukkan nomer HP ${noHP}`);
        rl.close();
    });
});