const EventEmitter = require('events');
const chalk = require('chalk');
const DNS = require('./modules/dns.js');


class Server extends EventEmitter {
    constructor(client){
        super();
        process.nextTick(()=>{
            this.emit('resp', chalk.yellow(`
            █████╗ ██████╗  ██████╗ ██╗     ██╗      ██████╗  █████╗ 
           ██╔══██╗██╔══██╗██╔═══██╗██║     ██║     ██╔═══██╗██╔══██╗
           ███████║██████╔╝██║   ██║██║     ██║     ██║   ██║╚█████╔╝
           ██╔══██║██╔═══╝ ██║   ██║██║     ██║     ██║   ██║██╔══██╗
           ██║  ██║██║     ╚██████╔╝███████╗███████╗╚██████╔╝╚█████╔╝
           ╚═╝  ╚═╝╚═╝      ╚═════╝ ╚══════╝╚══════╝ ╚═════╝  ╚════╝ 
            
           Enter a command (help to list all commands)
           `));
        });
 
        client.on('command',(command, args)=>{
            switch(command){
                case 'help':
                case 'dns':
                    this[command](args);
                    break;
                default:
                    this.emit('resp', 'unknown command');
            }
        })
    }

    help(args){
        this.emit('resp', 'Available Commands: \n add: add taks \n ls: list \n delete: id');
    }
    dns(args){
        console.log(`About to start dns for ${args}`)
        DNS.lookup(args[0]);
    }

}

module.exports = (client)=>{
    return new Server(client);
}