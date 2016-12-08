insert into messages
(sender, receiver, text_content, sender_firstname, sender_lastname, receiver_firstname, receiver_lastname, sender_profile_pic, receiver_profile_pic)
values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
