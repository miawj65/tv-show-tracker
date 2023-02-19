const express = require('express');
const path = require('path');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../tv-show-tracker/build')));

const sql = require("mssql");
const config = {
    user: 'sqladmin',
    password: 'V@lidat3',
    server: 'tvshowtracker.database.windows.net',
    database: 'TVShowTracker',
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}

app.post("/api/addUpdateUsers", (req, res) => {
    try {
        const pool = new sql.ConnectionPool(config, function () {
            let request = new sql.Request(pool);
            request.input("Username", sql.NVarChar, req.body.username);
            request.execute("dbo.Users_AddUpdate", (error, result) => {
                res.send(result);
            });
        });
    } catch (error) {
        res.send(error);
    }
});

app.post("/api/addUpdateTVShows", (req, res) => {
    try {
        const pool = new sql.ConnectionPool(config, function () {
            let request = new sql.Request(pool);
            request.input("TVShowID", sql.NVarChar, req.body.tvShowId);
            request.input("Name", sql.NVarChar, req.body.name);
            request.input("UserID", sql.Int, req.body.userId);
            request.execute("dbo.TVShows_AddUpdate", (error, result) => {
                res.send(result);
            });
        });
    }
    catch (error) {
      res.send(error);
    }
});

app.post("/api/deleteTVShows", (req, res) => {
    try {
        const pool = new sql.ConnectionPool(config, function () {
            let request = new sql.Request(pool);
            request.input("TVShowID", sql.NVarChar, req.body.tvShowId);
            request.input("UserID", sql.Int, req.body.userId);
            request.execute("dbo.TVShows_Delete", (error, result) => {
                res.send(result);
            });
        });
    }
    catch (error) {
      res.send(error);
    }
});

app.post("/api/addUpdateEpisodes", (req, res) => {
    try {
        const pool = new sql.ConnectionPool(config, function () {
            let request = new sql.Request(pool);
            request.input("EpisodeID", sql.NVarChar, req.body.episodeId);
            request.input("Name", sql.NVarChar, req.body.name);
            request.input("TVShowID", sql.NVarChar, req.body.tvShowId);
            request.input("UserID", sql.Int, req.body.userId);
            request.execute("dbo.Episodes_AddUpdate", (error, result) => {
                res.send(result);
            });
        });
    }
    catch (error) {
      res.send(error);
    }
});

app.post("/api/deleteEpisodes", (req, res) => {
    try {
        const pool = new sql.ConnectionPool(config, function () {
            let request = new sql.Request(pool);
            request.input("EpisodeID", sql.NVarChar, req.body.episodeId);
            request.input("UserID", sql.Int, req.body.userId);
            request.execute("dbo.Episodes_Delete", (error, result) => {
                res.send(result);
            });
        });
    }
    catch (error) {
      res.send(error);
    }
});

app.post("/api/getTVShows", (req, res) => {
    try {
        const pool = new sql.ConnectionPool(config, function () {
            let request = new sql.Request(pool);
            request.input("UserID", sql.Int, req.body.userId);
            request.execute("dbo.TVShows_GetByUser", (error, result) => {
                res.send(result);
            });
        });
    } catch (error) {
        res.send(error);
    }
});

app.post("/api/getEpisodes", (req, res) => {
    try {
        const pool = new sql.ConnectionPool(config, function () {
            let request = new sql.Request(pool);
            request.input("TVShowID", sql.NVarChar, req.body.tvShowId);
            request.input("UserID", sql.Int, req.body.userId);
            request.execute("dbo.Episodes_GetByTVShow", (error, result) => {
                res.send(result);
            });
        });
    }
    catch (error) {
      res.send(error);
    }
});

app.get('/', (req,res) => {
  res.send(`<h1>API Running on the port ${port}</h1>`);
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});