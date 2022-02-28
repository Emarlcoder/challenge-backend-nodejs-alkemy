import { Op } from '@sequelize/core';
import { CharactersMovies, Movies } from '../config/relations.js';

export const addMovie = async (req, res) => {
  try {
    const movieExists = await Movies.findOne({
      where: {
        title: req.body.title,
      },
    });
    if (movieExists) {
      return res.status(400).json({
        success: false,
        content: null,
        message: `The Movie ${req.body.title} already exists`,
      });
    }
    const newMovie = await Movies.create({
      image: req.body.image,
      title: req.body.title,
      release_date: req.body.release_date,
      rate: req.body.rate,
      genreId: req.body.genreId,
    });
    return res.status(201).json({
      success: true,
      content: newMovie,
      message: `The Movie ${req.body.title} has been created`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error.message,
      message: `Error creating the Movie ${req.body.title}`,
    });
  }
};

export const showMovies = async (req, res) => {
  try {
    const { name, genre, order } = req.query;
    if (name) {
      const movies = await Movies.findAll({
        where: {
          title: {
            [Op.like]: `%${name}%`,
          },
        },
      });
      if (movies.length > 0) {
        const data = movies.map((movie) => {
          return {
            image: movie.image,
            title: movie.title,
            creationDate: movie.release_date,
          };
        });
        return res.status(200).json({
          success: true,
          content: data,
          message: `Movies with title ${name}`,
        });
      } else {
        return res.status(404).json({
          success: false,
          content: null,
          message: `No movies with title ${name}`,
        });
      }
    } else if (genre) {
      const movies = await Movies.findAll({
        where: {
          genreId: genre,
        },
      });
      if (movies.length > 0) {
        const data = movies.map((movie) => {
          return {
            image: movie.image,
            title: movie.title,
            creationDate: movie.release_date,
          };
        });
        return res.status(200).json({
          success: true,
          content: data,
          message: `Movies with specified genre`,
        });
      } else {
        return res.status(404).json({
          success: false,
          content: null,
          message: `No movies found`,
        });
      }
    } else if (order) {
      const movies = await Movies.findAll({
        order: [['release_date', order]],
      });
      if (movies.length > 0) {
        const data = movies.map((movie) => {
          return {
            image: movie.image,
            title: movie.title,
            creationDate: movie.release_date,
          };
        });
        return res.status(200).json({
          success: true,
          content: data,
          message: `Movies ordered by ${order}`,
        });
      } else {
        return res.status(404).json({
          success: false,
          content: null,
          message: `No movies found`,
        });
      }
    } else {
      const movies = await Movies.findAll();
      if (movies.length > 0) {
        const data = movies.map((movie) => {
          return {
            image: movie.image,
            title: movie.title,
            creationDate: movie.release_date,
          };
        });
        return res.status(200).json({
          success: true,
          content: data,
          message: `All Movies`,
        });
      } else {
        return res.status(404).json({
          success: false,
          content: null,
          message: `No movies found`,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error.message,
      message: 'Error retrieving the movies',
    });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const movieExists = await Movies.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (movieExists) {
      const updatedmovie = await Movies.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).json({
        success: true,
        content: updatedmovie,
        message: `The movie ${req.body.title} has been updated`,
      });
    } else {
      return res.status(400).json({
        success: false,
        content: error.message,
        message: `The movie ${req.body.title} does not exists`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error.message,
      message: `Error updating the movie ${req.body.title}`,
    });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const movieExists = await Movies.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (movieExists) {
      const deletedmovie = await Movies.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).json({
        success: true,
        content: deletedmovie,
        message: `The movie has been deleted`,
      });
    } else {
      return res.status(400).json({
        success: false,
        content: error.message,
        message: `The movie does not exists`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error.message,
      message: `Error deleting the movie`,
    });
  }
};

export const movieDetails = async (req, res) => {
  try {
    const movie = await Movies.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (movie) {
      const characters = await CharactersMovies.findAll({
        where: {
          movieId: req.params.id,
        },
      });
      const data = {
        movie,
        characters,
      };
      return res.status(200).json({
        success: true,
        content: data,
        message: `The movie ${req.body.title} has been retrieved`,
      });
    } else {
      return res.status(400).json({
        success: false,
        content: error.message,
        message: `The movie does not exists`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error.message,
      message: `Error retrieving the movie`,
    });
  }
};
