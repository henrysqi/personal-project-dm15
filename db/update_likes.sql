update posts
set num_likes = num_likes + 1, id = id
where id = $1;
