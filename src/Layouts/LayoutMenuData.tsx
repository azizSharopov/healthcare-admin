import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
    const history = useNavigate();
    //state data
    const [isDashboard, setIsDashboard] = useState<boolean>(false);
    const [isApps, setIsApps] = useState<boolean>(false);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [isPages, setIsPages] = useState<boolean>(false);
    const [isBaseUi, setIsBaseUi] = useState<boolean>(false);
    const [isAdvanceUi, setIsAdvanceUi] = useState<boolean>(false);
    const [isForms, setIsForms] = useState<boolean>(false);
    const [isTables, setIsTables] = useState<boolean>(false);
    const [isCharts, setIsCharts] = useState<boolean>(false);
    const [isIcons, setIsIcons] = useState<boolean>(false);
    const [isMaps, setIsMaps] = useState<boolean>(false);
    const [isMultiLevel, setIsMultiLevel] = useState<boolean>(false);

    // Apps
    const [isCalendar, setCalendar] = useState<boolean>(false);
   
    const [isEcommerce, setIsEcommerce] = useState<boolean>(false);
    const [isProjects, setIsProjects] = useState<boolean>(false);
    const [isTasks, setIsTasks] = useState<boolean>(false);
    const [isCRM, setIsCRM] = useState<boolean>(false);
    const [isCrypto, setIsCrypto] = useState<boolean>(false);
    const [isInvoices, setIsInvoices] = useState<boolean>(false);
    const [isSupportTickets, setIsSupportTickets] = useState<boolean>(false);
    const [isNFTMarketplace, setIsNFTMarketplace] = useState<boolean>(false);
 
    const [isMembership, setIsMembership] = useState<boolean>(false);


    // Authentication
    const [isSignIn, setIsSignIn] = useState<boolean>(false);
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [isPasswordReset, setIsPasswordReset] = useState<boolean>(false);
    const [isPasswordCreate, setIsPasswordCreate] = useState<boolean>(false);
    const [isLockScreen, setIsLockScreen] = useState<boolean>(false);
    const [isLogout, setIsLogout] = useState<boolean>(false);
    const [isSuccessMessage, setIsSuccessMessage] = useState<boolean>(false);
    const [isVerification, setIsVerification] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    // Pages
    const [isProfile, setIsProfile] = useState<boolean>(false);
    const [isLanding, setIsLanding] = useState<boolean>(false);


    // Charts
    const [isApex, setIsApex] = useState<boolean>(false);

    // Multi Level
    const [isLevel1, setIsLevel1] = useState<boolean>(false);
    const [isLevel2, setIsLevel2] = useState<boolean>(false);

    const [iscurrentState, setIscurrentState] = useState('Dashboard');

    function updateIconSidebar(e : any) {
        if (e && e.target && e.target.getAttribute("sub-items")) {
            const ul : any = document.getElementById("two-column-menu");
            const iconItems : any = ul.querySelectorAll(".nav-icon.active") ;
            let activeIconItems = [...iconItems];
            activeIconItems.forEach((item) => {
                item.classList.remove("active");
                var id = item.getAttribute("sub-items");
                const getID = document.getElementById(id) as HTMLElement
                if (getID)
                    getID.classList.remove("show");
            });
        }
    }

    useEffect(() => {
        document.body.classList.remove('twocolumn-panel');
        if (iscurrentState !== 'Dashboard') {
            setIsDashboard(false);
        }
        if (iscurrentState !== 'Apps') {
            setIsApps(false);
        }
        if (iscurrentState !== 'Auth') {
            setIsAuth(false);
        }
        if (iscurrentState !== 'Pages') {
            setIsPages(false);
        }
        if (iscurrentState !== 'BaseUi') {
            setIsBaseUi(false);
        }
        if (iscurrentState !== 'AdvanceUi') {
            setIsAdvanceUi(false);
        }
        if (iscurrentState !== 'Forms') {
            setIsForms(false);
        }
        if (iscurrentState !== 'Tables') {
            setIsTables(false);
        }
        if (iscurrentState !== 'Charts') {
            setIsCharts(false);
        }
        if (iscurrentState !== 'Icons') {
            setIsIcons(false);
        }
        if (iscurrentState !== 'Maps') {
            setIsMaps(false);
        }
        if (iscurrentState !== 'MuliLevel') {
            setIsMultiLevel(false);
        }
        if (iscurrentState === 'Widgets') {
            history("/widgets");
            document.body.classList.add('twocolumn-panel');
        }
        if (iscurrentState !== 'Landing') {
            setIsLanding(false);
        }
    }, [
        history,
        iscurrentState,
        isDashboard,
        isApps,
        isAuth,
        isPages,
        isBaseUi,
        isAdvanceUi,
        isForms,
        isTables,
        isCharts,
        isIcons,
        isMaps,
        isMultiLevel
    ]);

    const menuItems : any= [
        // {
        //     label: "Menu",
        //     isHeader: true,
        // },
       
        {
            id: "apps",
            label: "Apps",
            // icon: "ri-apps-2-line",
            link: "/#",
            click: function (e : any) {
                e.preventDefault();
                setIsApps(!isApps);
                setIscurrentState('Apps');
                updateIconSidebar(e);
            },
            stateVariables: isApps,
            subItems: [

                {
                    id: "tasks",
                    label: "회원관리",
                    link: "/#",
                    isChildItem: true,
                    click: function (e : any) {
                        e.preventDefault();
                        setIsTasks(!isTasks);
                    },
                    parentId: "apps",
                    stateVariables: isTasks,
                    childItems: [
                        { id: 1, label: "회원목록", link: "/apps-member-list", parentId: "apps" },
                        { id: 2, label: "탈퇴회원목록", link: "/apps-member-withdrawal", parentId: "apps" },
                    ]
                },
                {
                    id: "appscrm",
                    label: "병원관리",
                    link: "/#",
                    isChildItem: true,
                    click: function (e : any) {
                        e.preventDefault();
                        setIsCRM(!isCRM);
                    },
                    parentId: "apps",
                    stateVariables: isCRM,
                    childItems: [
                        { id: 1, label: "병원목록", link: "/apps-hospital-list" },
                        { id: 2, label: "검진프로그램", link: "/apps-checkup-program" },
                    ]
                },
                {
                    id: "appscrypto",
                    label: "제휴사관리",
                    link: "/#",
                    isChildItem: true,
                    click: function (e : any) {
                        e.preventDefault();
                        setIsCrypto(!isCrypto);
                    },
                    parentId: "apps",
                    stateVariables: isCrypto,
                    childItems: [
                        { id: 1, label: "제휴사목록", link: "/apps-affiliates-list", parentId: "apps" },
                       
                    ]
                },
                {
                    id: "apps",
                    label: "예약관리",
                    link: "/#",
                    isChildItem: true,
                    click: function (e : any) {
                        e.preventDefault();
                        setIsInvoices(!isInvoices);
                    },
                    parentId: "apps",
                    stateVariables: isInvoices,
                    childItems: [
                        { id: 1, label: "예약목록", link: "/apps-reservation-list", parentId: "apps" },
                        
                    ]
                },
                {
                    id: "supportTickets",
                    label: "결제관리",
                    link: "/#",
                    isChildItem: true,
                    click: function (e : any) {
                        e.preventDefault();
                        setIsSupportTickets(!isSupportTickets);
                    },
                    parentId: "apps",
                    stateVariables: isSupportTickets,
                    childItems: [
                        { id: 1, label: "결제목록", link: "/apps-crm-leads" },
                        { id: 2, label: "환불목록", link: "/apps-tickets-details" },
                    ]
                },
                {
                    id: "NFTMarketplace",
                    label: "알림센터",
                    link: "/#",
                    isChildItem: true,
                    click: function (e : any) {
                        e.preventDefault();
                        setIsNFTMarketplace(!isNFTMarketplace);
                    },
                    parentId: "apps",
                    stateVariables: isNFTMarketplace,
                    childItems: [
                        { id: 1, label: "알림목록", link: "/apps-nft-ranking" },
                    ]
                },
                {
                    id: "appsecommerce",
                    label: "고객센터",
                    link: "/#",
                    isChildItem: true,
                    click: function (e : any) {
                        e.preventDefault();
                        setIsEcommerce(!isEcommerce);
                    },
                    parentId: "apps",
                    stateVariables: isEcommerce,
                    childItems: [
                        { id: 1, label: "공지사항", link: "/apps-ecommerce-products", parentId: "apps" },
                        { id: 2, label: "FAQ", link: "/apps-projects-create", parentId: "apps", },
                        { id: 3, label: "제휴문의", link: "/apps-ecommerce-orders", parentId: "apps" },
                     
                    ]
                },
                {
                    id: "calendar",
                    label: "팝업관리",
                    link: "/#",
                    parentId: "apps",
                    isChildItem: true,
                    click: function (e: any) {
                        e.preventDefault();
                        setCalendar(!isCalendar);
                    },
                    stateVariables: isCalendar,
                    childItems: [
                       
                        { id: 1, label: "팝업목록", link: "/apps-ecommerce-seller-details", parentId: "apps" },
                    ]
                },
                {
                    id: "appsecommerce",
                    label: "접속통계",
                    link: "/#",
                    isChildItem: true,
                    click: function (e : any) {
                        e.preventDefault();
                        setIsEcommerce(!isEcommerce);
                    },
                    parentId: "apps",
                    stateVariables: isEcommerce,
                    childItems: [
                      

                        { id: 1, label: "일간접속통계", link: "/apps-ecommerce-add-product", parentId: "apps" },
                        { id: 2, label: "주간접속통계", link: "/apps-ecommerce-order-details", parentId: "apps" },
                        { id: 3, label: "연간접속통계", link: "/apps-ecommerce-customers", parentId: "apps" },
                      
                    ]
                },
                {
                    id: "appsprojects",
                    label: "환경설정",
                    link: "/#",
                    isChildItem: true,
                    click: function (e : any) {
                        e.preventDefault();
                        setIsProjects(!isProjects);
                    },
                    parentId: "apps",
                    stateVariables: isProjects,
                    childItems: [
                        { id: 1, label: "검진항목관리", link: "/apps-projects-list", parentId: "apps", },
                        { id: 2, label: "약관관리", link: "/apps-projects-overview", parentId: "apps", },
                        
                    ]
                },
            ],
        },
       
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;