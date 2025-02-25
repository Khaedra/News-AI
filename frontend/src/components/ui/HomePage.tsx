"use client"
import NewsDisplay from "@/components/ui/NewsDisplay"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
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

export default function HomePage({data}) {
    const [currentState, setCurrentState] = useState<number>(0)
    const [direction, setDirection] = useState<number>(0)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1500)
    }, [])

    const changeStateForward = () => {
        setDirection(1)
        setCurrentState((prev) => (prev + 1) % images.length)
    }

    const changeStateBackward = () => {
        setDirection(-1)
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
        <div className="relative w-screen h-screen overflow-hidden">
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
                className="fixed left-[43%] z-10 text-center mt-9"
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
                                setDirection(index > currentState ? 1 : -1)
                                setCurrentState(index)
                            }}
                        />
                    ))}
                </div>
            </motion.div>

            <div className="relative flex justify-between px-10 items-center mx-auto w-full h-full z-10">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                        onClick={changeStateBackward}
                        variant="ghost"
                        className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full w-10 h-10"
                    >
                        <ChevronLeft className="h-8 w-8" />
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
                        className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full w-10 h-10"
                    >
                        <ChevronRight className="h-8 w-8" />
                    </Button>
                </motion.div>
            </div>
        </div>
    )
}