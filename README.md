# Express Camp
It's camp in more ways than one.
## Why does this exist?
This website is the by-product of me learning express. It's not identical to the code from the online course, but it definitely follows along with the course.

## What do I need to run this myself?
I cannot recommend using this for much of anything serious, but if you (like me) are learning express, here's what you need to know:

### Environment Variables
- DATABASEURL   : Used by Heroku. Must link to a mongodb. Defaults to 'mongodb://localhost/express_camp'
- PORT          : Used by Heroku. Allows to Heroku to tell the server which port is correct. Defaults to 3000
- EXPRESSSECRET : Used to sign the session ID cookie and help prevent session hijacking. Can be any long string of characters, but best as a long string of random characters. The default is only there for when I am running the server locally.

The source code should readily work with Heroku, as that is what I'm using.
You can see the server running as a Heroku app at: https://express-camp.herokuapp.com/


#### Note about the repo itself
This git repo was originally only created to assist in getting the code on Heroku. I tried my best to give it a real commit history that is accurate to the code's history, but there were a lot more stages. I may rebase a ton of this later to incorporate the many other directories holding distinct versions of the server. But that effort might be better spent on using the knowledge to make another website I can show off more; don't hold your breath for me to give this repo a ton of attention.