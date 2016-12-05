INSERT INTO users
(firstname, lastname, email, password, gender, bdaymonth, bdayday, bdayyear, profile_pic, cover_photo)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, 'assets\images\defprofpic.jpg', 'assets\images\default.jpg');
