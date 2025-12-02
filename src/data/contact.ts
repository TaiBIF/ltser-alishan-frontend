// types
import type { ContactItemType } from "../types/item";

// data
import contact1 from "../assets/contact-1.jpg";
import contact2 from "../assets/contact-2.jpg";
import contact3 from "../assets/contact-3.jpg";
import contact4 from "../assets/contact-4.jpg";
import contact5 from "../assets/contact-5.jpg";
import contact6 from "../assets/contact-6.jpg";
import contact7 from "../assets/contact-7.jpg";
import contact8 from "../assets/contact-8.jpg";

export const contactItemList = (): ContactItemType[] => [
    {
        id: 1,
        role: "計畫總主持人",
        university: "屏東科技大學",
        department: "野生動物保育研究所",
        position: "教授",
        name: "翁國精",
        mail: "gjw@mail.npust.edu.tw",
        img: contact1,
    },
    {
        id: 2,
        role: "計畫執行成員",
        university: "屏東科技大學",
        department: "森林系",
        position: "副教授",
        name: "賴宜鈴",
        mail: "ilai@mail.npust.edu.tw",
        img: contact2,
    },
    {
        id: 3,
        role: "計畫執行成員",
        university: "嘉義大學",
        department: "森林暨自然資源學系",
        position: "副教授",
        name: "趙偉村",
        mail: "wcchao@mail.ncyu.edu.tw",
        img: contact3,
    },
    {
        id: 4,
        role: "計畫執行成員",
        university: "清華大學",
        department: "環境與文化資源學系",
        position: "教授",
        name: "闕雅文",
        mail: "yawen.chueh@gapp.nthu.edu.tw",
        img: contact4,
    },
    {
        id: 5,
        role: "計畫執行成員",
        university: "臺北大學",
        department: "法律學系",
        position: "助理教授",
        name: "張惠東",
        mail: "donc@grnsh.org",
        img: contact5,
    },
    {
        id: 6,
        role: "計畫執行成員",
        university: "東華大學",
        department: "民族事務與發展學系",
        position: "副教授",
        name: "陳毅峰",
        mail: "yfchen@gms.ndhu.edu.tw",
        img: contact6,
    },
    {
        id: 7,
        role: "計畫執行成員",
        university: "宜蘭大學",
        department: "森林暨自然資源學系",
        position: "助理教授",
        name: "林奐宇",
        mail: "huanyu@niu.edu.tw",
        img: contact7,
    },
    {
        id: 8,
        role: "計畫執行成員",
        university: "臺灣大學",
        department: "森林暨自然資源學系",
        position: "副教授",
        name: "林政道",
        mail: "chengtaolin@ntu.edu.tw",
        img: contact8,
    },
];
