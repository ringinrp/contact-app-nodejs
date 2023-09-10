const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

//membuat folder data
const dirPath = './data';
if(!fs.existsSync(dirPath)){
	fs.mkdirSync(dirPath);
}

//membuat file contacts.json jika belum ada
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
	fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const simpanContact = (nama,email,noHP) => {
	const contact = {nama, email, noHP};
	const file = fs.readFileSync('data/contacts.json', 'utf-8');
	const contacts = JSON.parse(file);

    //cek duplikat
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if(duplikat){
        console.log(chalk.bold.red.inverse('Contact sudah terdaftar'));
        return false;
    }

    //cek email
    if(email){
        if(!validator.isEmail(email)){
            console.log(chalk.bold.red.inverse('Email tidak valid'));
            return false;
        }
    }

    //cek nomer handphone
    if(!validator.isMobilePhone(noHP, 'id-ID')){
        console.log(chalk.bold.red.inverse('Nomer handphone tidak valid'));
            return false;
    }

	contacts.push(contact);
	
	fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2));

	console.log(chalk.bgCyanBright.bold(`Terima kasih ${nama} telah memasukkan nomer HP ${noHP} dan Email ${email}`));
}


module.exports = {simpanContact};