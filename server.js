/********************************************************************************
*  WEB322 – Assignment 02
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Juwairiyyah Ahmed Student ID: 17380134 Date: 2026-07-10
*
*  Published URL: https://web-sum26-3ydn.vercel.app
********************************************************************************/

/* Goal: Build upon Assignment 1 by adding a custom landing page with links to various climate solutions,
         as well as an "about" page and custom 404 error page.  Additionally, we will be updating our server.js
         file to support more dynamic routes, views, status codes and static content (css).  
*/

// Part 4: Writing server.js file

const express = require("express");
const path = require("path");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const solutionData = require("./modules/solutions");


// the ejs configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// the middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// the Home page
app.get("/", (req, res) => {
    res.render("home");
});

// the About page
app.get("/about", (req, res) => {
    res.render("about");
});

// the Solutions page
app.get("/explorer/solutions", (req, res) => {
    if (req.query.sector) {

        solutionData
            .getSolutionsBySector(req.query.sector)
            .then((solutions) => {

                if (solutions.length > 0) {
                    res.render("solutions", {
                        solutions: solutions
                    });

                } else {
                    res.status(404).render("404", {
                        message:
                            `No solutions found for sector: ${req.query.sector}`
                    });
                }
            })

            .catch((err) => {
                res.status(404).render("404", {
                    message: err
                });
            });

    } else {


        solutionData
            .getAllSolutions()
            .then((solutions) => {
                res.render("solutions", {
                    solutions: solutions
                });

            })

            .catch((err) => {
                res.status(404).render("404", {
                    message: err
                });

            });
    }
});



// the Single solution details
app.get("/explorer/solutions/:id", (req, res) => {
    solutionData
        .getSolutionById(req.params.id)
        .then((solution) => {
            res.render("solution", {
                solution: solution
            });
        })

        .catch((err) => {
            res.status(404).render("404", {
                message: err
            });
        });
});



// the custom 404 error page for all other undefined routes
app.use((req, res) => {
    res.status(404).render("404", {
        message:
            "I'm sorry, we're unable to find what you're looking for."
    });
});



// Initialize the data
solutionData
    .initialize()
    .then(() => {
        console.log("Initialization successful");
    })
    .catch((err) => {
        console.log("Initialization error:");
        console.log(err);
    });
module.exports = app;