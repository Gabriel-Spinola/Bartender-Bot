# Bartender-Bot

# Bartender Bot Main
> [Proj. Repo.](https://github.com/Gabriel-Spinola/Bartender-Bot)
## Lista de funcionalidades
- [x] Mostrar Cardapio
- [x] Primeiro commit do bot na nuvem
- [ ] Dinheiro
- [ ] Jogo do Bicho
- [ ] Nivel de bebado
- [ ] Compras
- [ ] Gorjeta
- [ ] Solta o som Garçom
- [ ] Deploy

## Dependencies
> ##### Main framework
> - [Discord.js](https://discord.js.org/#/)
> ##### Back-end
>- [Node.js](https://nodejs.dev)
>- [DisCloud](https://discloudbot.com)
	>- [Sequelize Database](https://sequelize.org/docs/v6/#:~:text=Sequelize%20is%20a%20promise-based,loading%2C%20read%20replication%20and%20more.)
>- [Discord.js/rest](https://www.npmjs.com/package/@discordjs/rest)
>		
>##### Others
>- [Nodemon](https://www.npmjs.com/package/nodemon)

[Guide](https://discordjs.guide/)

## Dev Usage
- **Run Application:** `node index.js`
- **Debug Nodemon:** `npm run dev`
- **Debug Test:** Off.
- **Deploy:** [Discloud Deploy](https://discloudbot.com/dashboard)

## Database
**TIP**

Execute `node dbInit.js` to create the database tables. Unless you make a change to the models, you'll never need to touch the file again. If you change a model, you can execute `node dbInit.js --force` or `node dbInit.js -f` to force sync your tables. It's important to note that this **will** empty and remake your model tables.
