const stopgame = require('./sites/stopgame');
const mongo = require('mongodb').MongoClient;
var needle = require('needle');
var cheerio = require('cheerio');
// var $ = require('jQuery');
var results = [];

async function parse(){
    //stopgame
    await needle.get("https://stopgame.ru/", function(err, res){
        if (err) throw err;
        var $ = cheerio.load(res.body);
        $(".main-news-wrapper").children().first().children().first().children().each(function(){
            results.push({
                header: $(this).children(".article-description").children('.caption').text().replace('\\n','').trim(),
                source: {
                    name: "StopGame",
                    link: "https://stopgame.ru/"
                },
                link: "https://stopgame.ru/" + $(this).children(".article-image").attr("href"),
                image:$(this).children(".article-image").children().attr("src"),
                time: new Date(),
                theme: "Игры"
            })
        });
    });

    //GameBomb
    await needle.get('https://gamebomb.ru/', function(err, res){
        if (err) throw err;
        var $ = cheerio.load(res.body);
        $(".gbnews-listShort").first().parent().children().each(function(){
            results.push({
                header: $(this).first().next().children().first().next().children().first().next().text().replace("\\n","").replace("\\t","").trim(),
                source: {
                    name: "GameBomb",
                    link: "https://gamebomb.ru/"
                },
                link: $(this).children().first().children().attr("href"),
                image: "https://gamebomb.ru/" + $(this).children().first().children().children().attr("src"),
                time: new Date(),
                theme: "Игры"
            })
        });
        results.pop();
        results.pop();
    });

    //ДонНТУ
    await needle.get('http://www.donntu.org/news', function(err, res){
        if (err) throw err;
        var $ = cheerio.load(res.body);
        $(".view-main-news").children().first().children().each(function(){
            results.push({
                header: $(this).children('.views-field-title').children().children().text(),
                source: {
                    name: "ДонНТУ",
                    link: "http://www.donntu.org/"
                },
                link: "http://www.donntu.org/" + $(this).children('.views-field-field-image').children().children().attr("href"),
                image: $(this).children('.views-field-field-image').children().children().children().attr("src"),
                time: new Date(),
                theme: "Образование"
            })
        });
    });

    //Эхо Москвы
    await needle.get('https://echo.msk.ru/news/', function(err, res){
        if (err) throw err;
        var $ = cheerio.load(res.body);
        $(".newsblock").each(function(){
            results.push({
                header: $(this).children("h3").children("a").text().trim(),
                source: {
                    name: "Эхо Москвы",
                    link: "http://www.donntu.org/"
                },
                link: "https://echo.msk.ru/" + $(this).children("h3").children("a").attr('href'),
                image: $(this).children('img').attr('src'),
                time: new Date(),
                theme: "Политика"
            })
        });
    });

    //Rpg News
    await needle.get('https://rpg-news.ru/', function(err, res){
        if (err) throw err;
        var $ = cheerio.load(res.body);
        $(".postlist").children().each(function(){
            results.push({
                header: $(this).children().children(".entry-header").children().first().children().text(),
                source: {
                    name: "Roleplaying news Russian",
                    link: "https://rpg-news.ru/"
                },
                link: $(this).children().children(".entry-header").children().children().attr('href'),
                image: $(this).children().children(".overlay").children().children().attr('src'),
                time: new Date(),
                theme: "Ролевые игры"
            })
        });
    });

    //Студия 101
    await needle.get('https://studio101.ru/news', function(err, res){
        if (err) throw err;
        var $ = cheerio.load(res.body);
        $(".news-list-item").each(function(){
            results.push({
                header: $(this).children('div').children('.h3').children().text(),
                source: {
                    name: "Студия 101",
                    link: "https://studio101.ru/"
                },
                link: $(this).children('div').children('.h3').children().attr('href'),
                image: $(this).children('figure').children().attr('src'),
                time: new Date(),
                theme: "Ролевые игры"
            })
        });
    });

    //Министерство образования и науки ДНР
    await needle.get('http://mondnr.ru/news', function(err, res){
        if (err) throw err;
        var $ = cheerio.load(res.body);
        $("#itemListLeading").children().each(function(){
            if ($(this).hasClass('itemContainer'))
            {
                results.push({
                    header: $(this).children().children().first().children().first().attr('title'),
                    source: {
                        name: "МинОбр ДНР",
                        link: "http://mondnr.ru/"
                    },
                    link: "http://mondnr.ru" + $(this).children().children().first().children().first().attr('href'),
                    image: "http://mondnr.ru" + $(this).children().children().first().children().first().next().attr('href'),
                    time: new Date(),
                    theme: "Образование"
                })
            }
        });
    });


    //РИА Новости
    await needle.get('https://ria.ru/location_Donetsk_People_s_Republic/', function(err, res){
        if (err) throw err;
        var $ = cheerio.load(res.body);
        $(".list-tags").children().each(function(){
            if ($(this).hasClass('list-item'))
            {
                results.push({
                    header: $(this).children().first().next().children().first().next().text(),
                    source: {
                        name: "РИА Новости",
                        link: "https://ria.ru/"
                    },
                    link: $(this).children().first().next().children().first().next().attr('href'),
                    image: $(this).children().first().next().children().first().children().children('img').attr('src'),
                    time: new Date(),
                    theme: "Политика"
                })
            }
        });
    });


    //Спорт ДНР
    await needle.get('http://gorod-donetsk.com/novosti/sport', function(err, res){
        if (err) throw err;
        var $ = cheerio.load(res.body);
        $(".items-leading").children().each(function(){
            results.push({
                header: $(this).children().first().children().children().attr('alt'),
                source: {
                    name: "РИА Новости",
                    link: "http://gorod-donetsk.com/"
                },
                link: "http://gorod-donetsk.com/" + $(this).children().first().children().attr('href'),
                image: $(this).children().first().children().children().attr('src'),
                time: new Date(),
                theme: "Спорт"
            })
        });
    });

    //Спорт-Экспресс
    await needle.get('https://www.sport-express.ru/photoreports/', function(err, res){
        if (err) throw err;
        var $ = cheerio.load(res.body);
        $(".materials_container").children().each(function(){
            results.push({
                header:  $(this).children().children().children().first().next().children('h2').children('a').text().replace("\\n","").replace("\\t","").trim(),
                source: {
                    name: "Спорт-Экспресс",
                    link: "https://www.sport-express.ru/"
                },
                link: $(this).children().first().children().children().first().children().attr('href'),
                image: $(this).children().first().children().children().first().children().children().attr('src'),
                time: new Date(),
                theme: "Спорт"
            })
        });
    });


    
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("Тут надо разобраться с асинхронностью, ибо что-то пошло не так!"), 50000)
      });
    
    let result = await promise;

    const url = "mongodb://localhost:27017/";
    const mongoClient = new mongo(url, { useUnifiedTopology: true });
     
    mongoClient.connect(function(err, client){
          
        const db = client.db("NewsAgregator");
        const collection = db.collection("News");
     
        if(err) return console.log(err);
          
        // collection.find().toArray(function(err, res){         
        //     console.log(res);
        // });

        collection.insertMany(results, function(err, res){
            console.log(res);
        });        

        // let duplicates = collection.distinct("link",function(err, res){
        //     console.log(res);
        // });        
        
        // collection.deleteMany(duplicates,function(err,res){
        //     console.log(res);
        //     client.close();
        // });
        
    });
    
}

parse();