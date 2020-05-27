INSERT INTO Games (id, "user_id", "name", "description", "creation_date", "last_played")
   VALUES (${id}, ${userId}, 'New Game', null, ${creationDate}, null);

SELECT * FROM Games
   WHERE "user_id" = ${userId};