import cron from 'node-cron';
import {runCron} from './scraper';

cron.schedule(`* * * * *`, () => {
    console.log(`Running the CRON - not really, just commented out`);
    // runCron().then(() => {
    //     console.log(`CRON has run`);
    // }).catch((e) => console.error(e));
});