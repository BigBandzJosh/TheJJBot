# TheJJBot Documentation
Welcome to TheJJBot! This is a Discord bot that is used to provide a few fun commands, and useful things inside your Discord server! This bot is currently in
development, it functions as it stands, but it needs work. If you have any suggestions for commands, or to give the bot a specific purpose, please feel free to 
reach out to us on Github. 


# Table of Contents
1. [Command List](#commands)
2. [Installation](#installation)
    1. [Requirements](#requirements)
    2. [Setup](#setup)

## Commands
1. Utility Commands
    1. `/help` - Displays a list of all available commands
    2. `/define` - Gives you the definition of a given word
    3. `/event` - Creates an event in the channel the command was ran in that will remind you 1-3 days before your given date
    4. `/poll` - Creates a poll in the channel the command was ran in. The poll closes after a user given amount of time
    5. `/stats` - Displays the amount of commands & messages you've sent with the bot
2. Server Commands
    1. `/changelog` - Unimplemented feature (COMING SOON)
    2. `/fetch` - Fetches the user's the command usage with the bot
    3. `/find` - Prints out all of the users created events
    4. `/user` - Displays information on the user who ran the command
3. Fun Commands
    1. `/color` - Generates a color pallete of 5 colors and displays to the user
    2. `/flip` - Flips a coin
    3. `/ping` - Replies with connection information
    4. `/roll` - Rolls a dice
    5. `/server` - Replies with information about the server the command was ran in
    6. `/weather` - Replies with weather data about a given location


## Installation
### Requirements
- Node 18.0.0 or higher
- NPM 7.0.0 or higher
- A Discord Bot Token
- WeatherAPI.com API Token

### Setup
1. Clone the repository
2. Run `npm install` to install all dependencies
3. Create a `.env` file in the root directory of the project
4. Add the following to the `.env` file:
```env
DiscordAPI=YOUR_DISCORD_BOT_TOKEN
ClientID=YOUR_DISCORD_CLIENT_ID
WeatherAPI=YOUR_WEATHER_API_TOKEN
```
5. Run `node deploy-commands.js` to deploy all of the commands with discord
6. Finally, run `npm run dev` to start the bot.



