create table users3 (
    id serial PRIMARY KEY,
    username varchar(20),
    password varchar(20),
    profile_pic TEXT
);

insert into users3 (username, password, profile_pic) 
values ('Emma', '1', 'https://robohash.org/username.png');

insert into users3 (username, password, profile_pic) 
values ('Jenny', '2', 'https://robohash.org/usernam.png');

insert into users3 (username, password, profile_pic) 
values ('Don', '3', 'https://robohash.org/usern.png');

insert into users3 (username, password, profile_pic) 
values ('Tim', '4', 'https://robohash.org/user.png');





create table posts (
    id serial primary key,
    title varchar(45),
    img text,
    content text,
    author_id integer references users(id)
);

insert into posts (title, img, content, author_id) 
values ('Test1', 'src=whatever', 'content', 1);

insert into posts (title, img, content, author_id) 
values ('Test2', 'src=whatever', 'content', 2);



