This is a simple comment project written using express.js. In it, you can create captioned comments and leave an unlimited number of comments on them. You can also leave replies to replies with an unlimited level of nesting. In order to leave a comment, you must first register or log in.

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

In order to add a comment you need to go to the route

    /api/comments/create
here is fields that need to be sent
![comment_creation](examples/comment_creation.png)


To create a header comment you do not need to pass the parentId field

As a result you will get JSON object wit your comment
```
{
    "comment": {
        "id": 8,
        "text": "gi",
        "UserId": 1,
        "updatedAt": "2023-10-30T17:56:43.671Z",
        "createdAt": "2023-10-30T17:56:43.671Z"
    }
}
```
If you added the parentId field you will get
```
{
    "comment": {
        "id": 9,
        "text": "gi",
        "parentId": "4",
        "UserId": 1,
        "updatedAt": "2023-10-31T11:41:24.940Z",
        "createdAt": "2023-10-31T11:41:24.940Z"
    }
}
```

To get list of comments you need to send GET request to the route

    /api/comments/list

Also, you can add some query parameters

![list](examples/list.png)

To get only one comment you need to send GET request to the route

    /api/comments/:id
In this route **:id** is an Id of header comment

Alo you can get information about you through the route

    /api/user/self
All you need to add is an authorization header

In the response you will receive something like this

```
{
    "id": 1,
    "username": "testtt",
    "email": "testtt@gmail.com",
    "avatar": "avatars/1698598128275rP0ChoKVtxLDmYd9jHjjYBnH.jpg",
    "createdAt": "2023-10-29T16:48:48.365Z",
    "updatedAt": "2023-10-29T16:48:48.365Z"
}
```

You can test all this routes via the deployed version of this application through the link

[https://comments-test-2d55759eb36c.herokuapp.com](https://comments-test-2d55759eb36c.herokuapp.com)

Also, you can download **comments.tar** file. It contains docker image of this application. After downloading tou should run this command:

    docker load --input comments.tar

Then you should run something like this:

    docker run -p 4000:4000 --name comments-task-try comments-task:1.0.0

By doing this you can run this application locally on **localhost:4000**
