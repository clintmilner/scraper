import { getHTML, getTwitterData, getInstagramData } from './lib/scraper';
const USER = 'clint_milner';

async function go() {
    const twitterHTML = await getHTML(`https://twitter.com/${USER}`);
    const instagramHTML = await getHTML(`https://www.instagram.com/${USER}/?__a=1`);
    const twitterTweetCount = await getTwitterData(twitterHTML, 'tweets');
    const twitterFollowingCount = await getTwitterData(twitterHTML, 'following');
    const twitterFollowerCount = await getTwitterData(twitterHTML, 'followers');
    const twitterLikeCount = await getTwitterData(twitterHTML, 'favorites');
    const instagramPostCount = await getInstagramData(instagramHTML, 'posts');
    const instagramFollowingCount = await getInstagramData(instagramHTML, 'following');
    const instagramFollowerCount = await getInstagramData(instagramHTML, 'followers');
    // const instagramUserName = await getInstagramData(instagramHTML, 'full_name');
    // const instagramProfilePic = await getInstagramData(instagramHTML, 'profile_pic');

    console.log('twitterTweetCount', twitterTweetCount);
    console.log('twitterFollowingCount', twitterFollowingCount);
    console.log('twitterFollowerCount', twitterFollowerCount);
    console.log('twitterLikeCount', twitterLikeCount);
    console.log('=================================');
    console.log('instagramPostCount', instagramPostCount);
    console.log('instagramFollowingCount', instagramFollowingCount);
    console.log('instagramFollowerCount', instagramFollowerCount);
    // console.log('instagramUserName', instagramUserName);
    // console.log('instagramProfilePic', instagramProfilePic);
}

go();