import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Book = sequelize.define('Book', {
  title: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  genre: { type: DataTypes.STRING, allowNull: false }
});

export default Book;
