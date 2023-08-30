import settings
import discord
import random
from discord.ext import commands

logger = settings.logging.getLogger("bot")

def run():
    #TODO INTENTS MUST BE DECLARED
    intents = discord.Intents.default()
    intents.message_content = True

    bot = commands.Bot(command_prefix="!", intents=intents)


    #events
    @bot.event
    async def on_ready():
        logger.info(f"User: {bot.user} (ID: {bot.user.id})")
        print("Bot started successfully")

    @bot.command(
        aliases=['p'],
        help="Pings the bot",
        description ="Bothers the bot with a ping",
        brief = "ping test",
        enabled = True,
        hidden = False
    )
    async def ping(ctx):
        """ Answers with Yes? """
        await ctx.send("Yes?")

    @bot.command(
            hidden = True
    )
    async def say(ctx, *what):
        """ example of user input """
        await ctx.send(" ".join(what))

    @bot.command(
            help ="chooses from any of the options",
            description ="a random selector",
            brief = "random selection",
            enabled = True
    )
    async def choose(ctx, *options):
        """ randomly chooses from the options given"""
        await ctx.send(random.choice(options))
        

    bot.run(settings.DISCORD_API_SECRET, root_logger=True)

if __name__ == "__main__":
    run()