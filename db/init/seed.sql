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
     id            CHAR(36) NOT NULL PRIMARY KEY
   , "username"    TEXT
   , "password"    TEXT
   , "email"       TEXT
   , "friend_code" CHAR(19)
   , "tier"        TEXT
);
INSERT INTO Users (id, "username", "password", "email", "friend_code", "tier")
   VALUES ('123412341234123412341234121234567890', 'a', 'a', 'a@email.com', '1234-1234-1234-1234', 'advanced');
INSERT INTO Users (id, "username", "password", "email", "friend_code", "tier")
   VALUES ('123412341234123412341234211234567890', 'b', 'b', 'b@email.com', '4321-4321-4321-4321', null);

CREATE TABLE Activity (
     id            CHAR(36) NOT NULL PRIMARY KEY
   , "user_id"     CHAR(36) REFERENCES Users(id)
   , "title"       TEXT
   , "image"       TEXT
   , "description" TEXT
   , "date"        TIMESTAMPTZ
);

CREATE TABLE Friends (
     id          CHAR(36) NOT NULL PRIMARY KEY
   , "user_id"   CHAR(36) REFERENCES Users(id)
   , "friend_id" CHAR(36) REFERENCES Users(id)
);
INSERT INTO Friends (id, "user_id", "friend_id")
   VALUES (
      '123321123321123321123321123212345678'
      , '123412341234123412341234121234567890'
      , '123412341234123412341234211234567890'
   );

CREATE TABLE Activity_reactions (
     id            CHAR(36) NOT NULL PRIMARY KEY
   , "activity_id" CHAR(36) REFERENCES Activity(id)
   , "friend_id"   CHAR(36) REFERENCES Friends(id)
);

CREATE TABLE Games (
     id              CHAR(36) NOT NULL PRIMARY KEY
   , "user_id"       CHAR(36) REFERENCES Users(id)
   , "name"          TEXT
   , "description"   TEXT
   , "creation_date" TIMESTAMP
   , "last_played"   TEXT
);
INSERT INTO Games (id, "user_id", "name", "description")
   VALUES ('123345567812345678901234561234567890', '123412341234123412341234121234567890', 'Game 1', 'A neat game');
INSERT INTO Games (id, "user_id", "name", "description")
   VALUES ('123345567812345678906543211234567890', '123412341234123412341234121234567890', 'Game 2', 'A bad game');

CREATE TABLE Players (
     id             CHAR(36) NOT NULL PRIMARY KEY
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
     id        CHAR(36) NOT NULL PRIMARY KEY
   , "game_id" CHAR(36) REFERENCES Games(id)
   , "name"    TEXT
   , "size_x"  INTEGER
   , "size_y"  INTEGER
);
INSERT INTO Galaxies (id, "game_id", "name", "size_x", "size_y")
   VALUES ('11111111122222222223333333333444444', '123345567812345678901234561234567890', 'gal 1', 10, 10);

CREATE TABLE Systems (
     id          CHAR(36) NOT NULL PRIMARY KEY
   , "galaxy_id" CHAR(36) REFERENCES Galaxies(id)
   , "name"      TEXT
   , "x"         SMALLINT
   , "y"         SMALLINT
);

CREATE TABLE System_owners (
     id          CHAR(36) NOT NULL PRIMARY KEY
   , "system_id" CHAR(36) REFERENCES Systems(id)
   , "player_id" CHAR(36) REFERENCES Players(id)
);

CREATE TABLE Technology (
     id            CHAR(36) NOT NULL PRIMARY KEY
   , "name"        TEXT
   , "description" TEXT
);

CREATE TABLE Resources (
     id            CHAR(36) NOT NULL PRIMARY KEY
   , "name"        TEXT
   , "description" TEXT
);

CREATE TABLE Planets (
     id                  CHAR(36) NOT NULL PRIMARY KEY
   , "name"              TEXT
   , "system_id"         CHAR(36) REFERENCES Systems(id)
   , "government"        TEXT
   , "state"             TEXT
   , "resource_id"       CHAR(36) REFERENCES Resources(id)
   , "resource_quantity" TEXT -- none, low, medium, high
   , "technology"        CHAR(36) REFERENCES Technology(id)
   , "x"                 SMALLINT
   , "y"                 SMALLINT
);

CREATE TABLE Planet_owners (
     id          CHAR(36) NOT NULL PRIMARY KEY
   , "planet_id" CHAR(36) REFERENCES Systems(id)
   , "player_id" CHAR(36) REFERENCES Players(id)
);

CREATE TABLE Services (
     id            CHAR(36) NOT NULL PRIMARY KEY
   , "name"        TEXT
   , "description" TEXT
);

CREATE TABLE Settlements (
     id            CHAR(36) NOT NULL PRIMARY KEY
   , "planet_id"   CHAR(36) REFERENCES Planets(id)
   , "services_id" CHAR(36) REFERENCES Services(id)
);

CREATE TABLE Fleets (
     id                 CHAR(36) NOT NULL PRIMARY KEY
   , "game_id"          CHAR(36) REFERENCES Games(id)
   , "player_id"        CHAR(36) REFERENCES Players(id)
   , "system_location"  CHAR(36) REFERENCES Systems(id)
   , "planet_location"  CHAR(36) REFERENCES Planets(id)
   , "max_fuel"         INTEGER
   , "max_food"         INTEGER
   , "fuel"             INTEGER
   , "food"             INTEGER
   , "fuel_consumption" INTEGER
   , "food_consumption" INTEGER
);

CREATE TABLE Squadrons (
     id                 CHAR(36) NOT NULL PRIMARY KEY
   , "fleet_id"         CHAR(36) REFERENCES Fleets(id)
   , "fuel_consumption" INTEGER
   , "food_consumption" INTEGER
);

CREATE TABLE Ships (
     id                      CHAR(36) NOT NULL PRIMARY KEY
   , "base_fuel_consumption" INTEGER
   , "base_power"            INTEGER
   , "base_speed"            INTEGER
   , "base_hull"             INTEGER
);

CREATE TABLE Squadron_ships (
     id                 CHAR(36) NOT NULL PRIMARY KEY
   , "squadron_id"      CHAR(36) REFERENCES Squadrons(id)
   , "ship_id"          CHAR(36) REFERENCES Ships(id)
   , "name"             TEXT
   , "fuel_consumption" INTEGER
   , "role"             TEXT
   , "power"            INTEGER
   , "speed"            INTEGER
   , "max_hull"         INTEGER
   , "hull"             INTEGER
);

CREATE TABLE Weapons (
     id            CHAR(36) NOT NULL PRIMARY KEY
   , "name"        TEXT
   , "description" TEXT
   , "power"       INTEGER
);

CREATE TABLE Ship_weapons (
     id          CHAR(36) NOT NULL PRIMARY KEY
   , "ship_id"   CHAR(36) REFERENCES Squadron_ships(id)
   , "weapon_id" CHAR(36) REFERENCES Weapons(id)
);
