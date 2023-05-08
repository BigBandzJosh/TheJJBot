# TheJJBot
Discord Bot project!
Yay!

# PACKAGES/MODULES <br/>
"dependencies": { <br/>
    "axios": "^1.4.0",<br/>
    "canvas": "^2.11.2",<br/>
    "cheerio": "^1.0.0-rc.12",<br/>
    "discord.js": "^14.9.0",<br/>
    "dotenv": "^16.0.3",<br/>
    "json2csv": "^6.0.0-alpha.2",<br/>
    "node-schedule": "^2.1.1",<br/>
    "puppeteer": "^20.1.0",<br/>
    "sequelize": "^6.31.1",<br/>
    "sqlite3": "^5.1.6"<br/>
  }

# START THE BOT <br/>
npm run dev
# CREATE NEW COMMAND: <br/>

To add a new command to the bot, either create a new folder under the commands folder and name it accordingly, OR add a new .js file to an existing folder and name accordingly. </br>

Run "node deploy-commands.js" to deploy your commands, currently it is set to deploy globally to all servers the bot is in. We can change this if we wanted to set them for one specific server.

