import React from 'react';
import { useEffect, useState } from 'react';
import {ScrapeProvider} from "./ScrapeContext";

function useScrapes() {
    // custom hook
    const [scrapes, setScrapes] = useState({twitter: []});

    useEffect(() => {
        (async () => {
            const res = await fetch('//localhost:9999/data');
            const data = await res.json();
            console.log(data);

            setScrapes(data);
        })();
    }, []);

    return scrapes;
}

export default function Page({children}) {
    const scrapes = useScrapes();
    return (
        <ScrapeProvider value={{scrapes}}>
            <div className='page'>
                {children}
            </div>
        </ScrapeProvider>
    );
}
