
const pool = require('../../../config/database');

export default async (req, res) => {
  const { method, query: { id } } = req;

  switch (method) {
    case 'GET':
      try {
        const result = await pool.query('SELECT * FROM usuario WHERE id_usuario = $1', [id]);
        if (result.rows.length > 0) {
          res.status(200).json(result.rows[0]);
        } else {
          res.status(404).json({ error: 'Usuario no encontrado' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
      }
      break;
    case 'PUT':
      try {
        const { id_cliente, login, contrasena, direccion, email, telefono } = req.body;
        const result = await pool.query(
          'UPDATE usuario SET id_cliente = $1, login = $2, contrasena = $3, direccion = $4, email = $5, telefono = $6 WHERE id_usuario = $7 RETURNING *',
          [id_cliente, login, contrasena, direccion, email, telefono, id]
        );
        if (result.rows.length > 0) {
          res.status(200).json(result.rows[0]);
        } else {
          res.status(404).json({ error: 'Usuario no encontrado' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
      }
      break;
    case 'DELETE':
      try {
        const result = await pool.query('DELETE FROM usuario WHERE id_usuario = $1 RETURNING *', [id]);
        if (result.rows.length > 0) {
          res.status(200).json({ message: 'Usuario eliminado' });
        } else {
          res.status(404).json({ error: 'Usuario no encontrado' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Método ${method} no permitido`);
      break;
  }
};
