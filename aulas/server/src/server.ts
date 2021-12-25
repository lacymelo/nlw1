import express from 'express';

const app = express();

app.get('/users', (req, res) => {
    res.json({ok: 'lacy'});
});

//porta de execução
app.listen(3333);