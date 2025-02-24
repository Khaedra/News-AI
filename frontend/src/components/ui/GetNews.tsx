const cleanJsonString = (str: string) => {
    return str
      .replace(/^```json\s*/, "")
      .replace(/\s*```$/, "")
      .trim()
  }
export default async function GetNews() {
    const sections = ["World", "Tech", "Environment"]

    const result = await Promise.all(
        sections.map(async (section) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${section.toLowerCase()}`, {
                cache: "no-store"
            });
            const data = await response.json()
            const output = JSON.parse(cleanJsonString(data))
            return {section, articles: output}
        })
     
    )

    return result; 
}