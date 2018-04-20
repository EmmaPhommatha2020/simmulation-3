select  posts.id, title, img, content, username, profile_pic 
from users3
join  posts 
on users3.id = author_id
where posts.id = $1