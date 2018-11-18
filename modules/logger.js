const chalk = require('chalk');
const fs = require('fs');

class Logger {
    constructor(name){
        this.writeStream = fs.createWriteStream(`${name}.txt`);
        this.last;
        this.rowMax = 60;
        this.progressLength = 0;
        
        
    };

    _print(data){
        if(this.last == data){
            if(Number.isInteger(this.progressLength/this.rowMax)){
                this.rowLength = 0;
                process.stdout.write(`\n`)
            }
        } else {
            this.progressLength = 0;
        }

        this.progressLength++;
        this.last = data;
        process.stdout.write(data);
        
    }

    banner(title){
        const out = `==================================================== \n ${title} \n==================================================== \n`
        this._print(chalk.yellow(out));
        this.writeStream.write(out)
    }

    info(title,sub=''){
        this._print(chalk.yellow(`[i] ${title}`) + `${sub}` + `\n`);
        this.writeStream.write(` ${title} ${sub} \n`);
    }

    follow(data, state=''){
        switch(state){
            case 1: state = '✔'; break;
            case 0: state = '✘'; break;
            default: state = '[i]';
        }
        this._print(chalk.yellow(`  ${state} ${data} \n`));
        this.writeStream.write(`  ${state} ${data} \n`);
    }
    line(data){
        this._print(`    [*] ${data} \n`);
        this.writeStream.write(`    [*] ${data} \n`);
    }
    tick(){
        this._print(`↑`);
    }
    empty(){
        this._print(`\n`);
    }

}

module.exports = Logger;