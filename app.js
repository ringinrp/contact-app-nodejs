//mengambil argumen dari comment lain
// const command = process.argv[2];
// if(command === 'add'){

// }else if(command == 'remove'){

// }else if(command === 'list'){

// }

const yargs = require('yargs');
const contacts = require('./contacts');

yargs.command({
    command: 'add', 
    describe: 'Menambahkan contact baru', 
    builder:{
        nama:{
            describe:'Nama lengkap',
            demandOption: true,
            type: 'string',
        },
        email:{
            describe: 'Alamat email',
            demandOption: true,
            type: 'string',
        },
        noHP:{
            describe:'Nomer Handphone',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv){
        contacts.simpanContact(argv.nama, argv.email, argv.noHP);
    },
});

yargs.parse();

// const {tulisPertanyaan, simpanContact} = require('./contacts');

// const main = async() =>{
// 	const nama = await tulisPertanyaan('Masukkan nama anda : ');
// 	const email = await tulisPertanyaan('Masukkan email anda : ');
// 	const noHP = await tulisPertanyaan('Masukkan nomer hp anda : ');

// 	simpanContact(nama,email,noHP);
// };

// main();