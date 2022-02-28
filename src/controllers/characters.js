import { Op } from '@sequelize/core';
import { Characters, CharactersMovies, Movies } from '../config/relations.js';

export const addCharacter = async (req, res) => {
  try {
    const characterExists = await Characters.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (characterExists) {
      return res.status(400).json({
        success: false,
        content: null,
        message: `The Character ${req.body.name} already exists`,
      });
    }
    const newCharacter = await Characters.create({
      image: req.body.image,
      name: req.body.name,
      age: req.body.age,
      weight: req.body.weight,
      history: req.body.history,
    });
    const newRelation = await CharactersMovies.create({
      characterId: newCharacter.id,
      movieId: req.body.movieId,
    });
    const data = {
      newCharacter,
      newRelation,
    };
    return res.status(201).json({
      success: true,
      content: data,
      message: `The Character ${req.body.name} has been created`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error.message,
      message: `Error creating the character ${req.body.name}`,
    });
  }
};

export const showCharacters = async (req, res) => {
  try {
    const { name, weight, age, movie } = req.query;
    if (name) {
      const characters = await Characters.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
      });
      if (characters.length > 0) {
        const data = characters.map((character) => {
          return {
            image: character.image,
            name: character.name,
          };
        });
        return res.status(200).json({
          success: true,
          content: data,
          message: `Characters with name ${name}`,
        });
      } else {
        return res.status(404).json({
          success: false,
          content: null,
          message: `No characters with name ${name}`,
        });
      }
    } else if (weight) {
      const characters = await Characters.findAll({
        where: {
          weight: {
            [Op.eq]: weight,
          },
        },
      });
      if (characters.length > 0) {
        const data = characters.map((character) => {
          return {
            image: character.image,
            name: character.name,
          };
        });
        return res.status(200).json({
          success: true,
          content: data,
          message: `Characters with ${weight} kg`,
        });
      } else {
        return res.status(404).json({
          success: false,
          content: null,
          message: `No characters with ${weight} kg`,
        });
      }
    } else if (age) {
      const characters = await Characters.findAll({
        where: {
          age: {
            [Op.eq]: age,
          },
        },
      });
      if (characters.length > 0) {
        const data = characters.map((character) => {
          return {
            image: character.image,
            name: character.name,
          };
        });
        return res.status(200).json({
          success: true,
          content: data,
          message: `Characters with ${age} years old`,
        });
      } else {
        return res.status(404).json({
          success: false,
          content: null,
          message: `No characters with ${age} years old`,
        });
      }
    } else if (movie) {
      const characters = await Characters.findAll({
        include: [
          {
            model: Movies,
            where: {
              id: movie,
            },
          },
        ],
      });
      if (characters.length > 0) {
        const data = characters.map((character) => {
          return {
            image: character.image,
            name: character.name,
          };
        });
        return res.status(200).json({
          success: true,
          content: data,
          message: `Characters with movie ${movie}`,
        });
      } else {
        return res.status(404).json({
          success: false,
          content: null,
          message: `No characters with in that movie`,
        });
      }
    } else {
      const characters = await Characters.findAll();
      if (characters.length > 0) {
        const data = characters.map((character) => {
          return {
            image: character.image,
            name: character.name,
          };
        });
        return res.status(200).json({
          success: true,
          content: data,
          message: `All characters retrieved`,
        });
      } else {
        return res.status(404).json({
          success: false,
          content: null,
          message: `No characters found`,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error.message,
      message: 'Error retrieving the Characters',
    });
  }
};

export const updateCharacter = async (req, res) => {
  try {
    const characterExists = await Characters.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (characterExists) {
      const updatedCharacter = await Characters.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).json({
        success: true,
        content: updatedCharacter,
        message: `The Character ${req.body.name} has been updated`,
      });
    } else {
      return res.status(400).json({
        success: false,
        content: error.message,
        message: `The Character ${req.body.name} does not exists`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error.message,
      message: `Error updating the Character ${req.body.name}`,
    });
  }
};

export const deleteCharacter = async (req, res) => {
  try {
    const characterExists = await Characters.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (characterExists) {
      const deletedCharacter = await Characters.destroy({
        where: {
          id: req.params.id,
        },
      });
      const deletedRelation = await CharactersMovies.destroy({
        where: {
          characterId: req.params.id,
        },
      });
      const data = {
        deletedCharacter,
        deletedRelation,
      };
      return res.status(200).json({
        success: true,
        content: data,
        message: `The character has been deleted`,
      });
    } else {
      return res.status(400).json({
        success: false,
        content: error.message,
        message: `The character does not exists`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error.message,
      message: `Error deleting the character`,
    });
  }
};

export const characterDetails = async (req, res) => {
  try {
    const character = await Characters.findOne({
      where: {
        id: req.params.id,
      },
      include: Movies,
    });
    if (character) {
      return res.status(200).json({
        success: true,
        content: character,
        message: `The character ${req.body.name} has been retrieved`,
      });
    } else {
      return res.status(400).json({
        success: false,
        content: error.message,
        message: `The character ${req.body.name} does not exists`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error.message,
      message: `Error retrieving the character ${req.body.name}`,
    });
  }
};
