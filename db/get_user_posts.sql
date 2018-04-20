select  posts.id, title, username, profile_pic 
from users3
join  posts 
on users3.id = author_id
where users3.id = $1
and (posts.title like '%' || $2 ||  '%');