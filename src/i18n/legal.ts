import type { Lang } from "../context/LangContext";

type LegalSection = {
    heading: string;
    paragraphs: string[];
};

type LegalDoc = {
    siteName: string;
    docTitle: string;
    updatedAt: string;
    intro: string[];
    sections: LegalSection[];
};

const PRIVACY_POLICY_DOC: Record<Lang, LegalDoc> = {
    "zh-TW": {
        siteName: "長期社會生態核心觀測 阿里山站",
        docTitle: "隱私政策",
        updatedAt: "更新日期：2025年12月11日",
        intro: [
            "長期社會生態核心觀測阿里山站，為國科會長期社會生態核心觀測平台站點之一。本站為該觀測平台之資料平台系統，建置目的為協助平台相關資料的管理與開放。本站所提供的各項功能，以下統稱為「本服務」，本服務所提供的相關資料，預設皆由其資料當事人自行公開或依法公開，相關個人資料之尊重與隱私地位之保護，依本政策處理。使用者繼續使用本服務之作為，包括瀏覽各相關公開資訊，視為明示同意下述之隱私政策，包括使用行為之要求與技術規範之遵守，以及本隱私政策之更新適用。",
            "本隱私政策說明本服務如何蒐集、處理、利用使用者的個人資料。使用者使用本服務時，可自由選擇是否提供其個人資料，但本服務的部份功能（如資料上傳）會需要使用者提供特定個人資料，如不提供該等個人資料，將無法使用這些功能。",
            "本服務的伺服器皆位於中華民國（Taiwan）境內，受中華民國《個人資料保護法》所規範。使用者如為個人資料當事人，享有《個人資料保護法》所賦予就其個人資料得進行查詢、更正、請求停止處理利用，以及刪除上的相關保障與地位。個人資料當事人可透過下方聯絡方式與我們聯繫，行使相關權利。",
        ],
        sections: [
            {
                heading: "資料蒐集",
                paragraphs: [
                    "1. 使用者註冊時，本服務會要求使用者提供基本的個人識別資料，包含真實姓名、電子郵件信箱、以及所選定的使用者帳號等。使用者在編輯資料集、資料、專案（的後設資料）時，也可能提交關於其識別資料與背景資訊。本服務會蒐集使用者的使用紀錄（包含但不限於 IP 位址、取用時間、取用網址、HTTP 參照網址、所使用作業系統與瀏覽器名稱與版本等）。在使用者登入帳號後，相關使用紀錄會與使用者的帳號資料連結。",
                    "2. 於本服務就個別資料或物種名錄進行下載時，本服務將透過登錄機制，要求使用者填註電郵、身份，以及資料取用的原因和簡要說明。於登錄會員狀態下，部分識別資訊當自動從使用者帳號摘取，該等登錄機制將僅用於本服務內部登錄，及於本服務經費維運之申請時提供查核。除前揭狀況，於未合理妥適進行去識別化或數據量化處理前，將不用於任何其他目的。",
                ],
            },
            {
                heading: "動態追蹤",
                paragraphs: [
                    "3. 本服務使用註冊者的使用者帳號，以提供資料集和專案的建立、上傳、修改、追蹤等功能。使用者帳號以及使用這些功能的時間，會出現在這些資料集和專案的動態牆，可能被公開瀏覽或關注。",
                    "4. 為了提昇服務品質，本服務使用新版 Google 分析（GA4）與 Google 代碼管理工具（GTM）進行流量分析及程式管理。新版 Google 分析並不直接從使用者的終端設備進行 Cookies 資訊的收集，僅透過浮動式的使用者代號，紀錄該代號於本網站上之使用行為。此等數據資訊之收集，僅供管理端分析流量及觀測網站服務之用。本平台亦不透過使用行為的紀錄，識別個別訪客的個人身分或紀錄使用者的真實 IP 位址。若使用者希望確保相關使用資訊不被收集，亦得於瀏覽器調校安全層級，或自設資訊屏蔽機制（Do Not Track）。",
                    "5. 本服務於重要資訊通知時，會透過使用者註冊時所使用的電子郵件信箱聯繫註冊會員。",
                ],
            },
            {
                heading: "第三方使用",
                paragraphs: [
                    "6. 使用者註冊時所使用的真實姓名、使用者帳號，以及由建立維護的資料集和專案的後設資料（可能含有個人資料，如電子郵件信箱），皆預設為公開，可由第三方公開瀏覽或關注。",
                    "7. 使用者已自行公開與依法公開的個人資料，其後續再被蒐集、處理，以及利用，依法原則上毋須再另行告知當事人個人資料的各款利用事項。",
                    "8. 本服務或必須應法律要求，提供使用者的（個人）資料予執法機關。",
                    "9. 本服務不會在未經使用者同意或欠缺法定要件的情況下，揭露使用者未公開的個人資料予任何第三方。",
                ],
            },
            {
                heading: "資料保存",
                paragraphs: [
                    "10. 本服務將配合資訊系統防護機制，保存使用者提交的個人資料以及與使用者帳號相關的活動紀錄。相關活動紀錄於合理期間後，將配合系統資源優化，進行手動或自動整理或刪除。",
                    "11. 為確保服務的正常運作，使用者無法自行刪除帳號，然可透過本服務之聯絡方式，提出刪除會員帳號的要求。於帳號刪除之後，相關已上傳的資料與過往的活動紀錄若已公開披露，將採帳號編號或其他代號方式去識別化呈現。該等處置僅限於本服務管理範圍，相關已公開資料若已被其他使用者轉出，即非本服務得協助追索處理之標的。",
                ],
            },
            {
                heading: "其他事項",
                paragraphs: [
                    "12. 除了帳號資料與使用紀錄，本服務不會追蹤、蒐集或儲存使用者的其他個人資料。於資料上傳者、轉存者同時為個人資料當事人時，其同意本服務得就其上傳資料，於必要時得進行合理妥適之去識別化或相關數據量化的處理。處理後的資料、資訊與當事人個人識別狀態無法產生連結者，便不再屬於個人資料，後續將得以不受原始提供目的之限制，被合法利用。",
                    "13. 本服務若已察覺使用者個人資料被不當使用或外洩，將會儘快透過註冊電郵通知使用者。",
                ],
            },
            {
                heading: "政策修正",
                paragraphs: [
                    "14. 本服務不定期修正隱私政策以配合相關法令，修正後的最新版本將公告於本平台，不另行通知。使用者應定期檢視最新版本的隱私政策。如在政策修正後，使用者仍持續使用本服務，視作使用者同意修正後的隱私政策，此一同意，並同步回溯至使用者過往利用本服務的相關行為。",
                ],
            },
            {
                heading: "聯絡方式",
                paragraphs: [
                    "15. 若您對於本政策有任何問題，請用電子郵件信箱 ltsertwalishan@gmail.com 與我們聯絡。本服務之維運團隊將於確認收受提交意見，並完成人別確認後，三十日內進行妥善回應。",
                ],
            },
        ],
    },
    en: {
        siteName: "LTSER Alishan Site",
        docTitle: "Privacy Policy",
        updatedAt: "Last Updated: December 11, 2025",
        intro: [
            "The LTSER Alishan Site is one of the stations under the National Science and Technology Council's Long-Term Social-Ecological Research platform. This website serves as the platform's data service system, established to support data management and open access. All functions provided on this website are collectively referred to as the \"Service.\" Data provided by the Service is, by default, either disclosed by the data subject or disclosed according to law. Respect for personal data and protection of privacy are handled under this policy.",
            "This Privacy Policy explains how we collect, process, and use personal data. You may choose whether to provide personal data when using the Service. However, some features (for example, data upload) require specific personal data. If you do not provide such data, those features may not be available.",
            "All Service servers are located in Taiwan and are governed by Taiwan's Personal Data Protection Act. Data subjects have rights under applicable law, including rights to access, correct, request suspension of processing and use, and request deletion of personal data. You may contact us using the contact method below to exercise these rights.",
        ],
        sections: [
            {
                heading: "Data Collection",
                paragraphs: [
                    "1. During registration, we may request basic personal identifiers, including real name, email address, and selected account name. When editing datasets, data files, and project metadata, users may also submit identification and background information. We also collect usage logs, including but not limited to IP address, access time, requested URL, HTTP referrer, operating system, browser name, and browser version. After login, such logs may be linked to your account information.",
                    "2. When downloading specific datasets or species checklists, the Service uses a registration mechanism requiring users to provide email, identity category, reason for data use, and a brief description. For logged-in members, some identifying information may be automatically filled from account records. These records are used only for internal registration and auditing required for service operation funding applications. Unless data has been reasonably de-identified or statistically aggregated, it will not be used for other purposes.",
                ],
            },
            {
                heading: "Activity Tracking",
                paragraphs: [
                    "3. The Service uses registered user accounts to provide functions such as creating, uploading, editing, and tracking datasets and projects. Account names and activity timestamps may appear on activity walls for those datasets and projects and may be publicly viewable or followable.",
                    "4. To improve service quality, the Service uses Google Analytics 4 (GA4) and Google Tag Manager (GTM) for traffic analysis and tag management. GA4 does not directly collect cookie information from end-user devices on this website; instead, it records interactions through pseudonymous identifiers. Such data is used only for traffic analytics and service monitoring. We do not identify individual visitors or record users' real IP addresses through behavior logs. If users prefer not to have such information collected, they may adjust browser privacy/security settings or enable a Do Not Track mechanism.",
                    "5. Important service notices may be sent to the email address provided at registration.",
                ],
            },
            {
                heading: "Third-Party Access and Use",
                paragraphs: [
                    "6. Real names used at registration, account names, and metadata of datasets/projects maintained by users (which may include personal data, such as email addresses) are public by default and may be publicly viewed or followed by third parties.",
                    "7. For personal data already publicly disclosed by the user or disclosed according to law, subsequent collection, processing, and use generally do not require separate notice under applicable law.",
                    "8. The Service may provide user (personal) data to law enforcement when legally required.",
                    "9. The Service will not disclose non-public personal data to third parties without user consent or a valid legal basis.",
                ],
            },
            {
                heading: "Data Retention",
                paragraphs: [
                    "10. The Service retains user-submitted personal data and account-related activity logs according to information security and system protection requirements. After a reasonable retention period, records may be manually or automatically organized or deleted for system optimization.",
                    "11. To ensure normal service operation, users cannot self-delete accounts directly, but may request account deletion through Service contact channels. After account deletion, previously uploaded public data and activity records may be displayed in de-identified form (for example, account number or another identifier). Such handling applies only within this Service. Public data already exported by other users is outside the Service's scope of recovery.",
                ],
            },
            {
                heading: "Other Matters",
                paragraphs: [
                    "12. Other than account information and usage logs, the Service does not track, collect, or store additional personal data. If uploaders/transferors are also the data subjects, they agree that the Service may, when necessary, perform reasonable de-identification or statistical aggregation on uploaded data. Data that can no longer be linked to an identifiable individual will no longer be treated as personal data and may be used lawfully without being limited by the original purpose.",
                    "13. If the Service becomes aware of improper use or leakage of personal data, we will notify affected users by registered email as soon as possible.",
                ],
            },
            {
                heading: "Policy Updates",
                paragraphs: [
                    "14. The Service may revise this Privacy Policy from time to time to comply with laws and regulations. The latest version will be published on this platform without separate individual notice. Users should review the latest version regularly. Continued use of the Service after revisions constitutes acceptance of the revised Privacy Policy and applies to relevant past use behaviors.",
                ],
            },
            {
                heading: "Contact",
                paragraphs: [
                    "15. If you have any questions about this policy, please contact us at ltsertwalishan@gmail.com. After confirming receipt and identity verification, the operations team will provide an appropriate response within 30 days.",
                ],
            },
        ],
    },
};

const TERMS_OF_USE_DOC: Record<Lang, LegalDoc> = {
    "zh-TW": {
        siteName: "長期社會生態核心觀測 阿里山站",
        docTitle: "使用者條款",
        updatedAt: "更新日期：2025年12月11日",
        intro: [
            "長期社會生態核心觀測阿里山站，為國科會長期社會生態核心觀測平台站點之一。本站為該觀測平台之資料平台系統，建置目的為協助平台相關資料的管理與開放。本站所提供的各項功能，以下統稱為「本服務」。使用者須同意本「使用條款」，方得使用本服務。使用者繼續使用本服務之作為，包括瀏覽各相關公開資訊，視為明示同意下述之使用條款，包括使用行為之要求與技術規範之遵守，以及本使用條款之更新適用。",
            "本使用條款所稱之「本服務的資料」，係指經由本服務所提供之資料，包括但不限於由上傳者所直接寄存，或上傳者由其他第三方平台合法轉存的資料、資料集、後設資料，及經編輯整理產出之物種名錄。本使用條款所稱之後設資料，係指針對個別資料集、資料檔案、資源連結、專案等的各類描述資訊。",
        ],
        sections: [
            {
                heading: "使用規範",
                paragraphs: [
                    "1. 本服務開放予大眾使用。然使用者若規劃採自動化或半自動化方式，擷取本服務所提供之相關資料，應登錄會員並詢求 API 介接等，採不影響平台服務負載之互動模式處理。",
                    "2. 使用者所上傳的資料，於本站皆預設公開，包括獨立寄存或由第三方平台轉存之資料。上傳者須確認有權利上傳並儲存該資料在本服務。使用者所寄存、轉存的資料均適合廣為散布，並合乎個人資料保護、資通安全及智慧財產權等法規要求。本服務平台僅就被寄存、轉存的資料，負服務維持與技術管理調校之責。",
                    "3. 使用本服務的資料時，應遵守法律並避免妨害他人合法權利。使用者不得惡意變更其相關資訊；若編輯、改作後所展示之資訊與原出處不符而造成損害，使用者須自負民事、刑事上之法律責任。",
                    "4. 各項使用行為不可損害本服務。使用者若以應用程式介面（APIs）或機器人程式（robots）使用本服務，相關使用皆須在常識範圍內為之，不得對平台及其他使用者的服務產生實質妨礙或效率影響。本服務會視伺服器負載狀況，決定是否撤銷或限制個別使用者之使用權限。",
                    "5. 本服務得就下列情形逕行處理，且不對該處理之結果負責：a) 刪除或隱藏不適當或未受充分保護之資料；b) 撤銷或限制妨礙本服務運作、違反本使用條款、或違反法律之使用者帳號。",
                ],
            },
            {
                heading: "資料使用",
                paragraphs: [
                    "6. 寄存於本服務的資料，其使用應依照上傳者或原始出處所指示之授權條款。使用者下載自本服務的資料，應尊重原出處之顯名標示要求，並理解上傳者或原始資料產製者所擁有之合法智慧財產權利，並不必然被拋棄或完整轉移予使用者。",
                    "7. 於本服務就個別資料或物種名錄進行下載，或就調查訪談資料進行索取時，本服務將透過登錄或個案索取機制，要求使用者填註電郵、身份，以及資料取用原因與簡要說明。未經本服務同意，不得將本服務資料之實質部分大量下載並另以網站或資料庫形式公開提供他人取用。",
                    "8. 本服務就上傳者、轉存者所託載資料，預設以原始出處權利人名義，採符合開放資料定義並要求姓名標示之 CC BY 4.0 進行發布。若原始出處另有其他更寬鬆且合法之平行授權聲明，使用者得自行選擇授權方案利用該資料。",
                ],
            },
            {
                heading: "資料引用",
                paragraphs: [
                    "9. 使用本服務資料時，建議除原始出處顯名資訊外，應同時標示來源「長期社會生態核心觀測阿里山站」，以符合多數公眾授權條款之出處引註要求。若有學術倫理及科研考據需求，建議將資料應用情況擇要列示並寄送至 ltsertwlyudao@gmail.com，以利本平台紀錄與推廣。",
                ],
            },
            {
                heading: "隱私政策",
                paragraphs: [
                    "10. 請詳見本服務之〈隱私權政策〉，以瞭解本服務如何蒐集並處理個人資料。",
                ],
            },
            {
                heading: "免責聲明",
                paragraphs: [
                    "11. 本服務均以現狀（as-is）提供，並不擔保其堪用性和服務品質，於法律容許範圍內主張最大免責。本服務不對資料（含後設資料）的正確、精準、完整與否負責；如資料含外部連結，本服務亦不對該連結安全性負責。",
                ],
            },
            {
                heading: "準據法與管轄法院",
                paragraphs: [
                    "12. 本使用條款之準據法為中華民國（Taiwan）法律，任何因本服務所引起之紛爭，將由台灣台北地方法院管轄。",
                ],
            },
            {
                heading: "條款修正",
                paragraphs: [
                    "13. 本服務得不定期修正使用條款，修正後版本將公告於本平台，不另行個別通知。使用者於修正後仍持續使用本服務，視為同意修正後條款。",
                ],
            },
            {
                heading: "聯絡方式",
                paragraphs: [
                    "14. 欲取得本使用條款範圍外之使用許可，請來信 ltsertwlyudao@gmail.com。若使用者認本服務託載資料侵害其合法權利，亦得透過前揭方式聯絡本服務維運團隊，並於提出權利主張文件後，依資訊儲存服務提供者民事免責程序協助處理。",
                ],
            },
        ],
    },
    en: {
        siteName: "LTSER Alishan Site",
        docTitle: "Terms of Use",
        updatedAt: "Last Updated: December 11, 2025",
        intro: [
            "The LTSER Alishan Site is one of the stations under the National Science and Technology Council's Long-Term Social-Ecological Research platform. This website serves as the platform's data service system, established to support data management and open access. All functions provided by this website are collectively referred to as the \"Service.\" Users must agree to these Terms of Use before using the Service. Continued use of the Service, including browsing public information, constitutes express consent to these Terms and their future updates.",
            "For the purpose of these Terms, \"Service Data\" refers to data made available through the Service, including but not limited to datasets, metadata, and species checklists directly uploaded by users or lawfully transferred from third-party platforms.",
        ],
        sections: [
            {
                heading: "Use Rules",
                paragraphs: [
                    "1. The Service is open to the public. If users plan to collect data through automated or semi-automated means, they should register an account and request API-based integration, and must use methods that do not impose unreasonable platform load.",
                    "2. Data uploaded to this website is public by default, including direct uploads and transferred data from third-party platforms. Uploaders are responsible for confirming they have the rights to upload and store such data and that it complies with applicable personal data, cybersecurity, and intellectual property laws.",
                    "3. Users must use Service Data lawfully and avoid infringing the rights of others. Users must not maliciously alter related information. If edited or adapted information causes damage due to inconsistency with original sources, users are responsible for legal consequences.",
                    "4. Any use behavior must not harm the Service. API or robot-based access must stay within reasonable limits and must not materially interfere with service performance for other users. The Service may suspend or restrict accounts based on server load and operational needs.",
                    "5. The Service may take direct action, without liability for outcome, including: (a) removing or hiding inappropriate or insufficiently protected data; (b) suspending or restricting accounts that obstruct service operations, violate these Terms, or violate laws.",
                ],
            },
            {
                heading: "Data Use",
                paragraphs: [
                    "6. Use of data hosted on the Service must follow the license terms specified by uploaders or original sources. Users must respect attribution requirements and acknowledge that lawful intellectual property rights are not necessarily waived or fully transferred.",
                    "7. For downloading specific datasets/species checklists or requesting interview data, the Service may require registration information such as email, identity category, reason for use, and a brief explanation. Without Service consent, users may not extract substantial portions of Service Data and republish them as a separate website or database.",
                    "8. As a default publication model, hosted data is provided under an open-data approach aligned with CC BY 4.0 attribution requirements, unless original rightsholders provide an alternative, lawful, and more permissive parallel license.",
                ],
            },
            {
                heading: "Citation",
                paragraphs: [
                    "9. When using Service Data, users are encouraged to include the source \"LTSER Alishan Site\" in addition to attribution required by original sources. For research ethics and reproducibility, users are encouraged to share usage summaries by email to ltsertwlyudao@gmail.com.",
                ],
            },
            {
                heading: "Privacy Policy",
                paragraphs: [
                    "10. Please refer to the Privacy Policy to understand how the Service collects and processes personal data.",
                ],
            },
            {
                heading: "Disclaimer",
                paragraphs: [
                    "11. The Service is provided on an \"as-is\" basis without warranties of fitness or service quality, and disclaims liability to the maximum extent permitted by law. The Service does not guarantee the accuracy, precision, or completeness of data or metadata, and is not responsible for the security of external links contained in data.",
                ],
            },
            {
                heading: "Governing Law and Jurisdiction",
                paragraphs: [
                    "12. These Terms are governed by the laws of Taiwan. Any dispute arising from the Service shall be subject to the jurisdiction of the Taipei District Court, Taiwan.",
                ],
            },
            {
                heading: "Terms Updates",
                paragraphs: [
                    "13. The Service may revise these Terms from time to time. Updated versions will be published on this platform without individual notice. Continued use after updates constitutes acceptance of the revised Terms.",
                ],
            },
            {
                heading: "Contact",
                paragraphs: [
                    "14. To request permission beyond the scope of these Terms, contact us at ltsertwlyudao@gmail.com. If you believe hosted data infringes your lawful rights, you may also contact us through the same channel. After receiving supporting rights-claim documents, the operations team will assist in handling the issue under applicable civil safe-harbor procedures for storage service providers.",
                ],
            },
        ],
    },
};

export function getPrivacyPolicyDoc(lang: Lang) {
    return PRIVACY_POLICY_DOC[lang];
}

export function getTermsOfUseDoc(lang: Lang) {
    return TERMS_OF_USE_DOC[lang];
}
