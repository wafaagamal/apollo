
const search = [
    {
        baseUrl: "http://www.google.com/search?",
        spaceTo: "+",
        targets: {
            person: [
                "as_sitesearch=linkedin.com&&related::linkedin.com&&q=::fullname+::company+::title+::address",
                "q=inurl:::nickname&&as_sitesearch=twitter.com",
                "q=inurl:::nickname&&as_sitesearch=facebook.com",
                "as_epq=::fullname",
                "as_epq=::fullname&&q=::company&&num=100",
                "tbm=isch&q=::img"
                
            ],
            company: [
                "as_epq=::name"
            ],
            file: [
                "q=filetype::ext+::on",
               
            ],image:[
                "tbm=isch&&q=::on",
                
            ],video: [
                "tbm=vid&&q=::on"
                
            ],news:[
                "tbm=nws&&q=::about"
            ]
        }
    },
    {
        baseUrl: "https://www.picsearch.com/index.cgi?",
        spaceTo: "+",
        targets: {
            image: [
                "q=::on",    
            ]
        }
    },

    {
        baseUrl: "https://www.flickr.com/search/?",
        spaceTo: "+",
        targets: {
            image: [
                "text=::on",    
            ]
        }
    },
    {
        baseUrl: "https://www.bing.com/search?",
        spaceTo: "+",
        targets: {
            person: [
                "site=linkedin.com&&q=::fullname+::company+::title",    
            ]
        }
    },
    {
        baseUrl: "https://www.bing.com/images/search?",
        spaceTo: "+",
        targets: {
            image: [
                "q=::on&qft=+filterui:imagesize-large&FORM=IRFLTR"
            ]
        }
    },
    {
        baseUrl: "https://www.bing.com/videos/search?",
        spaceTo: "+",
        targets: {
            video: [
               "q=::on"
            ]
        }
    },

    {
        baseUrl: "https://www.youtube.com/results?",
        spaceTo: "+",
        targets: {
            video: [
               "search_query=::on"
            ]
        }
    },


    {
        baseUrl: "https://www.bing.com/news/search?",
        spaceTo: "+",
        targets: {
            news: [
               "q=::about"
            ]
        }
    }
   
]

module.exports  = search;