Super Important:
After 30 days of inactivity, the mongoDB Atlas cluster will be deactivated and I will have to ask for reactivation.

To bring the deployment up, run:
heroku ps:scale web=1

To bring the deployment down, run:
heroku ps:scale web=0

To check the deployment's dyno status, run:
heroku ps
*Note1: "No dynos on <app_name>" means it's down and you'll need to run the deployment up command
*Note2: A deployment's maintenance status is not taken into account by this command

To put the deployment into maintenance mode, run:
heroku maintenance:on
*Note3: A deployment can be in maintenance even while downed by 'heroku ps:scale web=0'

To bring the deployment out of maintenance mode, run:
heroku maintenance:off

To check the deployment's maintenance mode status, run:
heroku maintenance