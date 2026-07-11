// Part 2: Writing solutions.js module
// The purpose of the "solutions.js" file is to provide easy access 
// to the Solution data for other files within our assignment that require it.

const solutionData = require("../data/solutionData");
const sectorData = require("../data/sectorData");
let solutions = []; // solutions array, holds the solution objects created by the initialize funtion.

// Initialize function: to fill the "solutions" array, by adding copies of all the solutionData objects.

function initialize() {
  return new Promise((resolve, reject) => {
    try {
      solutions = [];
      solutionData.forEach((solution) => {
        const matchingSector = sectorData.find(
          (sector) => sector.id === solution.sector_id
        );

        solutions.push({
          ...solution,
          sector: matchingSector
            ? matchingSector.sector_name
            : "Unknown Sector",
        });
      });

      resolve();
    } catch (err) {
      reject("Unable to initialize solutions");
    }
  });
}

// getAllSolutions function: returns the complete "solutions" array.

function getAllSolutions() {
  return new Promise((resolve, reject) => {
    if (solutions.length > 0) {
      resolve(solutions);
    } else {
      reject("No solutions are available");
    }
  });
}

// getSolutionById function: returns a specific "solution" object from the "solutions" array, 
//                           whose "id" value matches the value of the "solutionId" parameter.

function getSolutionById(solutionId) {
  return new Promise((resolve, reject) => {
    const solution = solutions.find(
      (s) => s.id === Number(solutionId)
    );

    if (solution) {
      resolve(solution);
    } else {
      reject("Cannot find the requested solution");
    }
  });
}

// getSolutionsBySector function: returns an array of "solution" objects from the "solutions" array, 
//                                whose "sector" value matches the value of the "sector" parameter.

function getSolutionsBySector(sector) {
  return new Promise((resolve, reject) => {
    const matchingSolutions = solutions.filter((s) =>
      s.sector.toLowerCase().includes(sector.toLowerCase())
    );

    if (matchingSolutions.length > 0) {
      resolve(matchingSolutions);
    } else {
      reject("Cannot find the requested solutions");
    }
  });
}

module.exports = {
  initialize,
  getAllSolutions,
  getSolutionById,
  getSolutionsBySector,
};