const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const routers = require('./src/routers'); 
const client = require('./config/db'); 

const app = express();
app.use(bodyParser.json());
app.use(routers);

let server;

beforeAll(() => {
    server = app.listen(3001); 
});

afterAll(async () => {
    await client.end(); 
    server.close(); 
});

describe('API Routes', () => {
    it('GET / deve retornar uma mensagem se a API está executando', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'A API está rodando!!!');
    });

    // it('GET /api/read should return a list of users', async () => {
    //     const res = await request(app).get('/api/read');
    //     console.log(res.text);
    //     expect(res.statusCode).toEqual(200);
    //     expect(res.body).toBeInstanceOf(Array);
    // });

    // it('GET /api/read/:id should return a user by ID', async () => {
    //     const res = await request(app).get('/api/read/1');
    //     if (res.statusCode === 200) {
    //         expect(res.body).toBeInstanceOf(Array);
    //         expect(res.body.length).toBeGreaterThan(0);
    //     } else {
    //         expect(res.statusCode).toEqual(401);
    //         expect(res.body).toHaveProperty('msg', 'Não existe registro no banco com este id');
    //     }
    // });

    // it('POST /api/register should create a new user', async () => {
    //     const userData = {
    //         nome: 'Ricardo',
    //         sobrenome: 'Fonseca',
    //         idade: 31
    //     };
    //     const res = await request(app).post('/api/register').send(userData);
    //     if (res.statusCode === 201) {
    //         expect(res.body).toHaveProperty('msg', 'Usuário cadastrado com sucesso');
    //     } else {
    //         expect(res.statusCode).toEqual(401);
    //         expect(res.body).toHaveProperty('msg', `O ID ${userData.id} já está cadastrado na base de dados`);
    //     }
    // });

    // it('DELETE /api/delete/:id should delete a user by ID', async () => {
    //     const id = 2;
    //     const res = await request(app).delete(`/api/delete/${id}`);

    //     if (res.statusCode === 204) {
    //         expect(res.body).toEqual({});
    //     } else {
    //         expect(res.statusCode).toEqual(404);
    //         expect(res.body).toHaveProperty('msg', `O ID ${id} não existe na base de dados`);
    //     }
    // });

    // it('PUT /api/update/:id should update a user by ID', async () => {
    //     const id = 1;

    //     const updateData = {
    //         nome: 'Updated',
    //         sobrenome: 'User',
    //         idade: 31
    //     };
    //     const res = await request(app).put(`/api/update/${id}`).send(updateData);
    //     if (res.statusCode === 200) {
    //         expect(res.body).toHaveProperty('msg', 'Dados atualizados com sucesso!!!');
    //     } else {
    //         expect(res.statusCode).toEqual(401);
    //         expect(res.body).toHaveProperty('msg', `O ID ${id} não existe na base de dados`);
    //     }
    // });
});
