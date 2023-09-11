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

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
	const contacts = JSON.parse(file);
    return contacts; 
}

const simpanContact = (nama,email,noHP) => {
	const contact = {nama, email, noHP};
    const contacts = loadContact();

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

const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.cyan.inverse.bold('Daftar Contact : '));
    contacts.forEach((contact, i) =>{
        console.log(`${i +1}. ${contact.nama} - ${contact.noHP}`)
    })
};

const detailContact = (nama) => {
    const contacts = loadContact ();

    const contact = contacts.find((contact)=> contact.nama.toLowerCase() === nama.toLowerCase());

if(!contact){
    console.log(chalk.bold.red.inverse(`${nama} tidak ditemukan!`));
    return false;
}

console.log(chalk.bold.red.inverse(contact.nama));
console.log(contact.noHP);
if(contact.email){
    console.log(contact.email);
}
};

const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts = contacts.filter((contact)=> contact.nama.toLowerCase() !== nama.toLowerCase()
    );

    if(contacts.length === newContacts.length){
        console.log(chalk.bold.red.inverse(`${nama} tidak ditemukan!`));
        return false;
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts, null, 2));
    console.log(chalk.bgCyanBright.bold(`data contact ${nama} berhasil dihapus !!`));

};

module.exports = {simpanContact, listContact, detailContact, deleteContact};