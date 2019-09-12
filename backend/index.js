import express from 'express';
import './lib/cron';
import db from './lib/db';
import cors from 'cors';
import {getTwitterCount} from './lib/scraper';

const PORT = 9999;
const app = express();

app.use(cors());

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

app.get('/data', async (req, res, next) => {
    // get the scraped data
    // respond with JSON
    const {twitter: twitterArr} = db.value();
    const twitterTweetCount = twitterArr
        .filter(({twitterTweetCount: tweets}, idx) => (idx === 0 || tweets !== twitterArr[idx - 1]['twitterTweetCount']))
        .map(({twitterTweetCount: tweets, timestamp: ts}) => ({
            twitterTweetCount: tweets,
            timestamp: ts
        }));
    const twitterFollowingCount = twitterArr
        .filter(({twitterFollowingCount: following}, idx) => (idx === 0 || following !== twitterArr[idx - 1]['twitterFollowingCount']))
        .map(({twitterFollowingCount: following, timestamp: ts}) => ({
            twitterFollowingCount: following,
            timestamp: ts
        }));
    const twitterFollowerCount = twitterArr
        .filter(({twitterFollowerCount: followers}, idx) => (idx === 0 || followers !== twitterArr[idx - 1]['twitterFollowerCount']))
        .map(({twitterFollowerCount: followers, timestamp: ts}) => ({
            twitterFollowerCount: followers,
            timestamp: ts
        }));
    const twitterLikeCount = twitterArr
        .filter(({twitterLikeCount: likes}, idx) => (idx === 0 || likes !== twitterArr[idx - 1]['twitterLikeCount']))
        .map(({twitterLikeCount: likes, timestamp: ts}) => ({
            twitterLikeCount: likes,
            timestamp: ts
        }));
    const twitter = {
        twitterTweetCount,
        twitterFollowingCount,
        twitterFollowerCount,
        twitterLikeCount
    };

    res.json(twitter);
});

app.listen(PORT, () => {
    console.log(`Server listening on localhost:${PORT}`);
});