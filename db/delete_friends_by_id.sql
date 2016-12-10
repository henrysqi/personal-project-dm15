delete from friends
where (sender = $1 and receiver = $2) or
(sender = $2 and receiver = $1)
