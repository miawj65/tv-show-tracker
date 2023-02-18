const sql = require("mssql");
const connectionString = "Server=tcp:tvshowtracker.database.windows.net,1433;Initial Catalog=TVShowTracker;Persist Security Info=False;User ID=sqladmin;Password={your_password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

export async function addUpdateUsers(username) {
    try {
        await sql.connect(connectionString);
        const request = new sql.Request();
        request.input("Username", sql.NVarChar, username);
        request.execute("dbo.Users_AddUpdate", (error, result) => {
            console.log(result);
        });
    }
    catch (error) {
      console.log(error);
    }
}

export async function addUpdateTVShows(tvShowId, name, userId) {
    try {
        await sql.connect(connectionString);
        const request = new sql.Request();
        request.input("TVShowID", sql.Int, tvShowId);
        request.input("Name", sql.NVarChar, name);
        request.input("UserID", sql.Int, userId);
        request.execute("dbo.TVShows_AddUpdate", (error, result) => {
            console.log(result);
        });
    }
    catch (error) {
      console.log(error);
    }
}

export async function addUpdateEpisodes(episodeId, name, tvShowId) {
    try {
        await sql.connect(connectionString);
        const request = new sql.Request();
        request.input("EpisodeID", sql.Int, episodeId);
        request.input("Name", sql.NVarChar, name);
        request.input("TVShowID", sql.Int, tvShowId);
        request.execute("dbo.Episodes_AddUpdate", (error, result) => {
            console.log(result);
        });
    }
    catch (error) {
      console.log(error);
    }
}

export async function getTVShows(userId) {
    try {
        await sql.connect(connectionString);
        const request = new sql.Request();
        request.input("UserID", sql.Int, userId);
        request.execute("dbo.TVShows_GetByUser", (error, result) => {
            console.log(result);
        });
    }
    catch (error) {
      console.log(error);
    }
}

export async function getEpisodes(tvShowId) {
    try {
        await sql.connect(connectionString);
        const request = new sql.Request();
        request.input("TVShowID", sql.Int, tvShowId);
        request.execute("dbo.Episodes_GetByTVShow", (error, result) => {
            console.log(result);
        });
    }
    catch (error) {
      console.log(error);
    }
}