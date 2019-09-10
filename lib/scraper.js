import axios from 'axios';
import cheerio from 'cheerio';
import db from "./db";

const USER = 'clint_milner';

async function getHTML(url) {
    const {data: html} = await axios.get(url);
    return html
}

async function getTwitterData(html, value) {
    const $ = cheerio.load(html);
    return $(`.ProfileNav-item--${value} .ProfileNav-value`).data('count');
}

async function getInstagramData(json, value) {
    const {graphql: {user}} = json,
        {edge_followed_by: {count: followers}, edge_follow: {count: following}, edge_owner_to_timeline_media: {count: posts}, full_name, profile_pic_url_hd: profile_pic} = user,
        ig = {
            full_name,
            profile_pic,
            posts,
            following,
            followers
        };

    return ig[value];
}

async function getTwitterCount(value) {
    const twitterHTML = await getHTML(`https://twitter.com/${USER}`);
    return getTwitterData(twitterHTML, value);
}

async function getInstagramCount(value) {
    const instagramJSON = await getHTML(`https://www.instagram.com/${USER}/?__a=1`);
    return getInstagramData(instagramJSON, value);
}

export async function runCron() {
    const timestamp = Date.now();
    const [twitterTweetCount, twitterFollowingCount, twitterFollowerCount, twitterLikeCount, instagramPostCount, instagramFollowingCount, instagramFollowerCount] = await Promise.all([getTwitterCount('tweets'), getTwitterCount('following'), getTwitterCount('followers'), getTwitterCount('favorites'), getInstagramCount('posts'), getInstagramCount('following'), getInstagramCount('followers')]);
    db.get('twitter').push({
        timestamp,
        twitterTweetCount,
        twitterFollowingCount,
        twitterFollowerCount,
        twitterLikeCount
    }).write();
    db.get('instagram').push({timestamp, instagramPostCount, instagramFollowingCount, instagramFollowerCount}).write();
}

export {getHTML, getTwitterCount, getInstagramCount};