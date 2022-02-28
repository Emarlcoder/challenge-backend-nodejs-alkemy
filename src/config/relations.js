import characters from '../models/characters.js';
import genres from '../models/genres.js';
import movies from '../models/movies.js';
import users from '../models/users.js';
import charactersMovies from '../models/characters-movies.js';

export const Characters = characters();
export const Movies = movies();
export const Genres = genres();
export const Users = users();
export const CharactersMovies = charactersMovies();

Characters.belongsToMany(Movies, {
  through: CharactersMovies,
  foreignKey: 'characterId'
});
Movies.belongsToMany(Characters, {
  through: CharactersMovies,
  foreignKey: 'movieId'
});

Genres.hasMany(Movies
  , {
    foreignKey: 'genreId'
  })
Movies.belongsTo(Genres,
  {
    foreignKey: 'genreId'
  })

