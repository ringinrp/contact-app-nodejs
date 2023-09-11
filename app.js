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
}).demandCommand();

//menampilkan daftar semua nama & no hp contact
yargs.command({
    command: 'list', 
    describe: 'Menampilkan semua nama & nomer HP contact ', 
    handler(){
        contacts.listContact();
    },
});

// menampilkan detail sebuah contact
yargs.command({
    command: 'detail', 
    describe: 'Menampilkan detail sebuah contact berdasarkan nama', 
    builder:{
        nama:{
            describe:'Nama lengkap',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv){
        contacts.detailContact(argv.nama);
    },
});

//menghapus contact berdasarkan nama
yargs.command({
    command: 'delete', 
    describe: 'Menghapus contact berdasarkan nama', 
    builder:{
        nama:{
            describe:'Nama lengkap',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv){
        contacts.deleteContact(argv.nama);
    },
});

yargs.parse();