UPDATE Games
   SET "name" = ${game_name}
   , "description" = ${game_description}
      WHERE id = ${id};

SELECT * FROM Games
   WHERE "user_id" = ${userId}
   ORDER BY id;