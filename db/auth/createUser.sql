INSERT INTO Users (id, "username", "email", "password", "friend_code", "tier")
   VALUES (${id}, ${username}, ${email}, ${password}, ${friend_code}, null)
   RETURNING *;