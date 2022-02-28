import { DataTypes } from 'sequelize';
import { connection } from '../config/sequelize.js';
import { Characters, Movies } from '../config/relations.js';

export default () =>
  connection.define('charactersMovies', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      field: 'id'
    },
    characterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'characterId',
      references: {
        model: Characters,
        key: 'id'
      }
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'movieId',
      references: {
        model: Movies,
        key: 'id'
      }
    }
  })
