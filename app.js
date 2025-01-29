const express = require('express');
const app = express();
const PORT = 3000;

const products = [
    { id: 1, name: 'Produto A', price: 10.0 },
    { id: 2, name: 'Produto B', price: 20.0 },
    { id: 3, name: 'Produto C', price: 30.0 },
];

app.get('/', (req,res) => {
    res.send('Servidor rodando com Express!');
});

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find((p) => p.id === productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});