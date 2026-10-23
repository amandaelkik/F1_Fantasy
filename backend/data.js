// Drivers and constructors of the 2026 Formula One season.
// Prices are in millions: price: 30 means 30 million.
// Driver photos come from the OpenF1 API (official headshots).

const constructors = [
    { id: 1, name: 'McLaren', price: 30, color: '#F47600', image: '' },
    { id: 2, name: 'Ferrari', price: 27, color: '#ED1131', image: '' },
    { id: 3, name: 'Red Bull', price: 27, color: '#4781D7', image: '' },
    { id: 4, name: 'Mercedes', price: 26, color: '#00D7B6', image: '' },
    { id: 5, name: 'Aston Martin', price: 18, color: '#229971', image: '' },
    { id: 6, name: 'Williams', price: 15, color: '#1868DB', image: '' },
    { id: 7, name: 'Racing Bulls', price: 13, color: '#6C98FF', image: '' },
    { id: 8, name: 'Alpine', price: 12, color: '#00A1E8', image: '' },
    { id: 9, name: 'Haas', price: 11, color: '#9C9FA2', image: '' },
    { id: 10, name: 'Audi', price: 10, color: '#F50537', image: '' },
    { id: 11, name: 'Cadillac', price: 8, color: '#909090', image: '' }
];

const F1_IMG = 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers';

const drivers = [
    { id: 1, name: 'Lando Norris', number: 1, constructorId: 1, price: 30, image: `${F1_IMG}/L/LANNOR01_Lando_Norris/lannor01.png.transform/1col/image.png` },
    { id: 2, name: 'Oscar Piastri', number: 81, constructorId: 1, price: 28, image: `${F1_IMG}/O/OSCPIA01_Oscar_Piastri/oscpia01.png.transform/1col/image.png` },
    { id: 3, name: 'Charles Leclerc', number: 16, constructorId: 2, price: 25, image: `${F1_IMG}/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/1col/image.png` },
    { id: 4, name: 'Lewis Hamilton', number: 44, constructorId: 2, price: 23, image: `${F1_IMG}/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/1col/image.png` },
    { id: 5, name: 'Max Verstappen', number: 3, constructorId: 3, price: 29, image: `${F1_IMG}/M/MAXVER01_Max_Verstappen/maxver01.png.transform/1col/image.png` },
    { id: 6, name: 'Isack Hadjar', number: 6, constructorId: 3, price: 14, image: `${F1_IMG}/I/ISAHAD01_Isack_Hadjar/isahad01.png.transform/1col/image.png` },
    { id: 7, name: 'George Russell', number: 63, constructorId: 4, price: 24, image: `${F1_IMG}/G/GEORUS01_George_Russell/georus01.png.transform/1col/image.png` },
    { id: 8, name: 'Kimi Antonelli', number: 12, constructorId: 4, price: 19, image: `${F1_IMG}/K/ANDANT01_Kimi_Antonelli/andant01.png.transform/1col/image.png` },
    { id: 9, name: 'Fernando Alonso', number: 14, constructorId: 5, price: 15, image: `${F1_IMG}/F/FERALO01_Fernando_Alonso/feralo01.png.transform/1col/image.png` },
    { id: 10, name: 'Lance Stroll', number: 18, constructorId: 5, price: 9, image: `${F1_IMG}/L/LANSTR01_Lance_Stroll/lanstr01.png.transform/1col/image.png` },
    { id: 11, name: 'Alex Albon', number: 23, constructorId: 6, price: 13, image: `${F1_IMG}/A/ALEALB01_Alexander_Albon/alealb01.png.transform/1col/image.png` },
    { id: 12, name: 'Carlos Sainz', number: 55, constructorId: 6, price: 14, image: `${F1_IMG}/C/CARSAI01_Carlos_Sainz/carsai01.png.transform/1col/image.png` },
    { id: 13, name: 'Liam Lawson', number: 30, constructorId: 7, price: 10, image: `${F1_IMG}/L/LIALAW01_Liam_Lawson/lialaw01.png.transform/1col/image.png` },
    { id: 15, name: 'Pierre Gasly', number: 10, constructorId: 8, price: 11, image: `${F1_IMG}/P/PIEGAS01_Pierre_Gasly/piegas01.png.transform/1col/image.png` },
    { id: 16, name: 'Franco Colapinto', number: 43, constructorId: 8, price: 7, image: `${F1_IMG}/F/FRACOL01_Franco_Colapinto/fracol01.png.transform/1col/image.png` },
    { id: 17, name: 'Esteban Ocon', number: 31, constructorId: 9, price: 9, image: `${F1_IMG}/E/ESTOCO01_Esteban_Ocon/estoco01.png.transform/1col/image.png` },
    { id: 18, name: 'Oliver Bearman', number: 87, constructorId: 9, price: 10, image: `${F1_IMG}/O/OLIBEA01_Oliver_Bearman/olibea01.png.transform/1col/image.png` },
    { id: 19, name: 'Nico Hulkenberg', number: 27, constructorId: 10, price: 9, image: `${F1_IMG}/N/NICHUL01_Nico_Hulkenberg/nichul01.png.transform/1col/image.png` },
    { id: 20, name: 'Gabriel Bortoleto', number: 5, constructorId: 10, price: 8, image: `${F1_IMG}/G/GABBOR01_Gabriel_Bortoleto/gabbor01.png.transform/1col/image.png` },
    { id: 21, name: 'Sergio Perez', number: 11, constructorId: 11, price: 8, image: `${F1_IMG}/S/SERPER01_Sergio_Perez/serper01.png.transform/1col/image.png` },
    { id: 22, name: 'Valtteri Bottas', number: 77, constructorId: 11, price: 6, image: `${F1_IMG}/V/VALBOT01_Valtteri_Bottas/valbot01.png.transform/1col/image.png` }
];

module.exports = { drivers, constructors };