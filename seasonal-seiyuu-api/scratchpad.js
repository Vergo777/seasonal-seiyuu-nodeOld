var osmosis = require('osmosis');

// osmosis.get('https://myanimelist.net/anime/season')
//     .find('p > a')
//     .set({
//         link: '@href'
//     })
//     .data(function(results) {
//         // ID = getSeriesIDFromURL(results.link)
//         // console.log(ID + ",");

//         console.log("\"" + results.link + "\",")
//     });

showsList = [
    "https://myanimelist.net/anime/35062/Mahoutsukai_no_Yome",
    "https://myanimelist.net/anime/35788/Shokugeki_no_Souma__San_no_Sara",
    "https://myanimelist.net/anime/34572/Black_Clover_TV",
    "https://myanimelist.net/anime/34451/Kekkai_Sensen___Beyond",
    "https://myanimelist.net/anime/35639/Just_Because",
    "https://myanimelist.net/anime/35076/Juuni_Taisen",
    "https://myanimelist.net/anime/36027/Ousama_Game_The_Animation",
    "https://myanimelist.net/anime/32271/Dies_Irae",
    "https://myanimelist.net/anime/35376/Himouto_Umaru-chan_R",
    "https://myanimelist.net/anime/34542/Inuyashiki",
    "https://myanimelist.net/anime/35079/Kino_no_Tabi__The_Beautiful_World_-_The_Animated_Series",
    "https://myanimelist.net/anime/35838/Shoujo_Shuumatsu_Ryokou",
    "https://myanimelist.net/anime/35413/Imouto_sae_Ireba_Ii",
    "https://myanimelist.net/anime/35712/Boku_no_Kanojo_ga_Majimesugiru_Sho-bitch_na_Ken",
    "https://myanimelist.net/anime/36038/Net-juu_no_Susume",
    "https://myanimelist.net/anime/31456/Code_Realize__Sousei_no_Himegimi",
    "https://myanimelist.net/anime/35843/Gintama__Porori-hen",
    "https://myanimelist.net/anime/34712/Kujira_no_Kora_wa_Sajou_ni_Utau",
    "https://myanimelist.net/anime/35484/Osake_wa_Fuufu_ni_Natte_kara",
    "https://myanimelist.net/anime/35180/3-gatsu_no_Lion_2nd_Season",
    "https://myanimelist.net/anime/33478/UQ_Holder__Mahou_Sensei_Negima_2",
    "https://myanimelist.net/anime/34973/Love_Live_Sunshine_2nd_Season",
    "https://myanimelist.net/anime/35241/Konohana_Kitan",
    "https://myanimelist.net/anime/34618/Blend_S",
    "https://myanimelist.net/anime/35557/Houseki_no_Kuni_TV",
    "https://myanimelist.net/anime/36198/Omiai_Aite_wa_Oshiego_Tsuyoki_na_Mondaiji",
    "https://myanimelist.net/anime/35067/Osomatsu-san_2nd_Season",
    "https://myanimelist.net/anime/36144/Garo__Vanishing_Line",
    "https://myanimelist.net/anime/35427/Animegataris",
    "https://myanimelist.net/anime/35251/Sengoku_Night_Blood",
    "https://myanimelist.net/anime/36259/Pingu_in_the_City",
    "https://myanimelist.net/anime/34284/Yuuki_Yuuna_wa_Yuusha_de_Aru__Washio_Sumi_no_Shou",
    "https://myanimelist.net/anime/35250/Urahara",
    "https://myanimelist.net/anime/36245/Evil_or_Live",
    "https://myanimelist.net/anime/36220/Itsudatte_Bokura_no_Koi_wa_10_Centi_Datta",
    "https://myanimelist.net/anime/34445/Yuuki_Yuuna_wa_Yuusha_de_Aru__Yuusha_no_Shou",
    "https://myanimelist.net/anime/35075/Hoozuki_no_Reitetsu_2nd_Season",
    "https://myanimelist.net/anime/36009/Two_Car",
    "https://myanimelist.net/anime/35999/Dia_Horizon__Kakko_Kabu",
    "https://myanimelist.net/anime/34903/RoboMasters_the_Animated_Series",
    "https://myanimelist.net/anime/34474/Tsukipro_The_Animation",
    "https://myanimelist.net/anime/34915/The_iDOLMSTER_SideM",
    "https://myanimelist.net/anime/34411/Taishou_Chicchai-san",
    "https://myanimelist.net/anime/34522/Wake_Up_Girls_Shin_Shou",
    "https://myanimelist.net/anime/33027/Infini-T_Force",
    "https://myanimelist.net/anime/34771/Dynamic_Chord",
    "https://myanimelist.net/anime/35334/ClassicaLoid_2nd_Season",
    "https://myanimelist.net/anime/35883/Cinderella_Girls_Gekijou_2nd_Season",
    "https://myanimelist.net/anime/35818/Love_Kome__We_Love_Rice_2nd_Season",
    "https://myanimelist.net/anime/35923/Ame-iro_Cocoa_Series__Ame-con",
    "https://myanimelist.net/anime/36166/Fireball_Humorous",
    "https://myanimelist.net/anime/36288/Glamorous_Heroes",
    "https://myanimelist.net/anime/36022/Cardfight_Vanguard_G__Z",
    "https://myanimelist.net/anime/36135/Oretacha_Youkai_Ningen",
    "https://myanimelist.net/anime/36440/Ku_Pao_Ying_Xiong",
    "https://myanimelist.net/anime/35254/Time_Bokan__Gyakushuu_no_San_Akunin",
    "https://myanimelist.net/anime/36409/Yodel_no_Onna",
    "https://myanimelist.net/anime/36073/Aiseki_Mogol_Girl",
    "https://myanimelist.net/anime/34566/Boruto__Naruto_Next_Generations",
    "https://myanimelist.net/anime/34662/Fate_Apocrypha",
    "https://myanimelist.net/anime/34636/Ballroom_e_Youkoso",
    "https://myanimelist.net/anime/34547/Shoukoku_no_Altair",
    "https://myanimelist.net/anime/35220/Youkai_Apartment_no_Yuuga_na_Nichijou",
]; 

showsList.forEach(function(show) {
    console.log(getSeriesIDFromURL(show) + ",");
});

function getSeriesIDFromURL(URL) {
    fields = URL.split('/'); 
    if(fields.length < 5 || fields[3] != "anime") {
        return -1; 
    }
    return fields[4]; 
};