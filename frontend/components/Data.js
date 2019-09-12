import { useContext } from 'react';
import { ScrapeContext } from './ScrapeContext';

export default function Data() {
    const scrapeData = useContext(ScrapeContext);
    return (
        <div>
            <h2>Your Data:</h2>
            {scrapeData.hey}
            {scrapeData.lets}
        </div>
    )
}
