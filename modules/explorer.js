const requestPromise = require('request-promise');
const {URL} = require('url');
const Logger = require('./logger');
//dbs 
const adminDB = require('../db/admin');
const backdoorDB = require('../db/backdoor')
const comdirDB = require('../db/comdir');
const comfilDB = require('../db/comfil');
const redirectDB = require('../db/redirect');
const paramsDB = require('../db/params');
const phpinfoDB = require('../db/phpinfo');
const subdomainsDB = require('../db/subdomains');

class Explorer {
    constructor(url) {
        

        this.url = this._prepareURL(url);
        this.log = new Logger(this.url.hostname);

        this.log.info(`Exploring:`, `${this.url.href}`);

        this._subScan(subdomainsDB.splice(0,100)).then((domains)=>{
            domains = domains.filter(d => d != null);
            this.log.empty();
            this.log.info(`Found subdomains:`);
            domains.forEach((d)=>{this.log.line(d)});
            this._scanAll(domains).then((result)=>{
                console.log('scan done!')
            })
        })
        
    }

    _prepareURL(url) {
        if (!/^(f|ht)tps?:\/\//i.test(url)) {
            url = "http://" + url;
        }
        const urlObj = new URL(url);
        return urlObj
    }

    _scan(url, db) {
        const urls = db.map(i => `${url}${i}`);
        const allRequests = urls.map(url => {
            return requestPromise(url).then((response) => {
                this.log.tick()
                return url;
            }).catch((err) => {
                this.log.tick()
                return null;
            })
        });
        return Promise.all(allRequests)
    }
    _subScan(db){
        const urls = db.map(i => `http://${i}.${this.url.hostname}`);
        const allRequests = urls.map(url => {
            return requestPromise(url).then((response) => {
                this.log.tick()
                return url;
            }).catch((err) => {
                this.log.tick()
                return null;
            })
        });
        return Promise.all(allRequests)
    }

    async _scanAll(domains){
        for(const domain of domains){
            let result = await this._asyncMultiScan(this._prepareURL(domain));
            console.log(result);
        }
    }

    async _asyncMultiScan(urlObj) {
        
        let results = [];
        let scanResult;

        this.log.banner(urlObj.href);

        //admin pages
        this.log.info('Searching admin page:'); 
        scanResult = await this._scan(urlObj.href, adminDB);
        scanResult = scanResult.filter(i => i != null);
        if(scanResult>0){
            this.log.empty();
            this.log.follow(`Found admin pages`, 1)
            scanResult.forEach((p) => this.log.line(p));
            results = results.concat(scanResult);
        } else {
            this.log.empty();
            this.log.follow(`No admin pages found`, 0)
        }
        
        //backdoor
        this.log.info('Searching backdoors:'); 
        scanResult = await this._scan(urlObj.href,backdoorDB);
        scanResult = scanResult.filter(i => i != null);
        if(scanResult.length>0){
            this.log.empty();
            this.log.follow(`Found Backdoors`,1)
            scanResult.forEach((p) => this.log.line(p));
            results = results.concat(scanResult);
        } else { 
            this.log.empty();
            this.log.follow(`No backdoors found`,0)
        }

        //common directories
        this.log.info('Searching common directoris:');
        scanResult = await this._scan(urlObj.href,comdirDB);
        scanResult = scanResult.filter(i => i != null);
        if(scanResult.length>0){
            this.log.empty();
            this.log.follow(`Found common directory`, 1)
            scanResult.forEach((p) => this.log.line(p));
            results = results.concat(scanResult);
        } else { 
            this.log.empty();
            this.log.follow(`No common directories found`, 0)
        }

        //common files
        this.log.info('Searching common files:'); 
        scanResult = await this._scan(urlObj.href,comfilDB);
        scanResult = scanResult.filter(i => i != null);
        if(scanResult.length>0){
            this.log.empty();
            this.log.follow(`Found common files`,1)
            scanResult.forEach((p) => this.log.line(p));
            results = results.concat(scanResult);
        } else { 
            this.log.empty();
            this.log.follow(`No common files found`,0)
        }

        //params
        this.log.info('Passing params:'); 
        scanResult = await this._scan(urlObj.href,paramsDB);
        scanResult = scanResult.filter(i => i != null);
        if(scanResult.length>0){
            this.log.empty();
            this.log.follow(`Responive routes`,1)
            scanResult.forEach((p) => this.log.line(p));
            results = results.concat(scanResult);
        } else { 
            this.log.empty();
            this.log.follow(`No responsive routes`,0)
        }

        //phpinfo
        this.log.info('Searching PHP info:'); 
        scanResult = await this._scan(urlObj.href,phpinfoDB);
        scanResult = scanResult.filter(i => i != null);
        if(scanResult.length>0){
            this.log.empty();
            this.log.follow(`Responive routes`,1)
            scanResult.forEach((p) => this.log.line(p));
            results = results.concat(scanResult);
        } else { 
            this.log.empty();
            this.log.follow(`No responsive routes`,0)
        }

        //redirects 
        this.log.info('Finding open redirects'); 
        scanResult = await this._scan(urlObj.href,redirectDB);
        scanResult = scanResult.filter(i => i != null);
        if(scanResult.length>0){
            this.log.empty();
            this.log.follow(`open redirects on`,1)
            scanResult.forEach((p) => this.log.line(p));
            results = results.concat(scanResult);
        } else { 
            this.log.empty();
            this.log.follow(`No open redirects`,0)
        }
        
        return results 
    }

}

module.exports = Explorer;