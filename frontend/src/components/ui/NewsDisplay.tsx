"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Newspaper } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"



interface ArticleData {
  overview: string
  article_1: { summary: string; link: string; title: string; image: string; date: string }
  article_2: { summary: string; link: string; title: string; image: string; date: string }
  article_3: { summary: string; link: string; title: string; image: string; date: string }
  article_4: { summary: string; link: string; title: string; image: string; date: string }
  article_5: { summary: string; link: string; title: string; image: string; date: string }
}

interface NewsDisplayProps {
  buttonText: string
  section: string
  articles: ArticleData | null

}


const getSectionColorClasses = (section: string) => {
  switch (section) {
    case "World":
      return "data-[state=active]:bg-[#deb841]/30";
    case "Tech":
      return "data-[state=active]:bg-[#5e0b15]/30";
    case "Environment":
      return "data-[state=active]:bg-[#f5e6e8]/30";
    default:
      return "data-[state=active]:bg-white/30";
  }
};

export default function NewsDisplay({ section, buttonText, articles }: NewsDisplayProps) {
  const [pressed, setPressed] = useState(false)
  const [selected, setSelected] = useState<string>("overview")

  const tabColor = getSectionColorClasses(section);

  // card to display article information
  const ArticleCard = ({ article, index }: { article: any; index: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 1
      }}
      className="flex gap-6 group"
    >
      {/* image */}
      <div className="relative overflow-hidden rounded-lg w-[20%]">
        <motion.img
          src={article.image}
          alt="Article image"
          initial={{
            opacity: 0,
            x: -250
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="object-cover w-full h-full transform hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      </div>
      <div className="flex-1">
        <h1 className={`font-bold text-2xl font-sourceSerif`} >{article.title}</h1>
        <p className="text-white/80 text-sm font-serif italic mb-4">{article.date}</p>
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
      {(pressed && articles) ? (
        <AnimatePresence mode="wait">
          <Card className="bg-black/20 backdrop-blur-xl text-white border-white/10 w-full">
            <CardContent className="p-6">
              <div className="mb-6">
                <Tabs defaultValue={selected} className="w-full" onValueChange={setSelected}>
                  <TabsList className="w-full bg-white/10 p-1">
                    <TabsTrigger value="overview" className={`flex-1 font-inter ${tabColor} data-[state=active]:text-white`}>
                      {section} Overview
                    </TabsTrigger>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <TabsTrigger key={num} value={num.toString()} className={` font-inter flex-1 ${tabColor} data-[state=active]:text-white`}>
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
                    <p className="font-serif text-white/80 leading-relaxed">{articles?.overview}</p>
                  </div>
                ) : (
                  <ArticleCard article={articles?.[`article_${selected}`]} index={Number.parseInt(selected)} />
                )}
              </motion.div>
            </CardContent>
          </Card>
          <motion.button key="close" className={`w-56 h-14 my-auto rounded-full  bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white font-inter hover:scale-105 absolute bottom-24`}
            onClick={() => { setPressed(false) }}
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}>Close Summary</motion.button>
        </AnimatePresence>

        //NOT PRESSED AND ARTICLES
      ) : (!pressed && articles) ? (
        <motion.div className="relative grid grid-cols-2 items-center justify-center gap-6 w-full h-full">
          <motion.div initial={{ opacity: 0, x: 200 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 1, ease: "easeOut" }} className="px-4 text-left w-auto">
            <h1 className="font-sourceSerif font-bold text-3xl mb-4 text-white">What is kNews?</h1>
            <p className="text-white font-inter ">kNews is your one-stop-site for all your news and information needs. It provides concise, informative, and up-to-date AI summaries of the 5 most important news articles from around the world, in the field of technology, and about the environment. Articles are sourced from The Guardian. Try it out now!</p>
          </motion.div>

          <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1 }} className="h-full w-[0.1rem] absolute left-[51%] bg-white rounded-xl">
          </motion.div>

          <motion.div className="flex  h-[80%] justify-center align-bottom">
            <motion.button
              
              onClick={() => setPressed(true)}
              initial={{ opacity: 0, x: -200 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 1 }}
              className={`h-14 my-auto w-56 rounded-full  bg-white/1 backdrop-blur-sm text-white border hover:bg-white/20  border-white font-inter `}
            >
              {buttonText}
            </motion.button>

          </motion.div>
        </motion.div>


        //NOT PRESSED AND NO ARTICLES
      ) :

        <motion.div className="relative grid grid-cols-2 items-center justify-center gap-6 w-full h-full">
          <motion.div initial={{ opacity: 0, x: 200 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 1, ease: "easeOut" }} className="px-4 text-left w-auto">
            <h1 className="font-sourceSerif font-bold text-3xl mb-4 text-white">What is kNews?</h1>
            <p className="text-white font-inter ">kNews is your one-stop-site for all your news and information needs. It provides concise, informative, and up-to-date AI summaries of the 5 most important news articles from around the world, in the field of technology, and about the environment. Articles are sourced from The Guardian. Try it out now!</p>
          </motion.div>

          <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1 }} className="h-full w-[0.1rem] absolute left-[51%] bg-white rounded-xl">
          </motion.div>

          <motion.div className="flex  h-[80%] justify-center align-bottom">
            <motion.button
              disabled={true}
              initial={{ opacity: 0, x: -200 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 1 }}
              className={`h-14 my-auto w-56 rounded-full  bg-white/1 backdrop-blur-sm text-white border border-white font-inter `}
            >
              Fetching...
            </motion.button>

          </motion.div>
        </motion.div>
      }
    </div>
  )
}

