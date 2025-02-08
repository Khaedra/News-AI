'use client';
import React, { useState } from "react";
import { Button } from "@/components/ui/button"


// interface Article {
//     id: number;
//     title: string;
//     content: string;
//     published_date: string;
// }

interface NewsDisplay {
    buttonText: string;
    section: string; //"world", "tech", "politics"
    onChangeState: (state: number) => void; 
}

export default function NewsDisplay({ section, buttonText, onChangeState }: NewsDisplay) {
    const [articles, setArticles] = useState("");
    //useState<Article[]>([]);
    const [loading, setLoading] = useState(false); //set to false intially? 
    const [error, setError] = useState(null); //what does null mean?


    const fetchNews = async () => {
        try {
            setLoading(true);
            console.log('Fetching from:', `${process.env.NEXT_PUBLIC_API_URL}/api/news/${section}`);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${section}`);
            const data = await response.json();

            if (data.status === "success") {
                setArticles(data.response);
            } else {
                console.log("Failed to get articles:", data);
            }
        } catch (err) {
            console.log("Caught an error:", err);
        } finally {
            setLoading(false);
        }
    }

    const sectionMap: Record<string, number> = {
        world: 0,
        tech: 1,
        environment: 2,
      };
      

    const handleClick = () => {
        const newState = sectionMap[section] ?? 0; // Default to 0 if section isn't found
        onChangeState(newState);
      };

    return (
        <div className="z-10">
            <Button onClick={handleClick}>
                {buttonText}
            </Button>
            
        </div>
    );
}