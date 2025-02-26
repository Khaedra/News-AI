"use client"
import NewsDisplay from "@/components/ui/NewsDisplay"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
const images = ["/city.jpg", "/redcity.jpg", "/purple.jpg"]
const sections = ["World", "Tech", "Environment"]



interface ArticleData {
    overview: string
    article_1: { summary: string; link: string; title: string; image: string; date: string }
    article_2: { summary: string; link: string; title: string; image: string; date: string }
    article_3: { summary: string; link: string; title: string; image: string; date: string }
    article_4: { summary: string; link: string; title: string; image: string; date: string }
    article_5: { summary: string; link: string; title: string; image: string; date: string }
}




const cleanJsonString = (str: string) => {
    return str
        .replace(/^```json\s*/, "")
        .replace(/\s*```$/, "")
        .trim()
}


export default function HomePage() {
    const [currentState, setCurrentState] = useState<number>(0)
    const [data, setData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    // const [isFetched, setIsFetched] = useState(false)


    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1500)
        async function fetchArticles() {
            const sections = ["World", "Tech", "Environment"]
            const fetchNews = async (section: string) => {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${section.toLowerCase()}`)
                const responseJson = await response.json()
                const parsedData = JSON.parse(cleanJsonString(responseJson.response)) // the ai json
                return { section, articles: parsedData }; // an object (section, articles)
            }

            const dataArray = await Promise.all(sections.map(fetchNews));

            const result = dataArray.reduce<Record<string, ArticleData>>((acc, { section, articles }) => {
                acc[section] = articles;
                return acc;
            }, {}) // an object with section: articles
            setData(result);
            // setIsFetched(true)
        }
        fetchArticles()
    }, [])

    const changeStateForward = () => {
        setCurrentState((prev) => (prev + 1) % images.length)
    }

    const changeStateBackward = () => {
        setCurrentState((prev) => (prev - 1 + images.length) % images.length)
    }

    if (isLoading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-black">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-white text-6xl font-serif"
                >
                    kNews
                    <motion.div
                        className="h-1 bg-white mt-2"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    />
                </motion.div>
            </div>
        )
    }

    return (
        <div className=" w-screen h-screen overflow-hidden">
            {images.map((image, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: currentState === index ? 1 : 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute inset-0 brightness-50"
                    style={{
                        backgroundImage: `url("${image}")`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundAttachment: "fixed",
                    }}
                />
            ))}

            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 z-10" />

            <motion.div
                className="relative mx-auto z-10 text-center mt-9"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100, duration: 3 }}
            >
                <h1 className="text-7xl font-serif text-white mb-2">kNews</h1>
                <p className="text-white/80 font-serif font-bold italic">Your Daily Digest</p>


                <div className="flex gap-2 justify-center mt-4">
                    {sections.map((_, index) => (
                        <motion.button
                            key={index}
                            className={`w-2 h-2 rounded-full ${currentState === index ? "bg-white" : "bg-white/50"}`}
                            whileHover={{ scale: 1.2 }}
                            onClick={() => {

                                setCurrentState(index)
                            }}
                        />
                    ))}
                </div>
            </motion.div>

            <div className="relative flex justify-between px-10 items-center mx-auto z-10 w-full h-[70%] ">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                        onClick={changeStateBackward}
                        variant="ghost"
                        className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full w-16 h-16 inset-0"
                    >
                        <ChevronLeft className="h-14 w-14" />
                    </Button>
                </motion.div>

                <NewsDisplay
                    section={sections[currentState]}
                    buttonText={`Display ${sections[currentState]} News`}
                    articles={data?.[sections[currentState]] || null}
                />

                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                        onClick={changeStateForward}
                        variant="ghost"
                        className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full w-16 h-16"
                    >
                        <ChevronRight className="w-24 h-24" />
                    </Button>
                </motion.div>
            </div>
        </div>
    )
}