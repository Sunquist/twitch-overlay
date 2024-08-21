import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const faceitApiRequest = async (props: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>> => {
    const req = await axios({
        baseURL: 'https://www.faceit.com/',
        ...props,
    });

    if (!req.data || (req.data.result && req.data.result !== 'OK'))
        throw new Error(`Unexpected error: ${req.data}`);

    return req;
}

const faceitOpenApiRequest = async (props: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>> => {
    const req = await axios({
        baseURL: 'https://open.faceit.com/',
        headers: {
            ...(props.headers || {}),
            Authorization: `Bearer ${process.env.FACEIT_OPEN_KEY}`
        },
        ...props,
    });

    if (!req.data || (req.data.result && req.data.result !== 'OK')){
        console.error("Faceit operation failed", req.data)
        throw new Error(`Unexpected error`);
    }

    return req;
}

export const getPlayer = async (nickname: string): Promise<Player> => {
    try {
        const req = await faceitOpenApiRequest({
          url: `/data/v4/players?nickname=${nickname}&game=cs2`,
        });
  
        return req.data as Player
    }catch(ex: any){
        console.error(ex);

        if(ex?.response?.status === 404)
            throw("USER_NOT_FOUND")
        else
            throw("UNEXPECTED_ERROR")
    }
}

export const getRanking = async (id: string, region: string): Promise<RankingData> => {
    try {
        const req = await faceitOpenApiRequest({
          url: `/data/v4/rankings/games/cs2/regions/${region}/players/${id}`,
        });
  
        return req.data as RankingData
    }catch(ex: any){
        console.error(ex);

        
        throw("RANKING_FETCH_FAILED")
    }
}

export const getStats = async (id: string, region: string): Promise<Stats> => {
    try {
        const req = await faceitOpenApiRequest({
          url: `/data/v4/players/${id}/games/cs2/stats`,
        });
  
        return req.data as Stats
    }catch(ex: any){
        console.error(ex);

        throw("STATS_FETCH_FAILED")
    }
}

export const getStatsUiAPI = async (id: string, matches?: number): Promise<MatchStats[]> => {
    try {
        const req = await faceitApiRequest({
          url: `/api/stats/v1/stats/time/users/${id}/games/cs2?size=${matches || "30"}`,
        });
  
        return req.data as MatchStats[]
    }catch(ex: any){
        console.error(ex);

        throw("STATS_FETCH_FAILED")
    }
}

export const getSummary = async (nickname:string): Promise<Summary> => {
    try {
        const player = await getPlayer(nickname)

        if(!player)
            throw("INVALID_NICKNAME")

        if(!player.games.cs2.region)
            throw("PLAYER_NOPLAY_CS2")

        const ranking = await getRanking(player.player_id, player.games.cs2.region)
        const stats = await getStatsUiAPI(player.player_id)

        let today = new Date(Date.now());

        if(today.getUTCHours() < 5){// If clock is between 00 -> 05 UTC
            today.setUTCDate(today.getUTCDate() - 1);
        }
      
        today.setUTCHours(5);
        today.setUTCMinutes(0);
        today.setUTCSeconds(0);
        today.setUTCMilliseconds(1);

        const compStats = (stats && stats.length > 0) ? stats.filter(m => m.elo) : []

        const newestMatch = compStats[0]
        const matchesToday = compStats.filter((row) => today.valueOf() < new Date(row.date).valueOf())
        const earliestMatch = compStats.find((row) => today.valueOf() > new Date(row.date).valueOf())

        const eloDiff = (!newestMatch || !earliestMatch)? 0 : 
            ((today.valueOf() > new Date(newestMatch.date).valueOf())? 0 : (player.games.cs2.faceit_elo - parseInt(`${earliestMatch?.elo || 0}`)))

        const wonMatches = matchesToday.filter((m) => m.i10 === "1")
        const lostMatches = matchesToday.filter((m) => m.i10 === "0")

        return {
            elo: player.games.cs2.faceit_elo,
            eloDiff: eloDiff,
            wins: wonMatches.length,
            losses: lostMatches.length,
            ranking: ranking.position,
            image: (ranking.position < 1001)? "https://cdn-frontend.faceit-cdn.net/web/static/media/fuse-foundations_icons_rank_challenger-icon.svg"
            : `https://cdn-frontend.faceit.com/web/960/src/app/assets/images-compress/skill-icons/skill_level_${player.games.cs2.skill_level}_svg.svg`
        }
    }catch(ex: any){
        console.error(ex);
        throw("SUMMARY_FAILED")
    }
}


export const getRankingUiAPI = async (id: string, region: string): Promise<GlobalRanking> => {
    try {
        const req = await faceitApiRequest({
          url: `/api/ranking/v1/globalranking/cs2/${region}/${id}`,
        });
  
        return req.data as GlobalRanking
    }catch(ex: any){
        console.error(ex);

        throw("RANKING_FETCH_FAILED")
    }
}

