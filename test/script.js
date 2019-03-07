

let a = 0
for(j = 0; j < 5; j++) {
    for(let i = 1 + a; i <= (11 + a); i++) {
        let product = {
            name: `Game (${i})`,
            category: `Games`,
            price: Math.ceil(Math.random() * 10000),
            quantity: Math.ceil(Math.random() * 20),
            img: `img/compressed/games (${((i + a) % 12) == 0 ? 1: ((i + a) % 12)}).jpg`,
            vId: 55
        }
        fetch(`http://localhost:5000/Shopping-Cart-API/api/products`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        
            body: JSON.stringify(product)
        }).then(res => res.json())
        .then(json => console.log(json))
        .catch(ex => console.error(ex))
    
    
    }    
    a += 12
}