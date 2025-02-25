
import HomePage from "@/components/ui/HomePage"

const cleanJsonString = (str: string) => {
  return str
    .replace(/^```json\s*/, "")
    .replace(/\s*```$/, "")
    .trim()
}


export default async function Home() {
  // const articles = await getNews()
  return (
    <>
      <HomePage />
    </>
  )

}
