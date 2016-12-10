INSERT INTO users
(firstname, lastname, email, password, gender, bdaymonth, bdayday, bdayyear, profile_pic, cover_photo)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, 'https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg', 'http://localhost:8080/assets/images/default.jpg');
