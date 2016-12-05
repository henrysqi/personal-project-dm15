select *
from users
WHERE firstname ILIKE '%'|| $1 || '%' OR lastname ILIKE '%' || $1 || '%'
-- WHERE firstname ILIKE "%"+$1+"%" OR lastname ILIKE "%"+$1+"%"
