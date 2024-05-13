import NewsAPI from "newsapi";
import {fetchPrefsFromDB} from "../controllers/prefs.js"
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);


const fetchNews = async (req, res) => {
     try{
          const username = req.username;
          const prefs = await fetchPrefsFromDB(username);

          const totalNews = await processPrefs(prefs);
          console.log(totalNews);
          res.status(200).json(totalNews);
     }catch(e){
          res.status(404).json({message: e});
     }
}

async function processPrefs(prefs) {
     const promises = prefs.map(async value => {
          const news = await newsapi.v2.sources({
               category: value,
               language: 'en',
               country: 'us'
          });
          console.log(value);
          console.log(news);
          return news['sources'];
      });
      const allDatas = await Promise.all(promises);
      const news = [].concat(...allDatas)
     return news;
 }

export default fetchNews;