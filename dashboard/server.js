// ========================================
// 🥞 BotPANQUE Dashboard v0.4
// Server
// ========================================

require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const Database = require("better-sqlite3");

require("./auth/discord")(passport);

const app = express();

const PORT = process.env.PORT || 3000;

// ================================
// Middleware
// ================================

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(session({

    secret: process.env.SESSION_SECRET || "botpanque_secret",

    resave: false,

    saveUninitialized: false

}));

app.use(passport.initialize());

app.use(passport.session());

app.use(express.static(

    path.join(__dirname, "public")

));

// ================================
// Database
// ================================

const db = new Database(

    path.join(__dirname, "../src/database/botpanque.db")

);

// ================================
// HOME
// ================================

app.get("/", (req, res) => {

    res.sendFile(

        path.join(

            __dirname,

            "public",

            "index.html"

        )

    );

});

// ================================
// LOGIN DISCORD
// ================================

app.get(

    "/auth/discord",

    passport.authenticate("discord")

);

app.get(

    "/auth/discord/callback",

    passport.authenticate(

        "discord",

        {

            failureRedirect: "/"

        }

    ),

    (req, res) => {

        res.redirect("/dashboard.html");

    }

);

// ================================
// DASHBOARD
// ================================

app.get("/dashboard.html", (req, res) => {

    if (!req.user) {

        return res.redirect("/");

    }

    res.sendFile(

        path.join(

            __dirname,

            "public",

            "dashboard.html"

        )

    );

});

// ================================
// USER API
// ================================

app.get("/api/user", (req, res) => {

    if (!req.user) {

        return res.json({

            logged: false

        });

    }

    res.json({

        logged: true,

        id: req.user.id,

        username: req.user.username,

        avatar: req.user.avatar

    });

});

// ================================
// GUILDS API
// ================================

app.get("/api/guilds", (req, res) => {

    if (!req.user) {

        return res.json([]);

    }

    res.json(

        req.user.guilds || []

    );

});

// ================================
// STATUS
// ================================

app.get("/api/status", (req, res) => {

    res.json({

        bot: "BotPANQUE",

        version: "0.4.0",

        status: "online"

    });

});
// ========================================
// 🥞 SAVE SETTINGS
// ========================================

app.post("/api/settings/:guildId", (req, res) => {

    try {

        const guildId = req.params.guildId;

        const {

            welcomeMessage,

            autoRoleId

        } = req.body;

        db.prepare(`
            INSERT OR IGNORE INTO server_settings
            (guildId)
            VALUES (?)
        `).run(guildId);

        // ===========================
        // 👋 Welcome Message
        // ===========================

        if (welcomeMessage !== undefined) {

            db.prepare(`
                UPDATE server_settings
                SET welcomeMessage = ?
                WHERE guildId = ?
            `).run(
                welcomeMessage,
                guildId
            );

        }

        // ===========================
        // 🎭 AutoRole
        // ===========================

        if (autoRoleId !== undefined) {

            db.prepare(`
                UPDATE server_settings
                SET autoRoleId = ?
                WHERE guildId = ?
            `).run(
                autoRoleId,
                guildId
            );

        }

        res.json({

            success: true

        });

    } catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            error: err.message

        });

    }

});
// ========================================
// 🎭 ROLES API
// ========================================

app.get("/api/roles/:guildId", (req, res) => {

    try {

        const client = req.app.locals.client;

        if (!client) {

            return res.json([]);

        }

        const guild = client.guilds.cache.get(
            req.params.guildId
        );

        if (!guild) {

            return res.json([]);

        }

        const roles = guild.roles.cache

            .filter(role => role.name !== "@everyone")

            .sort((a, b) => b.position - a.position)

            .map(role => ({

                id: role.id,

                name: role.name,

                color: role.hexColor,

                position: role.position

            }));

        res.json(roles);

    } catch (error) {

        console.error(error);

        res.status(500).json([]);

    }

});

// ========================================
// 🌐 Attach Discord Client
// ========================================

app.setClient = (client) => {

    app.locals.client = client;

};

// ========================================
// START
// ========================================

if (require.main === module) {

    app.listen(PORT, () => {

        console.log("--------------------------------");
        console.log("🥞 BotPANQUE Dashboard v0.4");
        console.log("--------------------------------");
        console.log(`🌐 Dashboard Online :${PORT}`);

    });

}

module.exports = app;