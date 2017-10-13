import { baseAPIURL, animeEndpointAPI, personEndpointAPI, extendedDetailsAnimeEndpointAPI, cacheTTL } from './constants';
import { getSeriesIDFromURL, getSeiyuuIDFromURL } from './jsonDataHandling'; 
var PromiseThrottle = require('promise-throttle');
const request = require('request-json');
const client = request.createClient(baseAPIURL);

var promiseThrottle = new PromiseThrottle({
    requestsPerSecond: 1,           // up to x request per second
    promiseImplementation: Promise  // the Promise library you are using
  });

function createDetailsPromiseForAnimeID(animeID) {
    return client.get(animeEndpointAPI + animeID + extendedDetailsAnimeEndpointAPI);        
};

export async function getDetailsForAnimeIDArray(animeIDArray, cache) {
    try {
        let animeDetailsResults = [];
        let animeDetailsPromises = [];
        for(let animeID of animeIDArray) {
            let cacheValue = await cache.get("anime_" + animeID);
            if(!cacheValue) {
                animeDetailsPromises.push(promiseThrottle.add(createDetailsPromiseForAnimeID.bind(this, animeID))); 
                console.log("Uncached value");
            } else {
                animeDetailsResults.push(cacheValue); 
                console.log("Using cached value for anime ID : " + animeID); 
            }
        }

        let uncachedAnimeDetailsResults = await Promise.all(animeDetailsPromises); 
        return uncachedAnimeDetailsResults.map(function(uncachedAnimeDetailsResult) {
            let resultBody = uncachedAnimeDetailsResult.body; 
            const key = "anime_" + getSeriesIDFromURL(resultBody['link-canonical']);
            cache.set(key, resultBody, cacheTTL);
            return resultBody; 
        }).concat(animeDetailsResults); 
    } catch(err) {
        throw err; 
    }
};

function createDetailsPromiseForSeiyuuID(seiyuuID) {
    return client.get(personEndpointAPI + seiyuuID);         
};

export async function getDetailsForSeiyuuIDArray(seiyuuIDArray, cache) {
    try {
        let seiyuuDetailsResults = [];
        let seiyuuDetailsPromises = [];
        for(let seiyuuID of seiyuuIDArray) {
            let cacheValue = await cache.get("seiyuu_" + seiyuuID);
            if(!cacheValue) {
                seiyuuDetailsPromises.push(promiseThrottle.add(createDetailsPromiseForSeiyuuID.bind(this, seiyuuID))); 
                console.log("Uncached value for seiyuu ID : " + seiyuuID);
            } else {
                seiyuuDetailsResults.push(cacheValue); 
                console.log("Using cached value for seiyuu ID : " + seiyuuID); 
            }
        }

        let uncachedSeiyuuDetailsResults = await Promise.all(seiyuuDetailsPromises); 
        return uncachedSeiyuuDetailsResults.map(function(uncachedSeiyuuDetailsResult) {
            let resultBody = uncachedSeiyuuDetailsResult.body; 
            const key = "seiyuu_" + getSeiyuuIDFromURL(resultBody['link-canonical']);
            cache.set(key, resultBody, cacheTTL);
            return resultBody; 
        }).concat(seiyuuDetailsResults); 
    } catch(err) {
        throw err; 
    }
};