interface Player {
    player_id: string;
    nickname: string;
    avatar: string;
    country: string;
    cover_image: string;
    platforms: {
        steam: string;
    };
    games: {
        cs2: GameInfo;
        csgo: GameInfo;
        pubg: GameInfo;
    };
    settings: {
        language: string;
    };
    friends_ids: string[];
    new_steam_id: string;
    steam_id_64: string;
    steam_nickname: string;
    memberships: string[];
    faceit_url: string;
    membership_type: string;
    cover_featured_image: string;
    infractions: Record<string, unknown>;
    verified: boolean;
    activated_at: string;
}

interface GameInfo {
    region: string;
    game_player_id: string;
    skill_level: number;
    faceit_elo: number;
    game_player_name: string;
    skill_level_label: string;
    regions: Record<string, unknown>;
    game_profile_id: string;
}

interface GlobalRanking {
    code: string;
    env: string;
    message: string;
    payload: number;
    time: number;
    version: string;
}

interface CountryRankingData {
    player_id: string;
    nickname: string;
    country: string;
    position: number;
    faceit_elo: number;
    game_skill_level: number;
}

interface RankingData {
    position: number;
    items: CountryRankingData[];
    start: number;
    end: number;
}

interface Stats {
    "Competition Id": string;
    "Pistol Kills": string;
    "Penta Kills": string;
    "1v1Wins": string;
    "1v1Count": string;
    "Clutch Kills": string;
    "Team": string;
    "Utility Count": string;
    "Match Round": string;
    "Game Mode": string;
    "K/R Ratio": string;
    "Double Kills": string;
    "Entry Count": string;
    "Assists": string;
    "K/D Ratio": string;
    "Zeus Kills": string;
    "1v2Wins": string;
    "First Half Score": string;
    "Winner": string;
    "Final Score": string;
    "Entry Wins": string;
    "Created At": string;
    "1v2Count": string;
    "Enemies Flashed": string;
    "Damage": string;
    "Sniper Kills": string;
    "Flash Count": string;
    "Headshots %": string;
    "Headshots": string;
    "Utility Damage": string;
    "Updated At": string;
    "Flash Successes": string;
    "Utility Successes": string;
    "Kills": string;
    "Nickname": string;
    "Map": string;
    "MVPs": string;
    "Deaths": string;
    "Quadro Kills": string;
    "Utility Enemies": string;
    "Triple Kills": string;
    "ADR": string;
    "Overtime score": string;
    "Match Id": string;
    "Knife Kills": string;
    "Region": string;
    "Game": string;
    "Second Half Score": string;
    "Result": string;
    "Rounds": string;
    "Score": string;
    "Best Of": string;
    "Player Id": string;
    "First Kills": string;
}

interface Item {
    stats: Stats;
}

interface MatchData {
    items: Item[];
    start: number;
    end: number;
}

interface Summary {
    elo: number,
    eloDiff: number,
    wins: number,
    losses: number,
    ranking: number,
    image: string
}

interface MatchIdentifier {
    matchId: string;
    playerId: string;
}

interface MatchStats {
    _id: MatchIdentifier;
    created_at: number;
    updated_at: number;
    i31: string;
    i30: string;
    i33: string;
    i10: string;
    i32: string;
    i13: string;
    i35: string;
    i34: string;
    i37: string;
    i15: string;
    i36: string;
    i14: string;
    i39: string;
    i38: string;
    i16: string;
    nickname: string;
    playerId: string;
    i40: string;
    i20: string;
    i22: string;
    i21: string;
    i24: string;
    i23: string;
    i26: string;
    i6: string;
    i25: string;
    i28: string;
    i7: string;
    i8: string;
    i27: string;
    i9: string;
    i29: string;
    c10: string;
    c2: string;
    c3: string;
    c4: string;
    c1: string;
    i19: string;
    teamId: string;
    i3: string;
    i4: string;
    i5: string;
    premade: boolean;
    c5: string;
    bestOf: string;
    competitionId: string;
    date: number;
    game: string;
    gameMode: string;
    i0: string;
    i1: string;
    i12: string;
    i18: string;
    i2: string;
    matchId: string;
    matchRound: string;
    played: string;
    status: string;
    elo: string;
}