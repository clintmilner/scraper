import { useContext } from 'react';
import { ScrapeContext } from './ScrapeContext';
import {formatDistance} from 'date-fns';

export default function Data() {
    const {scrapes} = useContext(ScrapeContext);
    return (
        <div>
            <h2>Your Data:</h2>
            <ul>
                {
                    scrapes.twitter.map(({twitterFollowerCount, twitterFollowingCount, twitterLikeCount, twitterTweetCount, timestamp}, idx) => {
                        return (
                            <li key={idx}>{formatDistance(new Date(timestamp), new Date())} ago - {`TWEETS:${twitterTweetCount}  FOLLOWERS:${twitterFollowerCount}  FOLLOWING:${twitterFollowingCount}  LIKES:${twitterLikeCount}`}</li>
                        );
                    })
                }
            </ul>
            {scrapes.twitter.length}
        </div>
    )
}
