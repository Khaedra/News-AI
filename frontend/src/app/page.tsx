
import HomePage from "@/components/ui/HomePage"

const cleanJsonString = (str: string) => {
  return str
    .replace(/^```json\s*/, "")
    .replace(/\s*```$/, "")
    .trim()
}


export default async function Home() {
  const articles = await getNews()
  return (
    <>
      <HomePage data={articles} />
    </>
  )

}

export async function getNews() {
  const sections = ["World", "Tech", "Environment"]
  const fetchNews = async (section: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${section.toLowerCase()}`)
    const responseJson = await response.json()
    const parsedData = JSON.parse(cleanJsonString(responseJson.response)) // the ai json
    return { section, articles: parsedData }; // an object (section, articles)
  }

  const dataArray = await Promise.all(sections.map(fetchNews));

  const result = dataArray.reduce((acc, { section, articles }) => {
    acc[section] = articles;
    return acc;
  }, {}) // an object with section: articles
  return result;

}