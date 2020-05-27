DROP TABLE IF EXISTS Ship_weapons;
DROP TABLE IF EXISTS Weapons;
DROP TABLE IF EXISTS Squadron_ships;
DROP TABLE IF EXISTS Ships;
DROP TABLE IF EXISTS Squadrons;
DROP TABLE IF EXISTS Fleets;
DROP TABLE IF EXISTS Settlements;
DROP TABLE IF EXISTS Services;
DROP TABLE IF EXISTS Planet_owners;
DROP TABLE IF EXISTS Planets;
DROP TABLE IF EXISTS Resources;
DROP TABLE IF EXISTS Technology;
DROP TABLE IF EXISTS System_owners;
DROP TABLE IF EXISTS Systems;
DROP TABLE IF EXISTS Galaxies;
DROP TABLE IF EXISTS Players;
DROP TABLE IF EXISTS Games;
DROP TABLE IF EXISTS Activity_reactions;
DROP TABLE IF EXISTS Friends;
DROP TABLE IF EXISTS Activity;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
     id SERIAL     PRIMARY KEY
   , "username"    TEXT
   , "password"    TEXT
   , "email"       TEXT
   , "friend_code" CHAR(19)
   , "tier"        TEXT
);
INSERT INTO Users ("username", "password", "email", "friend_code", "tier")
   VALUES ('a', 'a', 'a@email.com', '1234-1234-1234-1234', 'advanced');
INSERT INTO Users ("username", "password", "email", "friend_code", "tier")
   VALUES ('b', 'b', 'b@email.com', '4321-4321-4321-4321', null);

CREATE TABLE Activity (
     id SERIAL     PRIMARY KEY
   , "user_id"     INTEGER REFERENCES Users(id)
   , "title"       TEXT
   , "image"       TEXT
   , "description" TEXT
   , "date"        TIMESTAMPTZ
);

CREATE TABLE Friends (
     id SERIAL   PRIMARY KEY
   , "user_id"   INTEGER REFERENCES Users(id)
   , "friend_id" INTEGER REFERENCES Users(id)
);
INSERT INTO Friends ("user_id", "friend_id") VALUES (1, 2);

CREATE TABLE Activity_reactions (
     id SERIAL     PRIMARY KEY
   , "activity_id" INTEGER REFERENCES Activity(id)
   , "friend_id"   INTEGER REFERENCES Friends(id)
);

CREATE TABLE Games (
     id              CHAR(36) NOT NULL PRIMARY KEY
   , "user_id"       INTEGER REFERENCES Users(id)
   , "name"          TEXT
   , "description"   TEXT
   , "creation_date" TIMESTAMP
   , "last_played"   TEXT
);
INSERT INTO Games (id, "user_id", "name", "description")
   VALUES ('12334556781234567890123456', 1, 'Game 1', 'A neat game');
INSERT INTO Games (id, "user_id", "name", "description")
   VALUES ('12334556781234567890654321', 1, 'Game 2', 'A bad game');

CREATE TABLE Players (
     id SERIAL      PRIMARY KEY
   , "game_id"      CHAR(36) REFERENCES Games(id) ON DELETE CASCADE
   , "name"         TEXT
   , "ai"           BOOLEAN
   , "player_score" INTEGER
   , "fuel"         INTEGER
   , "food"         INTEGER
   , "water"        INTEGER
   , "stone"        INTEGER
   , "credits"      INTEGER
);

CREATE TABLE Galaxies (
     id SERIAL PRIMARY KEY
   , "game_id" CHAR(36) REFERENCES Games(id)
   , "name"    TEXT
   , "size"    TEXT
);

CREATE TABLE Systems (
     id SERIAL   PRIMARY KEY
   , "galaxy_id" INTEGER REFERENCES Galaxies(id)
   , "name"      TEXT
   , "x"         SMALLINT
   , "y"         SMALLINT
);

CREATE TABLE System_owners (
     id SERIAL   PRIMARY KEY
   , "system_id" INTEGER REFERENCES Systems(id)
   , "player_id" INTEGER REFERENCES Players(id)
);

CREATE TABLE Technology (
     id SERIAL     PRIMARY KEY
   , "name"        TEXT
   , "description" TEXT
);

CREATE TABLE Resources (
     id SERIAL     PRIMARY KEY
   , "name"        TEXT
   , "description" TEXT
);

CREATE TABLE Planets (
     id SERIAL           PRIMARY KEY
   , "name"              TEXT
   , "system_id"         INTEGER REFERENCES Systems(id)
   , "government"        TEXT
   , "state"             TEXT
   , "resource_id"       INTEGER REFERENCES Resources(id)
   , "resource_quantity" TEXT -- none, low, medium, high
   , "technology"        INTEGER REFERENCES Technology(id)
   , "x"                 SMALLINT
   , "y"                 SMALLINT
);

CREATE TABLE Planet_owners (
     id SERIAL   PRIMARY KEY
   , "planet_id" INTEGER REFERENCES Systems(id)
   , "player_id" INTEGER REFERENCES Players(id)
);

CREATE TABLE Services (
     id SERIAL     PRIMARY KEY
   , "name"        TEXT
   , "description" TEXT
);

CREATE TABLE Settlements (
     id SERIAL     PRIMARY KEY
   , "planet_id"   INTEGER REFERENCES Planets(id)
   , "services_id" INTEGER REFERENCES Services(id)
);

CREATE TABLE Fleets (
     id SERIAL          PRIMARY KEY
   , "game_id"          CHAR(36) REFERENCES Games(id)
   , "player_id"        INTEGER REFERENCES Players(id)
   , "system_location"  INTEGER REFERENCES Systems(id)
   , "planet_location"  INTEGER REFERENCES Planets(id)
   , "max_fuel"         INTEGER
   , "max_food"         INTEGER
   , "fuel"             INTEGER
   , "food"             INTEGER
   , "fuel_consumption" INTEGER
   , "food_consumption" INTEGER
);

CREATE TABLE Squadrons (
     id SERIAL          PRIMARY KEY
   , "fleet_id"         INTEGER REFERENCES Fleets(id)
   , "fuel_consumption" INTEGER
   , "food_consumption" INTEGER
);

CREATE TABLE Ships (
     id SERIAL               PRIMARY KEY
   , "base_fuel_consumption" INTEGER
   , "base_power"            INTEGER
   , "base_speed"            INTEGER
   , "base_hull"             INTEGER
);

CREATE TABLE Squadron_ships (
     id SERIAL          PRIMARY KEY
   , "squadron_id"      INTEGER REFERENCES Squadrons(id)
   , "ship_id"          INTEGER REFERENCES Ships(id)
   , "name"             TEXT
   , "fuel_consumption" INTEGER
   , "role"             TEXT
   , "power"            INTEGER
   , "speed"            INTEGER
   , "max_hull"         INTEGER
   , "hull"             INTEGER
);

CREATE TABLE Weapons (
     id SERIAL     PRIMARY KEY
   , "name"        TEXT
   , "description" TEXT
   , "power"       INTEGER
);

CREATE TABLE Ship_weapons (
     id SERIAL   PRIMARY KEY
   , "ship_id"   INTEGER REFERENCES Squadron_ships(id)
   , "weapon_id" INTEGER REFERENCES Weapons(id)
);
