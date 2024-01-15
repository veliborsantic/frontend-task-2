# Zadatak

Napraviti custom multiple select async dropdown komponentu koja ce podatke vuci sa servera. Podaci su tipa infinite scrolera te je moguce beskonacno scrolati dropdown iteme. U frontend folderu ima base setup kao starting point. 

 - Komponenta select treba da primi value kao array objekata id-a i name-a koji predstavljaju trenutno selektovane iteme, onChange koji ce setovati novu vrijednost selektovanih itema. 
 - Komponenta treba da ima placeholder ukoliko nema selektovanih itema
 - Komponenta treba da ima opciju za brisanje selektovanih itema
 - Komponenta treba da ima opciju za paginaciju itema putem infinite scrolera. Kada dodjemo do dna treba da povucemo novi batch podataka sa servera. Data fetching treba da se desava unutar komponente i potrebno joj je proslijediti api url.
 - Tokom fetchanja podataka komponenta treba da ima indikaciju loading statea.
 - Komponenta treba da ima opciju za selektovanje vise itema. Selektovani itemi treba da budu naglaseni unutar dropdowna.
 - Komponenta nema mogucnost pretrage itema, sto znaci nema potrebe za inputom za pretragu ili filtriranje.
 - Selektovani i itemi unutar dropdowna imaju samo vidljiv naziv a ne id. Id je potreban ukoliko zelimo da posaljemo podatke na server.
 - Selektovani itemi treba da budu dizajnirani kao chipovi i unutar sebe da imaju button delete kako bi taj item izbrisali iz selektovanih itema, takodje je potreban button za brisanje svih selektovanih itema.
 - Potrebno je uraditi i responzivnost komponente tako sto ce se na mobitelima prikazati umjesto dropdowna full screen modal sa listom itema.
 - Obratiti paznju na performans komponente, odraditi momoizaciju gdje je to potrebno i gdje je moguce te po mogucnosti odraditi virtualizaciju dropdown liste zbog mogucnosti beskonacnog broja podataka.
 - Po potrebi kreirati zasebne fajlove za komponente (chip, dropdown i sl) koje ce se koristiti u ovoj komponenti.

 - Odaberite sami dizajn kako smatrate da je najprakticniji UX za ovu komponentu.

 - Unutar projekta se nalazi i api json za postman.

 - Nije dozvoljeno koristenje bilo kakvih biblioteka za dropdown komponente ili component biblioteka.
 - Dozvoljeno je koristenje fetch api biblioteka tipa axiosa, react queria.

 - Ukoliko bude pitanja slobodno pitajte putem email-a ili otvorite issue na githubu.

# Instalacija

Iz foldera `backend` instalirati pakete sa `npm i` i startati server sa komandom `npm start`. Iz foldera `frontend` instalirati pakete sa `npm i` i startati frontend sa komandom `npm run dev`.

# Api

Api url: `localhost:3000`

## Listanje itema

`GET /api/items/`

### Query params

`limit`: integer (default: 10, must be > 0)
`cursor`: integer (default: 0, must be >= 0)

### Response

#### 200

```json
{
    "items": [
        {
            "id": 1,
            "name": "Item name1"
        },
        {
            "id": 2,
            "name": "Item name2"
        }
    ],
    "pagination": {
        "next": 3,
        "previous": 1,
        "limit": 2
    }
}
```

- `items` - lista itema
- `pagination` - paginacija itema
    - `next` - iduca stranica sto prosljedjumeo kao cursor parametar
    - `previous` - prethodna stranica
    - `limit` - limit itema po stranici

#### 400

```json
{
    "errors": [
        "Limit must be integer",
        "Cursor must be integer"
    ]
}
```