// types
import type { AsideItemType } from "../types/item";

export const ecologyAsideItemList = (): AsideItemType[] => [
    {
        id: 1,
        title: "動物資源",
        key: "animal-resource",
        list: [
            {
                id: 11,
                title: "自動相機動物監測",
                key: "cameratrap",
                link: "https://data.depositar.io/dataset/ltser-indigenous-alishan-cameratrap",
            },
        ],
    },
    {
        id: 2,
        title: "植物資源",
        key: "plant-resource",
        list: [
            {
                id: 21,
                title: "植物物候",
                key: "plantphenology",
                link: "https://data.depositar.io/dataset/ltser-indigenous-alishan-plantphenology",
            },
        ],
    },
    {
        id: 3,
        title: "聲景調查",
        key: "bioacoustic",
        list: [
            {
                id: 31,
                title: "聲音指數",
                key: "terresoundindex",
                link: "https://data.depositar.io/dataset/ltser-indigenous-terresoundindex",
            },
            {
                id: 32,
                title: "鳥音辨識",
                key: "birdnetsound",
                link: "https://data.depositar.io/dataset/ltser-indigenous-birdnetsound",
            },
            {
                id: 33,
                title: "生物辨識",
                key: "biosound",
                link: "https://data.depositar.io/dataset/ltser-indigenous-biosound",
            },
        ],
    },
];

export const environmentAsideItemList = (): AsideItemType[] => [
    {
        id: 1,
        title: "環境觀測",
        key: "environment",
        list: [
            {
                id: 11,
                title: "氣象觀測",
                key: "weather",
                link: "https://data.depositar.io/dataset/ltser-indigenous-weather",
            },
        ],
    },
];

export const ecologicalCultureAsideItemList = (): AsideItemType[] => [
    {
        id: 1,
        title: "外部資料介接",
        key: "ecological-culture",
        list: [
            {
                id: 11,
                title: "人口結構",
                key: "population",
                // link: "https://data.depositar.io/dataset/ltser-indigenous-weather",
            },
            {
                id: 12,
                title: "產業結構",
                key: "industry",
                // link: "https://data.depositar.io/dataset/ltser-indigenous-weather",
            },
        ],
    },
];
