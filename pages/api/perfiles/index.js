
const pool = require('../../../config/database');

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const result = await pool.query('SELECT * FROM perfil');
        res.status(200).json(result.rows);
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener los perfiles' });
      }
      break;
    case 'POST':
      try {
        const { id_usuario, perfil } = req.body;
        const result = await pool.query(
          'INSERT INTO perfil (id_usuario, perfil) VALUES ($1, $2) RETURNING *',
          [id_usuario, perfil]
        );
        res.status(201).json(result.rows[0]);
      } catch (error) {
        res.status(500).json({ error: 'Error al crear el perfil' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Método ${method} no permitido`);
      break;
  }
};
