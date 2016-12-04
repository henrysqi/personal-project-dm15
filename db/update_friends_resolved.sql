update friends
set resolved = true
where sender = $1 and receiver = $2
