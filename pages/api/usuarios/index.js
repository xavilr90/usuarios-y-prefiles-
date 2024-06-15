
const pool = require('../../../config/database');

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const result = await pool.query('SELECT * FROM usuario');
        res.status(200).json(result.rows);
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
      }
      break;
    case 'POST':
      try {
        const { id_cliente, login, contrasena, direccion, email, telefono } = req.body;
        const result = await pool.query(
          'INSERT INTO usuario (id_cliente, login, contrasena, direccion, email, telefono) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
          [id_cliente, login, contrasena, direccion, email, telefono]
        );
        res.status(201).json(result.rows[0]);
      } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Método ${method} no permitido`);
      break;
  }
};
