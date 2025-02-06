
    'use client';
    import React, { useState } from "react";
    import { Card, CardBody, CardFooter, CardHeader} from "@heroui/card";
    import { Button } from "@heroui/button";


    // interface Article {
    //     id: number;
    //     title: string;
    //     content: string;
    //     published_date: string;
    // }

    interface NewsDisplay {
        buttonText: string;
        section: string; //"world", "tech", "politics"
    }

    export default function NewsDisplay({section, buttonText} : NewsDisplay) {
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
        return(
            <div>
                <Button>

                </Button>
                <Card></Card>
            </div>
        );
    }