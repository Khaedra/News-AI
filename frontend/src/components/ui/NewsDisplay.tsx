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

  const ArticleCard = ({ article, index }: { article: any; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex gap-6 group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-lg w-[20%]">
        <motion.img
          src={article.image}
          alt="Article image"
          className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="flex-1">
        <h1 className="font-bold text-2xl mb-4 group-hover:text-blue-400 transition-colors">{article.title}</h1>
        <p className="font-serif text-white/80 ">{article.summary}</p>
        <Button variant="ghost" className="mt-4 text-blue-400 hover:text-white hover:bg-blue-500/20 gap-2" asChild>
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
          <Card className="bg-black/40 backdrop-blur-xl text-white border-white/10 w-full">
            <CardContent className="p-6">
              <div className="mb-6">
                <Tabs defaultValue="overview" className="w-full" onValueChange={setSelected}>
                  <TabsList className="w-full bg-white/10 p-1">
                    <TabsTrigger value="overview" className="flex-1 data-[state=active]:bg-white/20">
                      Overview
                    </TabsTrigger>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <TabsTrigger key={num} value={num.toString()} className="flex-1 data-[state=active]:bg-white/20">
                        {num}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>

              <motion.div
                key={selected}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="min-h-[300px]"
              >
                {selected === "overview" ? (
                  <div className="space-y-4">
                    <h1 className="font-bold text-3xl flex items-center gap-2">
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
            className="w-64 my-auto rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20"
          >
            {loading ? "Fetching..." : buttonText}
          </Button>
        </motion.div>
      )}
    </div>
  )
}

