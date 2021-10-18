const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')
const fs=require("fs");
const cookieParser = require('cookie-parser');


const app = express();

const port = 6789;


// directorul 'views' va conține fișierele .ejs (html + js executat la server)
app.set('view engine', 'ejs');
// suport pentru layout-uri - implicit fișierul care reprezintă template-ul site-ului este views/layout.ejs
app.use(expressLayouts);
// directorul 'public' va conține toate resursele accesibile direct de către client (e.g., fișiere css, javascript, imagini)
app.use(express.static('public'))
// corpul mesajului poate fi interpretat ca json; datele de la formular se găsesc în format json în req.body
app.use(bodyParser.json());
// utilizarea unui algoritm de deep parsing care suportă obiecte în obiecte
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


// la accesarea din browser adresei http://localhost:6789/ se va returna textul 'Hello World'
// proprietățile obiectului Request - req - https://expressjs.com/en/api.html#req
// proprietățile obiectului Response - res - https://expressjs.com/en/api.html#res
app.get('/', (req, res) => {
//res.render('index')
var CNume=req.cookies.utilizator;
//console.log(req.cookies.utilizator);
res.render('index',{CNume});
});


app.get('/edit', (req, res) => {
	
	res.render('edit');
	});
	

app.get('/autentificare', (req, res) =>{
	
	var mesaj = req.cookies.mesajEroare;
    res.render('autentificare', {mesaj});
	//res.render('autentificare');
});



let listutil=JSON.parse(fs.readFileSync('utilizatori.json'));


app.post('/verificare-autentificare', (req, res) => {

	var ok=0;
		console.log(req.body);
		for (var i in listutil) {
				 
			if(listutil[i].nume==req.body['nume'] && listutil[i].parola==req.body['pass'])
				{res.cookie("utilizator", req.body['nume']);
				res.redirect('/');
				ok=1;
				}

			if(ok==0)
				{
				res.cookie("mesajEroare", "Utilizatorul nu exista");
				res.redirect('/autentificare');
			
				 }
			 
			 

}});




app.listen(port, () => console.log(`Serverul rulează la adresa http://localhost:`));

