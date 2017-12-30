export function getSeiyuuDetails(animeDetailsArray) {

    // we will use this to build the seiyuu ID -> details map
    let seiyuuDetails = {};

    // iterate through the JSON data for each anime in the array
    animeDetailsArray.forEach(function (animeDetailsObject) {

        if(animeDetailsObject == false) {
            console.log("Anime details false!!!!"); 
            return;
        }

        let seriesName = animeDetailsObject.title;
        let seriesID = getSeriesIDFromURL(animeDetailsObject['link-canonical']);
        let characterArray = animeDetailsObject.character;
        // from anime details object, return an array of objects containing char name, char thumb and array of japanese seiyuus
        let seasonalCharacterAndSeiyuuDetails = extractSeasonalCharacterAndSeiyuuDetails(characterArray);

        seiyuuDetails = addSeiyuusToSeiyuuDetailsObject(seiyuuDetails, seriesName, seriesID, seasonalCharacterAndSeiyuuDetails);
    });

    return seiyuuDetails;
} 

export function enrichSeiyuuDetails(seiyuuDetailsMap, seiyuuDetailsArray) {
    seiyuuDetailsArray.forEach(function(seiyuuJSONDetails) {

        if(seiyuuJSONDetails == false) {
            console.log("Seiyyu details false"); 
            return; 
        }

        let seiyuuImage = seiyuuJSONDetails.image;
        let voiceActingRolesArray = seiyuuJSONDetails['voice-acting-role']; 

        let overallRolesArray = voiceActingRolesArray.map(function(currentRole) {
            return {
                characterName: currentRole.character.name,
                characterThumbnail: currentRole.character.image,
                seriesName: currentRole.anime.name,
                seriesID: getSeriesIDFromPartialURL(currentRole.anime.link)
            }
        }); 

        let seiyuuID = getSeiyuuIDFromURL(seiyuuJSONDetails['link-canonical']); 

        seiyuuDetailsMap[seiyuuID].image = seiyuuImage; 
        seiyuuDetailsMap[seiyuuID].overallRolesArray = overallRolesArray; 
    });

    return seiyuuDetailsMap; 
}

function addSeiyuusToSeiyuuDetailsObject(seiyuuDetailsMap, seriesName, seriesID, seasonalCharacterAndSeiyuuDetails) {
    seasonalCharacterAndSeiyuuDetails.forEach(function(charAndSeiyuuDetailsObject) {
        let seasonRoleObject = {
            characterName: charAndSeiyuuDetailsObject.characterName, 
            characterThumbnail: charAndSeiyuuDetailsObject.characterThumbnail,
            seriesName: seriesName,
            seriesID: seriesID
        }

        charAndSeiyuuDetailsObject.japaneseSeiyuus.forEach(function(japaneseSeiyuuObject) {
            let seiyuuID = getSeiyuuIDFromURL(japaneseSeiyuuObject.url);
            if(!seiyuuDetailsMap.hasOwnProperty(seiyuuID)) {
                seiyuuDetailsMap[seiyuuID] = {
                    name: japaneseSeiyuuObject.name,
                    currentSeasonRolesArray: [seasonRoleObject]
                }
            } else {
                seiyuuDetailsMap[seiyuuID].currentSeasonRolesArray.push(seasonRoleObject);
            }
        })
    })

    return seiyuuDetailsMap; 
}

function extractSeasonalCharacterAndSeiyuuDetails(characterArray) {
    return characterArray.map(function(characterObject) {
        let characterName = characterObject.name; 
        let characterThumbnail = characterObject.image; 
        let japaneseSeiyuus = getJapaneseSeiyuusFromArray(characterObject['voice-actor']); 

        return {
            characterName: characterName, 
            characterThumbnail: characterThumbnail, 
            japaneseSeiyuus: japaneseSeiyuus
        }
    });
}

function getJapaneseSeiyuusFromArray(seiyuuArray) {
    return seiyuuArray.filter(function (seiyuuObject) {
        return seiyuuObject.role == "Japanese"; 
    });
}

export function getSeiyuuIDFromURL(URL) {
    try {
        return parseInt(URL.split('/')[4], 10);
    } catch(e) {
        console.log("Could not fetch URL in getSeiyuuIDFromURL");
    }
}; 

export function getSeriesIDFromURL(URL) {
    try {
        return parseInt(URL.split('/')[4], 10); 
    } catch(e) {
        console.log("Could not fetch URL in getSeriesIDFromURL, URL : " + URL);
        throw e;
    }
};

function getSeriesIDFromPartialURL(URL) {
    try {
        return parseInt(URL.split('/')[2], 10);
    } catch(e) {
        console.log("Could not fetch URL in getSeriesIDFromPartialURL");
    }
};