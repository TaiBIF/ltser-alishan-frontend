// types
import type { AboutItemType } from "../types/item";

// data
import camtrapAbout from "../assets/about-camtrap.jpg";
import phenologyAbout from "../assets/about-phenology.jpg";
import ecologicalEconomics from "../assets/about-ecological-economics.jpg";
import ecologicalCulture from "../assets/about-ecological-culture.jpg";

export const aboutItemList = (): AboutItemType[] => [
    {
        id: 1,
        path: "camera-trap",
        type_zh: "生態觀測",
        title: "動物資源",
        content:
            "建立陸域中大型哺乳動物監測樣區，以紅外線自動相機為主要監測工具，了解在狩獵自主管理的政策推動下，陸域哺乳動的豐度是否產生改變。另輔以原民站總計畫架設的自動錄音機，監測鳥類相組成的變化。這些哺乳類與鳥類豐度的改變除了可能受到環境變遷及狩獵自主管理制度的影響之外，動物豐度本身也可能影響鄒族的經濟活動（例如生態旅遊、狩獵體驗）及當地的植被，甚至可能影響農業生產（例如草食獸對農作物的危害）。此項目除了自主監測之外，也收集林業及自然保育署嘉義分署、玉山國家公園等機關歷年累積的動物資源調查成果，當作歷史資料做為對照。另外，我們也培力部落族人自力架設相機及分析資料，期能達成狩獵自主管理的目標。",
        bg_img: camtrapAbout,
    },
    {
        id: 2,
        path: "phenology",
        type_zh: "生態觀測",
        title: "植物資源",
        content:
            "建立森林動態樣區，調查樣區內木本植物的組成和生物量變化，木本小苗、草本植物及凋落物的動態變化則在動態樣區內取樣並逐季監測，另外在獵徑上或附近選定與狩獵行為有關的植物種類進行兩周一次的物候調查，以了解植物社會受氣候變遷的變化以及對狩獵行為和動物族群的影響。對於過去植被與土地利用的變遷則使用多期GIS圖資建置提供予後續研究利用。",
        bg_img: phenologyAbout,
    },
    {
        id: 3,
        path: "terresoundindex",
        type_zh: "生態觀測",
        title: "聲景調查",
        content:
            "被動式聲學監測是一種新興的生態監測方法，已廣泛地應用於海洋與陸域生態系統的監測，大幅降低傳統調查所需的人力與可能的調查偏差，並在夜間、能見度低的環境或惡劣天氣下持續進行觀測，提供長期且高時間解析度的監測資料。透過被動收聽各種海洋或陸域發聲動物的聲音，將能以非侵入性、低干擾的方式收集到大量生物行為活動資料。陸域聲景的部分將設置超音波及可聽音錄音機，進行監測。並利用人工智慧模型協助辨識物種叫聲，記錄陸域生物的種類。",
        bg_img: phenologyAbout,
    },
    {
        id: 4,
        path: "weather",
        type_zh: "環境觀測",
        title: "氣象觀測",
        content: "",
        bg_img: phenologyAbout,
    },
    {
        id: 9,
        path: "ecological-economics",
        type_zh: "生態經濟",
        title: "[暫放] 生態經濟",
        content:
            "在氣候變遷與社會經濟發展下，鄒族自然資源治理、氣候、生態、文化交互影響，本計畫針對鄒族傳統領域之社會生態系統價值，透過關鍵參與者與利害相關人之深度訪談與問卷訪談，期能進行傳統領域生態經濟效益分析。",
        bg_img: ecologicalEconomics,
    },
    {
        id: 10,
        path: "ecological-culture",
        type_zh: "經濟與文化面向",
        title: "[暫放] 經濟與文化面向",
        content:
            "了解鄒族的決策體系與過程，掌握其組織、分工與權威來源，可分析權威來源是傳統文化，還是當代行政官僚體系所賦予。經濟面向第一年度聚焦觀光，監測項目包括：年度旅客人數、車流量、停留時間、平均花費、店家年度收入、淡旺季之差異；民宿 & 咖啡廳數目消長及經營人員背景資料（住宿價格、店長年紀、年收入、開店經營年數、負責人工作經歷、可能帶領遊客的活動項目、負責人本身對族群文化意識的認知、民宿或負責人對社區與部落參與程度、來客資料如消費金額、停留時間等）。",
        bg_img: ecologicalCulture,
    },
];
