import { Genres } from '../config/relations.js';

export const addGenre = async(req, res) => {
  try{
    const genreExists = await Genres.findOne({
      where: {
        name: req.body.name
      }
    })
    if(genreExists){
      return res.status(400).json({
        success: false,
        content: null,
        message: `The Genre ${req.body.categoriaNombre} already exists`
      })
    }
    const newGenre = await Genres.create(req.body)
    return res.status(201).json({
      success: true,
      content: newGenre,
      message: `The Genre ${req.body.name} has been created`
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error.message,
      message: `Error creating the Genre ${req.body.name}`
    })
  }
}

export const showGenres = async(req, res) => {
  try {
    const genres = await Genres.findAll()
    return res.status(200).json({
      success: true,
      content: genres,
      message: 'Genres retrieved successfully'
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error.message,
      message: 'Error retrieving the genres'
    })
  }
}

export const updateGenre = async(req, res) => {
  try {
    const genreExists = await Genres.findOne({
      where: {
        id: req.params.id
      }
    })
    if (genreExists) {
      const updatedGenre = await Genres.update(req.body, {
        where: {
          id: req.params.id
        }
      })
      return res.status(200).json({
        success: true,
        content: updatedGenre,
        message: `The genre ${req.body.name} has been updated`
      })
    } else {
      return res.status(400).json({
        success: false,
        content: error.message,
        message: `The genre ${req.body.name} does not exists`
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error.message,
      message: `Error updating the genre ${req.body.name}`
    })
  }
}

export const deleteGenre = async(req, res) => {
  try {
    const genreExists = await Genres.findOne({
      where: {
        id: req.params.id
      }
    })
    if (genreExists) {
      const deletedGenre = await Genres.destroy({
        where: {
          id: req.params.id
        }
      })
      return res.status(200).json({
        success: true,
        content: deletedGenre,
        message: `The genre has been deleted`
      })
    } else {
      return res.status(400).json({
        success: false,
        content: error.message,
        message: `The genre does not exists`
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error.message,
      message: `Error deleting the genre`
    })
  }
}