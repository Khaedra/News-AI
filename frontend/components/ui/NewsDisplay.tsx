
'use client';
import React, { useState } from "react";
import { Card, CardBody, CardFooter, CardHeader} from "@heroui/card";
import { Button } from "@headlessui/react";


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


    const fetchWorldNews = async () => { //function called async? or does async specify lambda function type
        try {
            setLoading(true);
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/world`);// calls news_platform/urls.py which calls news_core/urls.py which calls the fetch function in views which returns the data
            const data = await response.json(); //is await keyword always used in asynchronous programming just as convention?

            if (data.status == "success") {
                setArticles(data.articles);
            }
            else {
                console.log("FAILED TO GET ARTICLES");
            }

        }
        catch (err) {
            console.log("CAUGHT AN ERROR")
        }
        finally {
            setLoading(false)
        }
    }
    return(
        <div>
            <Button className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
            onClick={fetchWorldNews}
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