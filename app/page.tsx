import { categories } from "../constants";
import fetchNews from "../lib/fetchNews";

async function HomePage() {
  // fetch the news data
  const news: NewsResponse = await fetchNews(categories.join(','));

  console.log(news)


  return (
    <div>
      

    </div>
  )
}

export default HomePage