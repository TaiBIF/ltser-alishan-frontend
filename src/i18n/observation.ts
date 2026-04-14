import type { Lang } from "../context/LangContext";
import { getCommonText } from "./common";

type ObservationTextKey =
    | "mobileObservationItemSelect"
    | "mobileItemSelect"
    | "dataCatalogDescriptionStart"
    | "dataCatalogDescriptionMiddle"
    | "dataCatalogDescriptionEnd"
    | "privacyPolicy"
    | "termsOfUse"
    | "catalogType"
    | "catalogDatasetName"
    | "viewDatasetAndMethod"
    | "locationUnavailable"
    | "locationSelect"
    | "fieldSearchTitle"
    | "date"
    | "keyword"
    | "keywordPlaceholder"
    | "surveyYear"
    | "observationItem"
    | "viewChart"
    | "populationStructure"
    | "industryStructure"
    | "populationOverview"
    | "populationPyramid"
    | "populationChange"
    | "selectYear"
    | "loadingData"
    | "noData"
    | "populationDataSource"
    | "yearSuffix"
    | "areaMapSubtext"
    | "pyramidSubtext"
    | "populationCountLabel"
    | "peopleUnit"
    | "femalePeople"
    | "malePeople"
    | "male"
    | "female"
    | "search"
    | "clear"
    | "interviewNoData"
    | "downloadNeedLogin"
    | "downloadInvalidItem"
    | "rowCount"
    | "perPage"
    | "selectRowCount"
    | "rowUnit"
    | "downloadObservationData"
    | "downloadCatalog"
    | "observationLoading"
    | "observationError"
    | "observationNoData"
    | "paginationPrev"
    | "paginationNext"
    | "chartNeedLocation"
    | "chartNoItem"
    | "chartLoading"
    | "chartError"
    | "chartNoData"
    | "none"
    | "cameraTrapSpeciesCount"
    | "birdSoundSpeciesCount"
    | "plantPhenologySpeciesCount"
    | "speciesCount"
    | "acousticAci"
    | "acousticAdi"
    | "acousticBi"
    | "acousticNdsi"
    | "weatherTemp"
    | "weatherPrecip"
    | "tooltipSpeciesCount";

const OBSERVATION_TEXT_MAP: Record<ObservationTextKey, Record<Lang, string>> = {
    mobileObservationItemSelect: {
        "zh-TW": "觀測項目選擇",
        en: "Select Observation Item",
    },
    mobileItemSelect: {
        "zh-TW": "項目選擇",
        en: "Select Item",
    },
    dataCatalogDescriptionStart: {
        "zh-TW": "本頁彙整 LTSER 阿里山站長期社會生態核心觀測資料。若您需要完整觀測資料，請先登入會員，並點擊下方表格的對應觀測項目頁面，使用「資料下載」或「物種名錄下載」功能進行取得。使用前請先詳閱本網站",
        en: "This page compiles long-term social-ecological core observation datasets from the LTSER Alishan site. For full datasets, please sign in first, then open the corresponding observation item from the table below and use \"Data Download\" or \"Species Catalog Download\". Before use, please read our",
    },
    dataCatalogDescriptionMiddle: {
        "zh-TW": "與",
        en: "and",
    },
    dataCatalogDescriptionEnd: {
        "zh-TW": "，並依規範使用。",
        en: "and follow the usage requirements.",
    },
    privacyPolicy: {
        "zh-TW": "隱私權政策",
        en: "Privacy Policy",
    },
    termsOfUse: {
        "zh-TW": "使用者條款",
        en: "Terms of Use",
    },
    catalogType: {
        "zh-TW": "類型",
        en: "Type",
    },
    catalogDatasetName: {
        "zh-TW": "資料集名稱",
        en: "Dataset",
    },
    viewDatasetAndMethod: {
        "zh-TW": "查看資料集與研究方法",
        en: "View Dataset and Methods",
    },
    locationUnavailable: {
        "zh-TW": "目前沒有可用樣站",
        en: "No available sites at the moment.",
    },
    locationSelect: {
        "zh-TW": "請選擇測站/樣區",
        en: "Please select site",
    },
    fieldSearchTitle: {
        "zh-TW": "資料列表搜尋",
        en: "Dataset Search",
    },
    date: {
        "zh-TW": "日期",
        en: "Date",
    },
    keyword: {
        "zh-TW": "關鍵字",
        en: "Keyword",
    },
    keywordPlaceholder: {
        "zh-TW": "請輸入關鍵字",
        en: "Please enter keyword",
    },
    surveyYear: {
        "zh-TW": "調查年份",
        en: "Survey Year",
    },
    observationItem: {
        "zh-TW": "觀測項目",
        en: "Observation Item",
    },
    viewChart: {
        "zh-TW": "查看圖表",
        en: "View Chart",
    },
    populationStructure: {
        "zh-TW": "人口結構",
        en: "Population Structure",
    },
    industryStructure: {
        "zh-TW": "產業結構",
        en: "Industry Structure",
    },
    populationOverview: {
        "zh-TW": "人口概況",
        en: "Population Overview",
    },
    populationPyramid: {
        "zh-TW": "人口金字塔",
        en: "Population Pyramid",
    },
    populationChange: {
        "zh-TW": "人口變遷",
        en: "Population Change",
    },
    selectYear: {
        "zh-TW": "請選擇年份",
        en: "Please select year",
    },
    loadingData: {
        "zh-TW": "資料載入中",
        en: "Loading data...",
    },
    noData: {
        "zh-TW": "尚無資料",
        en: "No data available.",
    },
    populationDataSource: {
        "zh-TW": "資料來源：SEGIS 社會經濟資料服務平台",
        en: "Source: SEGIS Socioeconomic Data Service Platform",
    },
    yearSuffix: {
        "zh-TW": "年",
        en: "",
    },
    areaMapSubtext: {
        "zh-TW": "本圖表以地圖方式呈現嘉義縣阿里山鄉及其周邊設有觀測站之村里分布情形，其中包含一處位於番路鄉之觀測村里。\n滑鼠懸停於各村里時可查看人口數，資料採用每年最新月份之統計數據。",
        en: "This map shows villages in Alishan Township, Chiayi County, and nearby villages with observation stations, including one village in Fanlu Township.\nHover over each village to view population. Data uses the latest monthly statistics of each year.",
    },
    pyramidSubtext: {
        "zh-TW": "本圖表為嘉義縣「阿里山鄉」的人口金字塔，用以呈現該鄉各年齡層與性別的人口分布情形，資料採用每年最新月份之統計數據，不包含嘉義縣其他行政區。",
        en: "This population pyramid shows the age and sex distribution in Alishan Township, Chiayi County. Data uses the latest monthly statistics of each year and excludes other townships in Chiayi County.",
    },
    populationCountLabel: {
        "zh-TW": "人口數",
        en: "Population",
    },
    peopleUnit: {
        "zh-TW": "人",
        en: "people",
    },
    femalePeople: {
        "zh-TW": "女性(人)",
        en: "Female (people)",
    },
    malePeople: {
        "zh-TW": "男性(人)",
        en: "Male (people)",
    },
    male: {
        "zh-TW": "男性",
        en: "Male",
    },
    female: {
        "zh-TW": "女性",
        en: "Female",
    },
    search: {
        "zh-TW": "搜尋",
        en: "Search",
    },
    clear: {
        "zh-TW": "清除",
        en: "Clear",
    },
    interviewNoData: {
        "zh-TW": "尚無任何訪談資料",
        en: "No interview data available.",
    },
    downloadNeedLogin: {
        "zh-TW": "請登入帳號以取得下載觀測資料權限",
        en: "Please sign in to download observation data.",
    },
    downloadInvalidItem: {
        "zh-TW": "觀測項目不存在，無法下載",
        en: "Observation item not found. Download unavailable.",
    },
    rowCount: {
        "zh-TW": "資料筆數",
        en: "Total records",
    },
    perPage: {
        "zh-TW": "一頁",
        en: "Per page",
    },
    selectRowCount: {
        "zh-TW": "請選擇筆數",
        en: "Select rows",
    },
    rowUnit: {
        "zh-TW": "筆",
        en: "rows",
    },
    downloadObservationData: {
        "zh-TW": "觀測資料下載",
        en: "Data Download",
    },
    downloadCatalog: {
        "zh-TW": "名錄下載",
        en: "Species Checklist Download",
    },
    observationLoading: {
        "zh-TW": "觀測資料載入中",
        en: "Loading observation data...",
    },
    observationError: {
        "zh-TW": "觀測資料載入發生錯誤",
        en: "Failed to load observation data.",
    },
    observationNoData: {
        "zh-TW": "目前沒有資料",
        en: "No data available.",
    },
    paginationPrev: {
        "zh-TW": "上一頁",
        en: "Previous",
    },
    paginationNext: {
        "zh-TW": "下一頁",
        en: "Next",
    },
    chartNeedLocation: {
        "zh-TW": "請選擇樣站",
        en: "Please select a site.",
    },
    chartNoItem: {
        "zh-TW": "沒有該觀測項目",
        en: "Observation item not found.",
    },
    chartLoading: {
        "zh-TW": "圖表資料載入中",
        en: "Loading chart data...",
    },
    chartError: {
        "zh-TW": "獲取圖表資料發生錯誤",
        en: "Failed to fetch chart data",
    },
    chartNoData: {
        "zh-TW": "沒有可用資料",
        en: "No chart data available.",
    },
    none: {
        "zh-TW": "無",
        en: "None",
    },
    cameraTrapSpeciesCount: {
        "zh-TW": "自動相機物種數",
        en: "Camera Trap Species Count",
    },
    birdSoundSpeciesCount: {
        "zh-TW": "鳥音辨識物種數",
        en: "Bird Sound Species Count",
    },
    plantPhenologySpeciesCount: {
        "zh-TW": "植物物候物種數",
        en: "Plant Phenology Species Count",
    },
    speciesCount: {
        "zh-TW": "物種數",
        en: "Species Count",
    },
    acousticAci: {
        "zh-TW": "日平均聲音複雜度（ACI）",
        en: "Daily Mean Acoustic Complexity Index (ACI)",
    },
    acousticAdi: {
        "zh-TW": "日平均聲音多樣性指數（ADI）",
        en: "Daily Mean Acoustic Diversity Index (ADI)",
    },
    acousticBi: {
        "zh-TW": "日平均聲音指數（BI）",
        en: "Daily Mean Bioacoustic Index (BI)",
    },
    acousticNdsi: {
        "zh-TW": "日平均標準化聲景指數（NDSI）",
        en: "Daily Mean Normalized Difference Soundscape Index (NDSI)",
    },
    weatherTemp: {
        "zh-TW": "氣溫（°C）",
        en: "Temperature (°C)",
    },
    weatherPrecip: {
        "zh-TW": "降水量（mm）",
        en: "Precipitation (mm)",
    },
    tooltipSpeciesCount: {
        "zh-TW": "物種數",
        en: "Species Count",
    },
};

const OBSERVATION_ASIDE_MAP: Record<string, Record<Lang, string>> = {
    "animal-resource": {
        "zh-TW": "動物資源",
        en: "Animal Resources",
    },
    cameratrap: {
        "zh-TW": "自動相機動物監測",
        en: "Camera Trap Monitoring",
    },
    "plant-resource": {
        "zh-TW": "植物資源",
        en: "Plant Resources",
    },
    plantphenology: {
        "zh-TW": "植物物候",
        en: "Plant Phenology",
    },
    bioacoustic: {
        "zh-TW": "聲景調查",
        en: "Bioacoustic Survey",
    },
    terresoundindex: {
        "zh-TW": "聲音指數",
        en: "Sound Index",
    },
    birdnetsound: {
        "zh-TW": "鳥音辨識",
        en: "Bird Sound Identification",
    },
    biosound: {
        "zh-TW": "生物辨識",
        en: "Wildlife Identification",
    },
    environment: {
        "zh-TW": "環境觀測",
        en: "Environmental Observation",
    },
    weather: {
        "zh-TW": "氣象觀測",
        en: "Weather Observation",
    },
    "ecological-culture": {
        "zh-TW": "外部資料介接",
        en: "External Data Integration",
    },
    population: {
        "zh-TW": "人口結構",
        en: "Population Structure",
    },
    industry: {
        "zh-TW": "產業結構",
        en: "Industry Structure",
    },
};

const CATALOG_DESCRIPTION_MAP: Record<string, Record<Lang, string>> = {
    cameratrap: {
        "zh-TW":
            "以紅外線自動相機為主要監測工具，了解在狩獵自主管理的政策推動下，陸域哺乳動的豐度是否產生改變。",
        en: "Infrared camera traps are used as the primary monitoring tool to assess whether the abundance of terrestrial mammals has changed under the implementation of hunting self-governance policies.",
    },
    plantphenology: {
        "zh-TW":
            "選定與狩獵行為有關的植物種類進行每半月一次的物候調查。",
        en: "Plant species associated with hunting activities are selected for phenological surveys conducted half-monthly.",
    },
    terresoundindex: {
        "zh-TW":
            "陸域聲景的部分將設置超音波及可聽音錄音機，進行監測。並利用人工智慧模型協助辨識物種叫聲，記錄陸域生物的種類。",
        en: "Ultrasonic and audible acoustic recorders are deployed to monitor terrestrial soundscapes. Artificial intelligence models are used to assist in identifying species-specific calls, enabling the documentation of terrestrial biodiversity.",
    },
    birdnetsound: {
        "zh-TW":
            "陸域聲景的部分將設置超音波及可聽音錄音機，進行監測。並利用人工智慧模型協助辨識物種叫聲，記錄陸域生物的種類。",
        en: "Ultrasonic and audible acoustic recorders are deployed to monitor terrestrial soundscapes. Artificial intelligence models are used to assist in identifying species-specific calls, enabling the documentation of terrestrial biodiversity.",
    },
    biosound: {
        "zh-TW":
            "陸域聲景的部分將設置超音波及可聽音錄音機，進行監測。並利用人工智慧模型協助辨識物種叫聲，記錄陸域生物的種類。",
        en: "Ultrasonic and audible acoustic recorders are deployed to monitor terrestrial soundscapes. Artificial intelligence models are used to assist in identifying species-specific calls, enabling the documentation of terrestrial biodiversity.",
    },
    weather: {
        "zh-TW": "",
        en: "",
    },
    "ecological-economics": {
        "zh-TW":
            "本計畫針對鄒族傳統領域之社會生態系統價值，透過關鍵參與者與利害相關人之深度訪談與問卷訪談，期能進行傳統領域生態經濟效益分析。",
        en: "This project focuses on the socio-ecological system values of the Tsou traditional territory, and aims to analyze ecological-economic benefits through in-depth interviews and questionnaire surveys with key actors and stakeholders.",
    },
};

const OBSERVATION_LABEL_TO_ASIDE_KEY_MAP: Record<string, string> = {
    自動照相機監測: "cameratrap",
    聲音指數: "terresoundindex",
    鳥音辨識: "birdnetsound",
    植物物候: "plantphenology",
    氣象觀測: "weather",
};

type PopulationThemeLabel = {
    title: Record<Lang, string>;
    subtitle: Record<Lang, string>;
};

const POPULATION_THEME_MAP: Record<string, PopulationThemeLabel> = {
    P_CNT: {
        title: {
            "zh-TW": "人口數小計",
            en: "Population Total",
        },
        subtitle: {
            "zh-TW": "",
            en: "",
        },
    },
    M_F_RAT: {
        title: {
            "zh-TW": "性比例",
            en: "Sex Ratio",
        },
        subtitle: {
            "zh-TW":
                "男性人口相對於女性人口的比例，\n即每有100名女性人口就有多少的男性人口數。",
            en: "The ratio of male population to female population,\nmeaning how many males there are for every 100 females.",
        },
    },
    DEPENDENCY_RAT: {
        title: {
            "zh-TW": "扶養比",
            en: "Dependency Ratio",
        },
        subtitle: {
            "zh-TW":
                "每100個工作年齡人口（15-64歲人口）\n所需扶養的依賴人口數（0-14歲以及65歲以上人口）。",
            en: "The number of dependent people (ages 0-14 and 65+) supported by every 100 working-age people (ages 15-64).",
        },
    },
    A65_A0A14_RAT: {
        title: {
            "zh-TW": "老化指數",
            en: "Aging Index",
        },
        subtitle: {
            "zh-TW":
                "老年人口（65歲以上人口）對幼年人口（0-14歲人口）之比，\n即每有100名幼年人口就有多少老年人口數。",
            en: "The ratio of elderly population (65+) to young population (0-14),\nmeaning how many elderly people there are for every 100 young people.",
        },
    },
    NATURE_INC_CNT: {
        title: {
            "zh-TW": "自然增加人數",
            en: "Natural Increase",
        },
        subtitle: {
            "zh-TW":
                "因出生、死亡而造成的人口增減數，\n即出生人數與死亡人數之差。",
            en: "Population increase/decrease caused by births and deaths,\ncalculated as births minus deaths.",
        },
    },
    SOCIAL_INC_CNT: {
        title: {
            "zh-TW": "社會增加人數",
            en: "Social Increase",
        },
        subtitle: {
            "zh-TW":
                "因戶籍遷入、遷出而造成的人口增減數，\n即戶籍遷入數與遷出數之差。",
            en: "Population increase/decrease caused by migration,\ncalculated as registered in-migrants minus out-migrants.",
        },
    },
};

type IndustryThemeLabel = {
    title: Record<Lang, string>;
    subtitle: Record<Lang, string>;
};

const INDUSTRY_THEME_MAP: Record<string, IndustryThemeLabel> = {
    industry: {
        title: {
            "zh-TW": "行政區工商家數",
            en: "Business Establishments by Industry",
        },
        subtitle: {
            "zh-TW":
                "本圖表呈現嘉義縣「阿里山鄉」各產業別的工商家數變化情形，\n資料採用每年最新月份之統計數據，不包含嘉義縣其他行政區。",
            en: "This chart shows annual changes in the number of business establishments by industry in Alishan Township, Chiayi County.\nData uses the latest monthly statistics of each year and excludes other townships in Chiayi County.",
        },
    },
    livestock: {
        title: {
            "zh-TW": "現有牲畜數量統計",
            en: "Current Livestock Statistics",
        },
        subtitle: {
            "zh-TW":
                "本圖表呈現嘉義縣「阿里山鄉」現有牲畜（豬、乳牛、羊）頭數之年度變化，\n資料採用每年最新月份之統計數據，不包含嘉義縣其他行政區。",
            en: "This chart shows annual changes in the number of existing livestock (pigs, dairy cattle, and goats) in Alishan Township, Chiayi County.\nData uses the latest monthly statistics of each year and excludes other townships in Chiayi County.",
        },
    },
};

const OBSERVATION_CHART_LEGEND_MAP: Record<string, Record<Lang, string>> = {
    男: {
        "zh-TW": "男",
        en: "Male",
    },
    女: {
        "zh-TW": "女",
        en: "Female",
    },
    男性: {
        "zh-TW": "男性",
        en: "Male",
    },
    女性: {
        "zh-TW": "女性",
        en: "Female",
    },
    豬: {
        "zh-TW": "豬",
        en: "Pig",
    },
    乳牛: {
        "zh-TW": "乳牛",
        en: "Dairy Cattle",
    },
    羊: {
        "zh-TW": "羊",
        en: "Goat",
    },
    C_CNT: {
        "zh-TW": "工商業總家數",
        en: "Total Business Establishments",
    },
    C1_A_CNT: {
        "zh-TW": "農、林、漁、牧業",
        en: "Agriculture, Forestry, Fishing and Animal Husbandry",
    },
    C1_B_CNT: {
        "zh-TW": "礦業及土石採取業",
        en: "Mining and Quarrying",
    },
    C1_C_CNT: {
        "zh-TW": "製造業",
        en: "Manufacturing",
    },
    C1_D_CNT: {
        "zh-TW": "電力及燃氣供應業",
        en: "Electricity and Gas Supply",
    },
    C1_E_CNT: {
        "zh-TW": "用水供應及污染整治業",
        en: "Water Supply and Remediation Services",
    },
    C1_F_CNT: {
        "zh-TW": "營造業",
        en: "Construction",
    },
    C1_G_CNT: {
        "zh-TW": "批發及零售業",
        en: "Wholesale and Retail Trade",
    },
    C1_H_CNT: {
        "zh-TW": "運輸及倉儲業",
        en: "Transportation and Storage",
    },
    C1_I_CNT: {
        "zh-TW": "住宿及餐飲業",
        en: "Accommodation and Food Service Activities",
    },
    C1_J_CNT: {
        "zh-TW": "資訊及通訊傳播業",
        en: "Information and Communication",
    },
    C1_K_CNT: {
        "zh-TW": "金融及保險業",
        en: "Financial and Insurance Activities",
    },
    C1_L_CNT: {
        "zh-TW": "不動產業",
        en: "Real Estate Activities",
    },
    C1_M_CNT: {
        "zh-TW": "專業、科學及技術服務業",
        en: "Professional, Scientific and Technical Activities",
    },
    C1_N_CNT: {
        "zh-TW": "支援服務業",
        en: "Support Service Activities",
    },
    C1_O_CNT: {
        "zh-TW": "公共行政及國防；強制性社會安全",
        en: "Public Administration and Defence; Compulsory Social Security",
    },
    C1_P_CNT: {
        "zh-TW": "教育服務業",
        en: "Education Services",
    },
    C1_Q_CNT: {
        "zh-TW": "醫療保健及社會工作服務業",
        en: "Human Health and Social Work Activities",
    },
    C1_R_CNT: {
        "zh-TW": "藝術、娛樂及休閒服務業",
        en: "Arts, Entertainment and Recreation",
    },
    C1_S_CNT: {
        "zh-TW": "其他服務業",
        en: "Other Service Activities",
    },
    工商業總家數: {
        "zh-TW": "工商業總家數",
        en: "Total Business Establishments",
    },
    "農、林、漁、牧業": {
        "zh-TW": "農、林、漁、牧業",
        en: "Agriculture, Forestry, Fishing and Animal Husbandry",
    },
    礦業及土石採取業: {
        "zh-TW": "礦業及土石採取業",
        en: "Mining and Quarrying",
    },
    製造業: {
        "zh-TW": "製造業",
        en: "Manufacturing",
    },
    電力及燃氣供應業: {
        "zh-TW": "電力及燃氣供應業",
        en: "Electricity and Gas Supply",
    },
    用水供應及污染整治業: {
        "zh-TW": "用水供應及污染整治業",
        en: "Water Supply and Remediation Services",
    },
    營造業: {
        "zh-TW": "營造業",
        en: "Construction",
    },
    批發及零售業: {
        "zh-TW": "批發及零售業",
        en: "Wholesale and Retail Trade",
    },
    運輸及倉儲業: {
        "zh-TW": "運輸及倉儲業",
        en: "Transportation and Storage",
    },
    住宿及餐飲業: {
        "zh-TW": "住宿及餐飲業",
        en: "Accommodation and Food Service Activities",
    },
    資訊及通訊傳播業: {
        "zh-TW": "資訊及通訊傳播業",
        en: "Information and Communication",
    },
    金融及保險業: {
        "zh-TW": "金融及保險業",
        en: "Financial and Insurance Activities",
    },
    不動產業: {
        "zh-TW": "不動產業",
        en: "Real Estate Activities",
    },
    "專業、科學及技術服務業": {
        "zh-TW": "專業、科學及技術服務業",
        en: "Professional, Scientific and Technical Activities",
    },
    支援服務業: {
        "zh-TW": "支援服務業",
        en: "Support Service Activities",
    },
    "公共行政及國防；強制性社會安全": {
        "zh-TW": "公共行政及國防；強制性社會安全",
        en: "Public Administration and Defence; Compulsory Social Security",
    },
    教育服務業: {
        "zh-TW": "教育服務業",
        en: "Education Services",
    },
    醫療保健及社會工作服務業: {
        "zh-TW": "醫療保健及社會工作服務業",
        en: "Human Health and Social Work Activities",
    },
    "藝術、娛樂及休閒服務業": {
        "zh-TW": "藝術、娛樂及休閒服務業",
        en: "Arts, Entertainment and Recreation",
    },
    其他服務業: {
        "zh-TW": "其他服務業",
        en: "Other Service Activities",
    },
    現有豬頭數: {
        "zh-TW": "現有豬頭數",
        en: "Current Number of Pigs",
    },
    現有乳牛頭數: {
        "zh-TW": "現有乳牛頭數",
        en: "Current Number of Dairy Cattle",
    },
    現有羊頭數: {
        "zh-TW": "現有羊頭數",
        en: "Current Number of Goats",
    },
};

function normalizeCatalogKey(link: string) {
    return link.split("/").filter(Boolean).pop() ?? "";
}

function humanizeKey(key: string) {
    return key
        .split(/[-_]+/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

export function getObservationText(lang: Lang, key: ObservationTextKey) {
    return OBSERVATION_TEXT_MAP[key][lang];
}

export function resolveObservationAsideTitle(
    key: string,
    label: string,
    lang: Lang,
) {
    if (lang === "zh-TW") return label;

    const mapped = OBSERVATION_ASIDE_MAP[key]?.[lang];
    if (mapped) return mapped;

    if (key) return humanizeKey(key);

    return label;
}

export function resolveObservationCatalogType(type: string, lang: Lang) {
    if (lang === "zh-TW") return type;

    const COMMON_TYPE_MAP: Record<string, string> = {
        生態觀測: getCommonText(lang, "ecologicalObservation"),
        環境觀測: getCommonText(lang, "environmentalObservation"),
        生態經濟: getCommonText(lang, "ecologicalEconomics"),
    };

    return COMMON_TYPE_MAP[type] ?? type;
}

export function resolveObservationCatalogName(
    link: string,
    name: string,
    lang: Lang,
) {
    if (lang === "zh-TW") return name;

    const key = normalizeCatalogKey(link);
    const mapped = OBSERVATION_ASIDE_MAP[key]?.[lang];
    if (mapped) return mapped;

    return key ? humanizeKey(key) : name;
}

export function resolveObservationCatalogDescription(
    link: string,
    description: string,
    lang: Lang,
) {
    if (lang === "zh-TW") return description;

    const key = normalizeCatalogKey(link);
    const mapped = CATALOG_DESCRIPTION_MAP[key]?.[lang];
    if (mapped !== undefined) return mapped;

    return description;
}

export function resolveObservationMapItemLabel(label: string, lang: Lang) {
    if (lang === "zh-TW") return label;
    const key = OBSERVATION_LABEL_TO_ASIDE_KEY_MAP[label];
    if (!key) return label;
    return OBSERVATION_ASIDE_MAP[key]?.[lang] ?? label;
}

export function resolvePopulationThemeTitle(
    key: string,
    fallbackTitle: string,
    lang: Lang,
) {
    return POPULATION_THEME_MAP[key]?.title[lang] ?? fallbackTitle;
}

export function resolvePopulationThemeSubtitle(
    key: string,
    fallbackSubtitle: string,
    lang: Lang,
) {
    return POPULATION_THEME_MAP[key]?.subtitle[lang] ?? fallbackSubtitle;
}

export function resolveIndustryThemeTitle(
    key: string,
    fallbackTitle: string,
    lang: Lang,
) {
    return INDUSTRY_THEME_MAP[key]?.title[lang] ?? fallbackTitle;
}

export function resolveIndustryThemeSubtitle(
    key: string,
    fallbackSubtitle: string,
    lang: Lang,
) {
    return INDUSTRY_THEME_MAP[key]?.subtitle[lang] ?? fallbackSubtitle;
}

export function resolveObservationChartLegend(label: string, lang: Lang) {
    if (lang === "zh-TW") return label;
    return OBSERVATION_CHART_LEGEND_MAP[label]?.[lang] ?? label;
}
