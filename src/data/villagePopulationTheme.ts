export type ThemeItem = {
    key: string;
    title: string;
    subtitle: string;
};

export const populaitonThemeList: ThemeItem[] = [
    {
        key: "P_CNT",
        title: "人口數小計",
        subtitle: "",
    },
    {
        key: "M_F_RAT",
        title: "性比例",
        subtitle:
            "男性人口相對於女性人口的比例，\n即每有100名女性人口就有多少的男性人口數。",
    },
    {
        key: "DEPENDENCY_RAT",
        title: "扶養比",
        subtitle:
            "每100個工作年齡人口（15-64歲人口）\n所需扶養的依賴人口數（0-14歲以及65歲以上人口）。",
    },
    {
        key: "A65_A0A14_RAT",
        title: "老化指數",
        subtitle:
            "老年人口（65歲以上人口）對幼年人口（0-14歲人口）之比，\n即每有100名幼年人口就有多少老年人口數。",
    },
    {
        key: "NATURE_INC_CNT",
        title: "自然增加人數",
        subtitle:
            "因出生、死亡而造成的人口增減數，\n即出生人數與死亡人數之差。",
    },
    {
        key: "SOCIAL_INC_CNT",
        title: "社會增加人數",
        subtitle:
            "因戶籍遷入、遷出而造成的人口增減數，\n即戶籍遷入數與遷出數之差。",
    },
];

export const industryThemeList: ThemeItem[] = [
    {
        key: "industry",
        title: "行政區工商家數",
        subtitle:
            "本圖表呈現嘉義縣「阿里山鄉」各產業別的工商家數變化情形，\n" +
            "資料採用每年最新月份之統計數據，不包含嘉義縣其他行政區。",
    },
    {
        key: "livestock",
        title: "現有牲畜數量統計",
        subtitle:
            "本圖表呈現嘉義縣「阿里山鄉」現有牲畜（豬、乳牛、羊）頭數之年度變化，\n" +
            "資料採用每年最新月份之統計數據，不包含嘉義縣其他行政區。",
    },
];
