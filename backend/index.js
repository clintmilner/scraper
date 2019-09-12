import express from 'express';
import './lib/cron';
import {getInstagramCount, getTwitterCount} from './lib/scraper';

const PORT = 9999;
const app = express();

app.get('/scrape', async (req, res, next) => {
    // const [twitterTweetCount, twitterFollowingCount, twitterFollowerCount, twitterLikeCount, instagramPostCount, instagramFollowingCount, instagramFollowerCount] = await Promise.all([getTwitterCount('tweets'), getTwitterCount('following'), getTwitterCount('followers'), getTwitterCount('favorites'), getInstagramCount('posts'), getInstagramCount('following'), getInstagramCount('followers')]);
    const [twitterTweetCount, twitterFollowingCount, twitterFollowerCount, twitterLikeCount] = await Promise.all([getTwitterCount('tweets'), getTwitterCount('following'), getTwitterCount('followers'), getTwitterCount('favorites')]);
    // const [instagramPostCount] = await Promise.all([getInstagramCount('followers')]);

    console.log(`Latest Twitter Data \nTWEETS:${twitterTweetCount} \nFOLLOWERS:${twitterFollowerCount} \nFOLLOWING:${twitterFollowingCount} \nLIKES:${twitterLikeCount}`);
    res.json({
        twitterTweetCount,
        twitterFollowerCount,
        twitterFollowingCount,
        twitterLikeCount,
        // instagramPostCount,
        // instagramFollowingCount,
        // instagramFollowerCount
    })
});

app.listen(PORT, () => {
    console.log(`Server listening on localhost:${PORT}`);
});