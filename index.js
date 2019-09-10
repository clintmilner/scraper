import express from 'express';
import db from './lib/db';
import './lib/cron';
import {getInstagramCount, getTwitterCount} from './lib/scraper';

const PORT = 9999;
const app = express();

app.get('/scrape', async (req, res, next) => {
    console.log('getting all the data');
    const [twitterTweetCount, twitterFollowingCount, twitterFollowerCount, twitterLikeCount, instagramPostCount, instagramFollowingCount, instagramFollowerCount] = await Promise.all([getTwitterCount('tweets'), getTwitterCount('following'), getTwitterCount('followers'), getTwitterCount('favorites'), getInstagramCount('posts'), getInstagramCount('following'), getInstagramCount('followers')]);
    // db.get('twitter').push({ timestamp, twitterTweetCount, twitterFollowingCount, twitterFollowerCount, twitterLikeCount }).write();
    // db.get('instagram').push({ timestamp, instagramPostCount, instagramFollowingCount, instagramFollowerCount }).write();
    res.json({
        twitterTweetCount,
        twitterFollowerCount,
        twitterFollowingCount,
        twitterLikeCount,
        instagramPostCount,
        instagramFollowingCount,
        instagramFollowerCount
    })
});

app.listen(PORT, () => {
    console.log(`Server listening on localhost:${PORT}`);
});