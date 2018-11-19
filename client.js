const readline = require('readline');
const chalk = require('chalk');
const Explorer = require('./modules/explorer.js');
const Search = require('./modules/search')


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
            [command, ...args] = input.trim().split('--');
            this.command(command.trim(), args);
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
            case 'search':
                let opts = {};
                args.forEach((i)=>{
                    let splited = i.split(' ');
                    let key = splited[0];
                    splited.shift();
                    let value = splited.join(' ');
                    opts[key]=value.trim();
                })
                this[cmd](opts);
                break;
            default:
                this.resp('unknow command')
        }
    }
    search(opts){
        const search = new Search(opts)
    }

    help(opts) {
        this.resp('Available Commands: \n add: add taks \n ls: list \n delete: id');
    }
    exp(opts) {
        const explorer = new Explorer(opts.url);
    }

}

let appollo = new Appollo();
appollo.listen();