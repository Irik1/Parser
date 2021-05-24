var needle = require('needle');
var cheerio = require('cheerio');

module.exports.getList = function (){
    var URL = 'https://stopgame.ru/';
    needle("get",URL).then(function(res){
        var $ = cheerio.load(res.body);
        $(".main-news-wrapper").children().first().children().first().children().each(function(){
            list.push({
                header: $(this).children(".article-description").children('.caption').text(),
                source: {
                    name: "StopGame",
                    link: "https://stopgame.ru/"
                },
                link: "https://stopgame.ru/" + $(this).children(".article-image").attr("href"),
                image:$(this).children(".article-image").children().attr("src"),
                time: new Date()
            })
        });
        console.log(results);
        // return results;
    }).then(function(){return results});
} 