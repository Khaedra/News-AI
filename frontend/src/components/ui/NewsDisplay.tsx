"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Newspaper } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"



interface ArticleData {
  overview: string
  article_1: { summary: string; link: string; title: string; image: string }
  article_2: { summary: string; link: string; title: string; image: string }
  article_3: { summary: string; link: string; title: string; image: string }
  article_4: { summary: string; link: string; title: string; image: string }
  article_5: { summary: string; link: string; title: string; image: string }
}

interface NewsDisplayProps {
  buttonText: string
  section: string
  articles: ArticleData | null
  setArticles: (data: ArticleData) => void
}

const cleanJsonString = (str: string) => {
  return str
    .replace(/^```json\s*/, "")
    .replace(/\s*```$/, "")
    .trim()
}

export default function NewsDisplay({ section, buttonText, articles, setArticles }: NewsDisplayProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<string>("overview")

  // fetch news function
  const fetchNews = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${section.toLowerCase()}`)
      const data = await response.json()

      if (data.status === "success") {
        const parsedData = JSON.parse(cleanJsonString(data.response))
        setArticles(parsedData)
      } else {
        setError("Failed to fetch articles")
      }
    } catch (err) {
      setError("An error occurred while fetching articles")
    } finally {
      setLoading(false)
    }
  }

  // card to display article information
  const ArticleCard = ({ article, index }: { article: any; index: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1,
        duration:1
       }}
      className="flex gap-6 group"
    >
  {/* image */}
      <div className="relative overflow-hidden rounded-lg w-[20%]">
        <motion.img
          src={article.image}
          alt="Article image"
          initial = {{opacity: 0,
            x: -250
          }}
          animate = {{opacity: 1,
            x: 0
          }}
          transition = {{ duration: 1, delay: 0.4, ease: "easeOut"}}
          className="object-cover w-full h-full transform hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      </div>
      <div className="flex-1">
        <h1 className={`font-bold text-2xl mb-4 font-sourceSerif`} >{article.title}</h1>
        <p className="text-white/80 font-serif">{article.summary}</p>
        <Button className="mt-4 text-blue-400 hover:text-white bg-blue-500/20 hover:bg-blue-500/40 gap-2 font-serif" asChild>
          <a href={article.link} target="_blank" rel="noopener noreferrer">
            Read Full Article <ArrowRight className="w-4 h-4" />
          </a>
        </Button>
      </div>
    </motion.div>
  )

  return (
    <div className="flex items-center justify-center flex-col w-[80%] h-[40%]">
      {articles ? (
        <AnimatePresence mode="wait">
          <Card className="bg-black/20 backdrop-blur-xl text-white border-white/10 w-full">
            <CardContent className="p-6">
              <div className="mb-6">
                <Tabs defaultValue={selected} className="w-full" onValueChange={setSelected}>
                  <TabsList className="w-full bg-white/10 p-1">
                    <TabsTrigger value="overview" className="flex-1 font-inter data-[state=active]:bg-white/30 data-[state=active]:text-white">
                      Overview
                    </TabsTrigger>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <TabsTrigger key={num} value={num.toString()} className=" font-inter flex-1 data-[state=active]:bg-white/20 data-[state=active]:text-white">
                        {num}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
             {/* the nav bar */}

              <motion.div
                key={selected}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
               
                transition={{ duration: 1 }}
                className="min-h-[300px]"
              >
                {selected === "overview" ? (
                  <div className="space-y-4">
                    <h1 className="font-bold text-3xl font-sourceSerif flex items-center gap-2">
                      <Newspaper className="w-8 h-8" />
                      {section} News Overview
                    </h1>
                    <p className="font-serif text-white/80 leading-relaxed">{articles.overview}</p>
                  </div>
                ) : (
                  <ArticleCard article={articles[`article_${selected}`]} index={Number.parseInt(selected)} />
                )}
              </motion.div>
            </CardContent>
          </Card>
        </AnimatePresence>
      ) : (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={fetchNews}
            disabled={loading}
            className={`w-64 h-14 my-auto rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 font-inter`}
          >
            {loading ? "Fetching..." : buttonText}
          </Button>
        </motion.div>
      )}
    </div>
  )
}

