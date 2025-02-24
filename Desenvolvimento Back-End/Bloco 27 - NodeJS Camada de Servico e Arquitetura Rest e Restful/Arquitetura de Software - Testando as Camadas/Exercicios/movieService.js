// const MovieModel = require('../models/movieModel');

// const getNewMovie = (movieData) => {
//   const { id, title, directedBy, releaseYear } = movieData;

//   return { id, title, directedBy, releaseYear };
// };

// const isValid = (title, directedBy, releaseYear) => {
//   if (!title || typeof title !== 'string') return false;
//   if (!releaseYear || typeof releaseYear !== 'number') return false;
//   if (!directedBy || typeof directedBy !== 'string') return false;

//   return true;
// };

// const getAll = async () => {
//   const moviesData = await MovieModel
//     .getAll();

//   return moviesData.map(getNewMovie);
// };

const findById = async (id) => {
  const movieData = await MovieModel
    .findById(id);

  if (!movieData) return null;

  return getNewMovie(movieData);
};

// const create = async ({ title, directedBy, releaseYear }) => {
//   const isMovieValid = isValid(title, directedBy, releaseYear);

//   if (!isMovieValid) return false;

//   const { id } = await MovieModel
//     .create({ title, directedBy, releaseYear });

//   return {
//     id,
//   };
// };

// module.exports = {
//   create,
//   getAll,
//   findById,
// };