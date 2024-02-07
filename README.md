# TinyBot
TinyBot is a modular discord bot that retrives, and stores random pieces of art from the Metropolitan Museum of Art
The department and what keyword to search for are provided by the user.

These results are then stored into a database that results can be retrived at a later time.
TinyBot also serves as an example for basic commands, and API/database integration with a discord bot for educational or reference purposes.


## Commands
The list of all commands and examples of use

### getart
variables : department, keyword
deptget is the main api query that takes the department and a keyword from the user.
deptget also stores the results into the database.

note: it is reccomended to use the slash command version "/deptget" due to an auto complete section for the departments.

examples:

Department: Asian Art

Keyword: Moon

![image](https://github.com/joshuatchang/TinyBot/assets/46918257/5021fc76-87ac-489b-b406-87ce84910879)

Department: European Paintings

Keyword: Music

![image](https://github.com/joshuatchang/TinyBot/assets/46918257/36bae78d-874c-463d-b36f-33f1512ff762)


---
### past results
variables : Department
Loads the past queries from the database to search for previous queries in each department and posts it as a message in Discord.

examples:
![image](https://github.com/joshuatchang/TinyBot/assets/46918257/dedba660-2aee-4ca0-ad83-ecb1f05236d6)

---


## Basic Commands
A list of commands that do not use the API or Database.

### roll
variables: die 
rolls a specific sided die which is determined by user input

---
### 8ball
Acts as a virtual 8ball in discord. The input is there for a question, but does not affect the results at all.

---
### calculator
using two integers seperated by any of the operand characters (+, -, *, /) does the respective operation (add, subtract, multiply, divide).

notes: also works as a slash command

examples:

![image](https://github.com/joshuatchang/TinyBot/assets/46918257/3f3dae60-a350-490f-b68c-6519d8b13964)

![image](https://github.com/joshuatchang/TinyBot/assets/46918257/394674fc-8b2d-4c64-9c37-a3303edc3d09)
