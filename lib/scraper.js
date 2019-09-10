import axios from 'axios';
import cheerio from 'cheerio';


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

export { getHTML, getTwitterData, getInstagramData };