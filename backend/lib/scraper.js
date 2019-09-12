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

async function getInstagramData(html, url) {
    // console.log(html);
    const $ = cheerio.load(html);
    console.log('loaded html');
    const dataInString = $(`html`).html();
    console.log('loaded html', dataInString);
    // dataInString.map((idx, data) => {
    //     console.log('');
    //     console.log('get data in string - not parsed anymore', idx);
    //     console.log('==================================');
    //     console.log('============ START IG ============');
    //     console.log('==================================');
    //     console.log(data);
    //     console.log('==================================');
    //     console.log('============== END IG ============');
    //     console.log('==================================');
    //     console.log('');
    // });

    return {url, dataInString};
    // const {graphql: {user}} = json,
    //     {edge_followed_by: {count: followers}, edge_follow: {count: following}, edge_owner_to_timeline_media: {count: posts}, full_name, profile_pic_url_hd: profile_pic} = user,
    //     ig = {
    //         full_name,
    //         profile_pic,
    //         posts,
    //         following,
    //         followers
    //     };
    //
    // return ig[value];
}

async function getTwitterCount(value) {
    const twitterHTML = await getHTML(`https://twitter.com/${USER}`);
    return getTwitterData(twitterHTML, value);
}

async function getInstagramCount(value) {
    // const instagramJSON = await getHTML(`https://www.instagram.com/${USER}/?__a=1`);
    const url = `https://m.instagram.com/${USER}`;
    const instagramJSON = await getHTML(url);
    return getInstagramData(instagramJSON, url);
}

export async function runCron() {
    const timestamp = Date.now();
    const [twitterTweetCount, twitterFollowingCount, twitterFollowerCount, twitterLikeCount] = await Promise.all([getTwitterCount('tweets'), getTwitterCount('following'), getTwitterCount('followers'), getTwitterCount('favorites')]);
    db.get('twitter').push({
        timestamp,
        twitterTweetCount,
        twitterFollowingCount,
        twitterFollowerCount,
        twitterLikeCount
    }).write();
    // db.get('instagram').push({timestamp, instagramPostCount, instagramFollowingCount, instagramFollowerCount}).write();
}

export {getHTML, getTwitterCount, getInstagramCount};