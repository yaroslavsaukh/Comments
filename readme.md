This is a simple comment project written using express.js. In it you can create captioned comments and leave an unlimited number of comments on them. You can also leave replies to replies with an unlimited level of nesting. In order to leave a comment, you must first register or log in.

Here are the routes for registration 

    /api/auth/register
and login

    /api/auth/login

Here are examples of parameters that are passed to

register

![register](examples/registration.png)

login
![login](examples/login.png)

In both routes, as a result, you will receive a JWT token for the ability to receive information and also add a comment.

Like that
```
{
    "user": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0dHR0dCIsImVtYWlsIjoidGVzdHR0dHRnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDIzLTEwLTMwVDE3OjU0OjE0LjAzNVoiLCJpYXQiOjE2OTg2ODg0NTQsImV4cCI6MTY5ODc3NDg1NH0.3v7232cx0hCwU8xtRlZM_6H8y8e3l151jVzqaKazp6E"
}
```
