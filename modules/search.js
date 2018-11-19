let searchDB = require('../db/search');
var opn = require("opn");

// function arrayContainsArray (superset, subset) {
//     if (0 === subset.length) {
//       return false;
//     }
//     return subset.every(function (value) {
//       return (superset.indexOf(value) >= 0);
//     });
//   }

class Search{
    constructor(opts){
        this.opts = opts
        this._startSearch();    
    }
  
    _startSearch(){
        searchDB.forEach((s)=>{
            if(s.targets[this.opts.t]){
                
                let optsArr = Object.keys(this.opts);
                s.targets[this.opts.t].forEach((q)=>{
                    let newOpts = optsArr.map((i)=>`::${i}`);
                    let requiredVars = q.split("::").length - 1;
                    let existingVarsArr = newOpts.filter((i)=>q.includes(i));
                   
                    if(requiredVars == existingVarsArr.length) {

                        existingVarsArr.forEach((e)=>{
                            if(q.includes(e)){
                                q = (q.replace(e, this.opts[e.replace("::",'')].replace(' ',s.spaceTo)))
                            } 
                           
                        })
                        process.stdout.write(`Open: ${s.baseUrl+q} \n`)
                        opn(s.baseUrl+q).then((v)=>{}).catch((err)=>{
                        console.log('EORORORORORORr'); console.log(err)})

                    }
                    
                })
             }
        })
    }
    
}

module.exports = Search;