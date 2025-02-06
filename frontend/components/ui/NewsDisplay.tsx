
    'use client';
    import React, { useState } from "react";
    import { Card, CardBody, CardFooter, CardHeader} from "@heroui/card";
    import { Button } from "@heroui/button";


    interface Article {
        id: number;
        title: string;
        summary: string;
        published_date: string;
    }

    export default function NewsDisplay() {
        const [articles, setArticles] = useState<Article[]>([]);
        const [loading, setLoading] = useState(false); //set to false intially? 
        const [error, setError] = useState(null); //what does null mean?


        const fetchWorldNews = async () => {
            try {
                setLoading(true);
                console.log('Fetching from:', `${process.env.NEXT_PUBLIC_API_URL}/api/news/world`);
                
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/world`);
                const data = await response.json();
        
                if (data.status === "success") {
                    setArticles(data.articles);
                } else {
                    console.log("Failed to get articles:", data);
                }
            } catch (err) {
                console.log("Caught an error:", err);
            } finally {
                setLoading(false);
            }
        }
        return(
            <div>
                <Button className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
                onPress={fetchWorldNews}
                disabled = {loading}>
                    {loading ? 'Loading...' : 'Fetch World News'}
                </Button>

                {articles.map((article) => (
            <Card key={article.id}>
                <CardHeader>
                {article.title}
                </CardHeader>
                
                <p className="text-gray-600 mb-2">{article.summary}</p>
                <p className="text-sm text-gray-500">
                    Published: {new Date(article.published_date).toLocaleString()}
                </p>
                
            </Card>
            ))}
            </div>
        );
    }