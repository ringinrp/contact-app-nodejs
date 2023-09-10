const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

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


const tulisPertanyaan = (pertanyaan) => {
	return new Promise((resolve, reject)=>{
		rl.question(pertanyaan, (nama)=>{
			resolve(nama);
		});
	});
};

const main = async() =>{
	const nama = await tulisPertanyaan('Masukkan nama anda : ');
	const email = await tulisPertanyaan('Masukkan email anda :');
	const noHP = await tulisPertanyaan('Masukkan nomer hp anda :');

	const contact = {nama, email, noHP};
		const file = fs.readFileSync('data/contacts.json', 'utf-8');
		const contacts = JSON.parse(file); 

		contacts.push(contact);
		
		fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2));

		console.log(`Terima kasih ${nama} telah memasukkan nomer HP ${email}`);
		rl.close();
}

main();