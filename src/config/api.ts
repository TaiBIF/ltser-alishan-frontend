import { ENV } from "./env";

const API_BASE = ENV.apiBaseUrl;

export const API = {
    // 認證
    auth: {
        register: `${API_BASE}/account/register/`,
        passReset: `${API_BASE}/account/password-reset/`,
        passResetConfirm: `${API_BASE}/account/password-reset/confirm/`,
        login: `${API_BASE}/account/auth/token/`,
        googleLogin: `${API_BASE}/account/auth/google-login/`,
        refresh: `${API_BASE}/account/auth/token/refresh/`,
        userMe: `${API_BASE}/account/auth/user/me/`,
    },

    // 關於
    introduction: {
        all: `${API_BASE}/dashboard/introduction/`,
    },

    // 相關文獻
    literature: {
        data: (query?: string) =>
            query
                ? `${API_BASE}/dashboard/literature/?${query}`
                : `${API_BASE}/dashboard/literature/`,
        page: (page: string | number) =>
            `${API_BASE}/dashboard/literature/?page=${page}`,
        category: `${API_BASE}/dashboard/literature-types/`,
    },

    // 鄒族記事
    cou: {
        data: (query?: string) =>
            query
                ? `${API_BASE}/dashboard/couevent/?${query}`
                : `${API_BASE}/dashboard/couevent/`,
        page: (page: string | number) =>
            `${API_BASE}/dashboard/couevent/?page=${page}`,
        category: `${API_BASE}/dashboard/couevent-types/`,
    },

    // 最新消息
    news: {
        home: (activeCategory?: string | undefined | null) =>
            activeCategory && activeCategory !== "all"
                ? `${API_BASE}/dashboard/news/?page_size=4&types=${activeCategory}`
                : `${API_BASE}/dashboard/news/?page_size=4`,
        data: (query?: string) =>
            query
                ? `${API_BASE}/dashboard/news/?${query}`
                : `${API_BASE}/dashboard/news/`,
        page: (page: string | number) =>
            `${API_BASE}/dashboard/news/?page=${page}`,
        detail: (id: string | number) => `${API_BASE}/dashboard/news/${id}/`,
        category: `${API_BASE}/dashboard/news-types/`,
    },

    // 常見問題
    faq: {
        data: `${API_BASE}/dashboard/faq/`,
        category: `${API_BASE}/dashboard/faq-types/`,
    },

    // 觀測資料
    data: {
        location: (item: string) =>
            `${API_BASE}/api/location/?observation_item=${item}`,
        field: (model: string) => `${API_BASE}/api/data-field/?model=${model}`,
        base: (model: string) => `${API_BASE}/api/${model}/`,
        chart: (item: string, locationID: string) =>
            `${API_BASE}/api/${item}/chart/?locationID=${locationID}`,
        download: `${API_BASE}/api/download/`,
    },

    // 首頁地圖
    map: {
        position: `${API_BASE}/api/map/location/`,
        filter: `${API_BASE}/api/map/filter/`,
    },

    // 首頁地圖視覺化
    cameratrap: {
        chart: `${API_BASE}/api/cameratrap/chart/`,
    },
    terresoundindex: {
        chart: `${API_BASE}/api/terresoundindex/chart/`,
    },
    birdnetsound: {
        chart: `${API_BASE}/api/birdnetsound/chart/`,
    },
    plantphenology: {
        chart: `${API_BASE}/api/plantphenology/chart/`,
    },
    weather: {
        chart: `${API_BASE}/api/weather/chart/`,
    },

    // 社會經濟資料
    village: {
        population: `${API_BASE}/api/segis/village-population/`,
        dynamics: `${API_BASE}/api/segis/village-dynamics/`,
    },
    town: {
        pyramid: `${API_BASE}/api/segis/town-pyramid/`,
        industry: `${API_BASE}/api/segis/town-industry/`,
    },
} as const;

export type ItemKey = keyof typeof API;
