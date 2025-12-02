// types
import type { EventItemType } from "../types/item";

// data
import event1 from "../assets/event1.jpg";
import event2 from "../assets/event2.jpg";
import event3_1 from "../assets/event3-1.jpg";
import event3_2 from "../assets/event3-2.jpg";
import event4_1 from "../assets/event4-1.jpg";
import event4_2 from "../assets/event4-2.jpg";
import event5_1 from "../assets/event5-1.jpg";
import event5_2 from "../assets/event5-2.jpg";
import event6 from "../assets/event6.jpg";
import event7 from "../assets/event7.jpg";
import event8 from "../assets/event8.jpg";
import event9 from "../assets/event9.jpg";
import event11 from "../assets/event11.jpg";
import event12 from "../assets/event12.jpg";
import event14 from "../assets/event14.jpg";
import event15_1 from "../assets/event15-1.jpg";
import event15_2 from "../assets/event15-2.jpg";
import event18_1 from "../assets/event18-1.jpg";
import event18_2 from "../assets/event18-2.jpg";
import event22 from "../assets/event22.jpg";
import event23 from "../assets/event23.jpg";
import event24_1 from "../assets/event24-1.jpg";
import event24_2 from "../assets/event24-2.jpg";
import event25_1 from "../assets/event25-1.jpg";
import event25_2 from "../assets/event25-2.jpg";

export const eventItemList = (): EventItemType[] => [
    {
        id: 1,
        date: "2024-02-22",
        location: "特富野部落",
        type_zh: "推廣介紹",
        content: "拜會陳吉華長老及高德生長老，說明計畫內容，獲得長老支持",
        img: [event1],
    },
    {
        id: 2,
        date: "2024-02-23",
        location: "特富野部落",
        type_zh: "活動參與",
        content: "參與特富野部落戰祭",
        img: [event2],
    },
    {
        id: 3,
        date: "2024-03-30",
        location: "特富野飛鼠咖啡及高德生長老家",
        type_zh: "推廣介紹",
        content:
            "向高德生長老、汪啟德頭目、汪義福頭目說明計畫內容，獲得長老與頭目支持",
        img: [event3_1, event3_2],
    },
    {
        id: 4,
        date: "2024-05-17",
        location: "特富野部落",
        type_zh: "推廣介紹",
        content: "向鄒族長老會說明本計畫，獲得長老會支持",
        img: [event4_1, event4_2],
    },
    {
        id: 5,
        date: "2024-06-13",
        location: "台北市",
        type_zh: "推廣介紹",
        content: "向林業及自然保育署說明本計畫，獲得署長林華慶支持",
        img: [event5_1, event5_2],
    },
    {
        id: 6,
        date: "2024-07-29",
        location: "嘉義市",
        type_zh: "推廣介紹",
        content:
            "向林業及自然保育署嘉義分署及鄒族獵人協會說明本計畫，獲得分署長張岱及浦珍珠理事長支持",
        img: [event6],
    },
    {
        id: 7,
        date: "2024-09-12",
        location: "台北市",
        type_zh: "推廣介紹",
        content: "向原住民族委員會說明本計畫，獲得經濟發展處安柏翰科長支持",
        img: [event7],
    },
    {
        id: 8,
        date: "2024-10-02",
        location: "南投水里",
        type_zh: "推廣介紹",
        content:
            "向玉山國家公園管理處盧淑妃處長說明本計畫，獲得處長支持並協助提供共管會會議紀錄",
        img: [event8],
    },
    {
        id: 9,
        date: "2024-05-20",
        location: "特富野部落",
        type_zh: "培力",
        content: "培力部落族人湯志卿自動相機現場操作，負責北四社範圍動物監測",
        img: [event9],
    },
    {
        id: 10,
        date: "2024-05-28",
        location: "特富野部落",
        type_zh: "會談諮詢",
        content: "訪問阿里山鄉達邦村特富野社區飛鼠咖啡負責人",
    },
    {
        id: 11,
        date: "2024-05-29",
        location: "山美部落",
        type_zh: "培力",
        content: "培力部落族人安志堅自動相機現場操作，負責南三社範圍動物監測",
        img: [event11],
    },
    {
        id: 12,
        date: "2024-06-01",
        location: "特富野部落",
        type_zh: "培力",
        content: "聘用部落族人楊趙睿君為本計畫兼任助理",
        img: [event12],
    },
    {
        id: 13,
        date: "2024-06-11",
        location: "特富野部落",
        type_zh: "活動參與",
        content: "參與全國獵人大會第四次籌備會議",
    },
    {
        id: 14,
        date: "2024-06-14",
        location: "特富野部落",
        type_zh: "會談諮詢",
        content: "訪問阿里山鄉達邦村特富野民宿負責人及特富野社區發展協會總幹事",
        img: [event14],
    },
    {
        id: 15,
        date: "2024-06-15",
        location: "山美部落",
        type_zh: "活動參與",
        content:
            "參觀阿里山鄉山美村達娜伊谷護漁行動、傳統食物、傳統家屋及傳統舞蹈",
        img: [event15_1, event15_2],
    },
    {
        id: 16,
        date: "2024-06-19",
        location: "山美部落",
        type_zh: "活動參與",
        content:
            "參觀阿里山鄉山美村達娜伊谷護漁行動、傳統食物、傳統家屋及傳統舞蹈",
    },
    {
        id: 17,
        date: "2024-07-01",
        location: "台北市",
        type_zh: "培力",
        content: "聘用部落族人陳敏芳為本計畫兼任助理",
    },
    {
        id: 18,
        date: "2024-07-24",
        location: "特富野部落",
        type_zh: "活動參與、會談諮詢",
        content:
            "訪談浦少光長老，並與浦少光、鄭金發長老共同巡視獵區及探勘植物物候調查樣線",
        img: [event18_1, event18_2],
    },
    {
        id: 19,
        date: "2024-08-07",
        location: "特富野部落",
        type_zh: "培力",
        content: "培力部落族人湯志卿自動相機現場操作，負責北四社範圍動物監測",
    },
    {
        id: 20,
        date: "2024-08-14",
        location: "山美部落",
        type_zh: "培力",
        content: "培力部落族人安志堅自動相機現場操作，負責南三社範圍動物監測",
    },
    {
        id: 21,
        date: "2024-08-04",
        location: "特富野部落",
        type_zh: "會談諮詢",
        content: "訪談特富野民宿負責人",
    },
    {
        id: 22,
        date: "2024-09-19",
        location: "特富野部落",
        type_zh: "活動參與",
        content: "參與全國獵人大會第五次籌備會議，討論教育訓練等議題",
        img: [event22],
    },
    {
        id: 23,
        date: "2024-10-11",
        location: "中央研究院",
        type_zh: "會談諮詢",
        content: "向黃樹民院士、劉紹華研究員請益LTSER事宜",
        img: [event23],
    },
    {
        id: 24,
        date: "2024-12-03",
        location: "特富野部落及山美部落",
        type_zh: "會談諮詢",
        content: "與高德生、陳吉華兩位長老及汪義福頭目說明計畫內容並聽取意見",
        img: [event24_1, event24_2],
    },
    {
        id: 25,
        date: "2024-12-05",
        location: "山美部落",
        type_zh: "活動參與",
        content:
            "協助鄒族獵人協會主辦之「113年度第七屆原住民族狩獵自主管理工作坊暨團結大會」",
        img: [event25_1, event25_2],
    },
];
