const readline = require('readline');
const chalk = require('chalk');
const Explorer = require('./modules/explorer.js');


class Appollo {
    constructor() {
        process.nextTick(() => {
            this.resp(chalk.yellow(`
            █████╗ ██████╗  ██████╗ ██╗     ██╗      ██████╗  █████╗ 
           ██╔══██╗██╔══██╗██╔═══██╗██║     ██║     ██╔═══██╗██╔══██╗
           ███████║██████╔╝██║   ██║██║     ██║     ██║   ██║╚█████╔╝
           ██╔══██║██╔═══╝ ██║   ██║██║     ██║     ██║   ██║██╔══██╗
           ██║  ██║██║     ╚██████╔╝███████╗███████╗╚██████╔╝╚█████╔╝
           ╚═╝  ╚═╝╚═╝      ╚═════╝ ╚══════╝╚══════╝ ╚═════╝  ╚════╝ 
            
           Enter a command (help to list all commands)
           `));
        });
    }

    listen() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        let command, args;
        rl.on('line', (input) => {
            [command, ...args] = input.trim().split(' ');
            this.command(command, args);
        })
    }

    resp(data) {
        // process.stdout.write('\u001B[2J\u001B[0;0f');
        process.stdout.write(data);
        process.stdout.write(`\n\> `);
    }

    command(cmd, args) {
        switch (cmd) {
            case 'help':
            case 'exp':
                this[cmd](args);
                break;
            default:
                this.resp('unknow command')
        }
    }

    help(args) {
        this.resp('Available Commands: \n add: add taks \n ls: list \n delete: id');
    }
    exp(args) {
        const explorer = new Explorer(args[0]);
    }

}

let appollo = new Appollo();
appollo.listen();