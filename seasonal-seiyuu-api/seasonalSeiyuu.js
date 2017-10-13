import { currentlyAiring, cacheTTL } from './constants'; 
import { getDetailsForAnimeIDArray, getDetailsForSeiyuuIDArray } from './apiRequests'; 
import { getSeiyuuDetails, enrichSeiyuuDetails } from './jsonDataHandling'; 

var Cacheman = require('cacheman');
var cache = new Cacheman({engine: "file"});

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});

export async function seiyuuDetailsHandler(seiyuuID) {
    try {
        let seiyuuDetailsMap = await getCachedOrUncachedSeiyuuDetailsMap();
        if(seiyuuDetailsMap.hasOwnProperty(seiyuuID)) {
            return seiyuuDetailsMap[seiyuuID]; 
        }

        throw new Error('Seiyuu details do not exist');
    } catch(err) {
        throw err;
    }
}

export async function currentSeasonSummaryHandler() {
    try {
        let seiyuuDetailsMap = await getCachedOrUncachedSeiyuuDetailsMap();
        let currentSeasonSeiyuuArray = []; 
        for(const seiyuuID of Object.keys(seiyuuDetailsMap)) {
            let seiyuuDetails = seiyuuDetailsMap[seiyuuID]; 
            currentSeasonSeiyuuArray.push({
                name: seiyuuDetails.name,
                currentSeasonRolesArray: seiyuuDetails.currentSeasonRolesArray,
                image: seiyuuDetails.image,
                id: seiyuuID
            })
        }

        return currentSeasonSeiyuuArray;
    } catch(err) {
        throw err;
    }
}

async function getCachedOrUncachedSeiyuuDetailsMap() {
    try {
        let cacheValue = await cache.get("main_data"); 
        if(!cacheValue) {
            let seiyuuDetailsMap = await getSeiyuuDetailsMapPromise(); 
            cache.set("main_data", seiyuuDetailsMap, cacheTTL);
            return seiyuuDetailsMap; 
        } 
        
        return cacheValue;
    } catch(err) {
        throw err;
    }
}

function getSeiyuuDetailsMapPromise() {
    let seiyuuDetailsMap = {};     

    return getDetailsForAnimeIDArray(currentlyAiring, cache)
        .then(function(animeDetailsArray) {
            console.log("Fetched details for anime array"); 
            seiyuuDetailsMap = getSeiyuuDetails(animeDetailsArray);
            return getDetailsForSeiyuuIDArray(Object.keys(seiyuuDetailsMap), cache); 
        })
        .catch(function(error) {
            throw error; 
        })
        .then(function(seiyuuDetailsArray) {
            console.log("Fetched details for seiyuu array"); 
            console.log("Seiyuu array size is : " + seiyuuDetailsArray.length);
            return enrichSeiyuuDetails(seiyuuDetailsMap, seiyuuDetailsArray);
        })
        .catch(function(error) {
            throw error; 
        })
        .then(function(enrichedSeiyuuDetailsMap) {
            console.log("Enriched seiyuu array with image and overall roles info"); 
            return enrichedSeiyuuDetailsMap; 
        })
        .catch(function(error) {
            throw error; 
        });
}