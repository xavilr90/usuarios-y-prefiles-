
const pool = require('../../../config/database');

export default async (req, res) => {
  const { method, query: { id } } = req;

  switch (method) {
    case 'GET':
      try {
        const result = await pool.query('SELECT * FROM perfil WHERE id_perfil = $1', [id]);
        if (result.rows.length > 0) {
          res.status(200).json(result.rows[0]);
        } else {
          res.status(404).json({ error: 'Perfil no encontrado' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener el perfil' });
      }
      break;
    case 'PUT':
      try {
        const { id_usuario, perfil } = req.body;
        const result = await pool.query(
          'UPDATE perfil SET id_usuario = $1, perfil = $2 WHERE id_perfil = $3 RETURNING *',
          [id_usuario, perfil, id]
        );
        if (result.rows.length > 0) {
          res.status(200).json(result.rows[0]);
        } else {
          res.status(404).json({ error: 'Perfil no encontrado' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el perfil' });
      }
      break;
    case 'DELETE':
      try {
        const result = await pool.query('DELETE FROM perfil WHERE id_perfil = $1 RETURNING *', [id]);
        if (result.rows.length > 0) {
          res.status(200).json({ message: 'Perfil eliminado' });
        } else {
          res.status(404).json({ error: 'Perfil no encontrado' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el perfil' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Método ${method} no permitido`);
      break;
  }
};
