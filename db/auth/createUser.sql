INSERT INTO Users ("username", "email", "password", "friend_code", "tier")
   VALUES (${username}, ${email}, ${password}, ${friend_code}, null)
   RETURNING *;