import cron from 'node-cron';
import {runCron} from './scraper';

cron.schedule(`* * * * *`, () => {
    console.log(`Running the CRON`);
    runCron().then(() => {
        console.log(`CRON has run`);
    }).catch((e) => console.error(e));
});