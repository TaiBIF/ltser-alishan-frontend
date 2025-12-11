export type ThemeItem = {
    title: string;
    subtitle: string;
};

export const populaitonThemeList: ThemeItem[] = [
    {
        title: "人口數小計",
        subtitle: "",
    },
    {
        title: "性比例",
        subtitle:
            "男性人口相對於女性人口的比例，\n即每有100名女性人口就有多少的男性人口數。",
    },
    {
        title: "扶養比",
        subtitle:
            "每100個工作年齡人口（15-64歲人口）\n所需扶養的依賴人口數（0-14歲以及65歲以上人口）。",
    },
    {
        title: "老化指數",
        subtitle:
            "老年人口（65歲以上人口）對幼年人口（0-14歲人口）之比，\n即每有100名幼年人口就有多少老年人口數。",
    },
    {
        title: "自然增加人數",
        subtitle:
            "因出生、死亡而造成的人口增減數，\n即出生人數與死亡人數之差。",
    },
    {
        title: "社會增加人數",
        subtitle:
            "因戶籍遷入、遷出而造成的人口增減數，\n即戶籍遷入數與遷出數之差。",
    },
];

export const industryThemeList: ThemeItem[] = [
    {
        title: "行政區工商家數",
        subtitle: "",
    },
    {
        title: "現有牲畜數量統計",
        subtitle: "",
    },
];
