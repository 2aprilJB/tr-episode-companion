import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyD-bRZE3M4MRdkzk99sZhnpcOxwsiIu4zA",
    authDomain: "tr-episode-companion.firebaseapp.com",
    databaseURL: "https://tr-episode-companion-default-rtdb.firebaseio.com",
    projectId: "tr-episode-companion",
    storageBucket: "tr-episode-companion.appspot.com",
    messagingSenderId: "1031772893210",
    appId: "1:1031772893210:web:b1f97437603936b1f1a1a3",
    measurementId: "G-CDT4DV7F2Y"
}

// const firebaseConfig1 = {
//     apiKey: "AIzaSyDqlGjRzN7-K5vVIIHYxTnEtwypZwJWjgk",
//     authDomain: "ltet-1nk.firebaseapp.com",
//     databaseURL: "https://ltet-1nk.firebaseio.com",
//     projectId: "ltet-1nk",
//     storageBucket: "ltet-1nk.appspot.com",
//     messagingSenderId: "900437612419",
//     appId: "1:900437612419:web:ed0d51720acc690faec8b6",
//     measurementId: "G-BKYG30PC82"
//   };

const staticBaseConfig = {
    apiKey: "AIzaSyD79UnWbSycIniFrRAObez_s-wBJBx27rk",
    authDomain: "tr-staticbase.firebaseapp.com",
    databaseURL: "https://tr-staticbase-default-rtdb.firebaseio.com",
    projectId: "tr-staticbase",
    storageBucket: "tr-staticbase.appspot.com",
    messagingSenderId: "556116569330",
    appId: "1:556116569330:web:61b0cdea2eaaa4e933b46b",
    measurementId: "G-H3M04W1TZ8"
};

const mainBaseConfig = {
    dynamicBase1: {
        apiKey: "AIzaSyCQHPsmdRFY1wherq_A23pRFRCBJyhoTDw",
        authDomain: "tr-dynamicbase-1.firebaseapp.com",
        databaseURL: "https://tr-dynamicbase-1-default-rtdb.firebaseio.com",
        projectId: "tr-dynamicbase-1",
        storageBucket: "tr-dynamicbase-1.appspot.com",
        messagingSenderId: "1011416680033",
        appId: "1:1011416680033:web:210e1c5fa33507bf788c20",
        measurementId: "G-V1830T3BJ8"
    },
    dynamicBase2:{},
    dynamicBase3:{},
    dynamicBase4: {
        apiKey: "AIzaSyDlSFbpfRteFCZIhN6llM9z9jtosZFQLRc",
        authDomain: "tr-dynamicbase-4.firebaseapp.com",
        projectId: "tr-dynamicbase-4",
        storageBucket: "tr-dynamicbase-4.appspot.com",
        messagingSenderId: "294575645216",
        appId: "1:294575645216:web:1dd298793de2f09ff85245",
        measurementId: "G-ZFR1MNHHEJ"
    },
    dynamicBase5:{
        apiKey: "AIzaSyAJd3v07BKrwdpU5EwYaED3UxziKARBncA",
        authDomain: "tr-dynamicbase-5.firebaseapp.com",
        databaseURL: "https://tr-dynamicbase-5-default-rtdb.firebaseio.com",
        projectId: "tr-dynamicbase-5",
        storageBucket: "tr-dynamicbase-5.appspot.com",
        messagingSenderId: "897860212460",
        appId: "1:897860212460:web:8af0fd05571aba3aa837c9",
        measurementId: "G-JT3MGQQRNG"
    }
}

//TR-Support1 : trserverlintt01@gmail.com
//Participants's Firestore Configs
const teamCoordsConfig = {
    Z0:{
        apiKey: "AIzaSyCL4IaaPQ0-yTT-QYm_gfV2-OtWZhUn2ok",
        authDomain: "tr-char-z0.firebaseapp.com",
        projectId: "tr-char-z0",
        storageBucket: "tr-char-z0.appspot.com",
        messagingSenderId: "56876061330",
        appId: "1:56876061330:web:704fb0d3162e5feb8fcc4b",
        measurementId: "G-RCTB2G767W"
    },
    Z1:{
        apiKey: "AIzaSyA3clZ4AtaFn_QydxKQXnEPTtgm6FYntls",
        authDomain: "tr-char-z1.firebaseapp.com",
        projectId: "tr-char-z1",
        storageBucket: "tr-char-z1.appspot.com",
        messagingSenderId: "380575218267",
        appId: "1:380575218267:web:133b5e8bd1ed8772071d7e",
        measurementId: "G-VQYJ16KT9F"
    },
    Z2:{
        apiKey: "AIzaSyDT8ZhMDZQa4-cKcf3TOsp_cwkxmx9rIvs",
        authDomain: "tr-char-z2.firebaseapp.com",
        projectId: "tr-char-z2",
        storageBucket: "tr-char-z2.appspot.com",
        messagingSenderId: "951981813131",
        appId: "1:951981813131:web:e72f725ee04c5385d2538e",
        measurementId: "G-S7LKY22W6N"
    },
    Z3:{
        apiKey: "AIzaSyBz2T_gsStF_h-VrXXILB2lVo8q6mLgCiE",
        authDomain: "tr-char-z3.firebaseapp.com",
        projectId: "tr-char-z3",
        storageBucket: "tr-char-z3.appspot.com",
        messagingSenderId: "100369752744",
        appId: "1:100369752744:web:d96bc5f73216b5c7f6d89d",
        measurementId: "G-70S7FLJE93"
    },
    Z4:{
        apiKey: "AIzaSyAMolI86ILQbUEBujt-IYelEG9JAyFeGEE",
        authDomain: "tr-char-z4.firebaseapp.com",
        projectId: "tr-char-z4",
        storageBucket: "tr-char-z4.appspot.com",
        messagingSenderId: "402181395119",
        appId: "1:402181395119:web:f4b30097cc523a20f47a5a",
        measurementId: "G-ZM3P1LQ0KV"
    },
    Z5:{
        apiKey: "AIzaSyBIVV3Tx8hskDBpeK9UQtCmqIOufhDcLbY",
        authDomain: "tr-char-z5.firebaseapp.com",
        projectId: "tr-char-z5",
        storageBucket: "tr-char-z5.appspot.com",
        messagingSenderId: "126553007134",
        appId: "1:126553007134:web:0958053be4f7338c733a0f",
        measurementId: "G-D9R452C008"
    },
    Z6:{
        apiKey: "AIzaSyB8hehuj3vrGsRz_tmKIQwsgBnKB_WHhtI",
        authDomain: "tr-char-z6.firebaseapp.com",
        projectId: "tr-char-z6",
        storageBucket: "tr-char-z6.appspot.com",
        messagingSenderId: "282674869492",
        appId: "1:282674869492:web:43e703afb30af3e9381aa1",
        measurementId: "G-DSJ8YRST4Q"
    },
    Z7:{
        apiKey: "AIzaSyBJD1VLB2f8juHnFZ5gSZQqaKauSQkojgE",
        authDomain: "tr-char-z7.firebaseapp.com",
        projectId: "tr-char-z7",
        storageBucket: "tr-char-z7.appspot.com",
        messagingSenderId: "854992569191",
        appId: "1:854992569191:web:cba0a7ec09c8db0963a5c2",
        measurementId: "G-M91HTFCKQ0"
    },
    A: {
        apiKey: "AIzaSyB-SOdcLeCq9PJWO5yiBVnKfhhrpT1qavo",
        authDomain: "tr-team-a.firebaseapp.com",
        projectId: "tr-team-a",
        storageBucket: "tr-team-a.appspot.com",
        messagingSenderId: "713495846254",
        appId: "1:713495846254:web:0c46a5d8ce71aee55cb57f",
        measurementId: "G-Q43Z6ESJ7W"
    },
    B: {
        apiKey: "AIzaSyBKQB1r4ZvB1Mm-K_xQcM6XtaDP98E0CgQ",
        authDomain: "tr-team-b.firebaseapp.com",
        databaseURL: "https://tr-team-b-default-rtdb.firebaseio.com",
        projectId: "tr-team-b",
        storageBucket: "tr-team-b.appspot.com",
        messagingSenderId: "951334541844",
        appId: "1:951334541844:web:299da669085b274a302501",
        measurementId: "G-TXEX4R8E92"
    },
    C: {
        apiKey: "AIzaSyCgVchW0ShcCJynpszLIQToc-1ygKatHQA",
        authDomain: "tr-team-c.firebaseapp.com",
        databaseURL: "https://tr-team-c-default-rtdb.firebaseio.com",
        projectId: "tr-team-c",
        storageBucket: "tr-team-c.appspot.com",
        messagingSenderId: "755157202433",
        appId: "1:755157202433:web:400f26068534cc9c267200",
        measurementId: "G-3D0HCGCF0M"
    },
    D: {
        apiKey: "AIzaSyCn2nX9lS1cMrZkrquLjK3SFHSvt41Ik7o",
        authDomain: "tr-team-d.firebaseapp.com",
        databaseURL: "https://tr-team-d-default-rtdb.firebaseio.com",
        projectId: "tr-team-d",
        storageBucket: "tr-team-d.appspot.com",
        messagingSenderId: "467677051754",
        appId: "1:467677051754:web:f57f4c570069aeaa4d8313",
        measurementId: "G-YT4E3CN9GP"
    },
    E: {
        apiKey: "AIzaSyAS2aIDwLIwvw42IOCFj0kNX9k2rVCDDXM",
        authDomain: "tr-team-e.firebaseapp.com",
        databaseURL: "https://tr-team-e-default-rtdb.firebaseio.com",
        projectId: "tr-team-e",
        storageBucket: "tr-team-e.appspot.com",
        messagingSenderId: "965418008485",
        appId: "1:965418008485:web:0d158803e8bfa24aaf324c",
        measurementId: "G-DQNPRLV6J6"
    },
    F:{
        apiKey: "AIzaSyBy719jkNqIMd9fqC17ASPAe4eEjOLjlmY",
        authDomain: "tr-team-f.firebaseapp.com",
        projectId: "tr-team-f",
        storageBucket: "tr-team-f.appspot.com",
        messagingSenderId: "553932115277",
        appId: "1:553932115277:web:478762d6a2f7f02e43bb04",
        measurementId: "G-4ZQMSKEQV2"
    },
    G:{
        apiKey: "AIzaSyAQE-ACId_NkuIo-vBDcZvKsXYrhQVhQ6o",
        authDomain: "tr-team-g.firebaseapp.com",
        projectId: "tr-team-g",
        storageBucket: "tr-team-g.appspot.com",
        messagingSenderId: "563454355808",
        appId: "1:563454355808:web:1b733a97e6b88f158a5605",
        measurementId: "G-1JF1J9DBVF"
    },
    H:{
        apiKey: "AIzaSyAJ2tUroiRCkHVuqm5qj6wkSj6wm1Lcu6k",
        authDomain: "tr-team-h.firebaseapp.com",
        projectId: "tr-team-h",
        storageBucket: "tr-team-h.appspot.com",
        messagingSenderId: "789935638585",
        appId: "1:789935638585:web:de93e9306e6fdebb3b25e8",
        measurementId: "G-93571RRJST"
    }
}

const app = initializeApp(firebaseConfig);
// const appMain = initializeApp(firebaseConfig1,'dbMain');
const appStaticBase = initializeApp(staticBaseConfig,'dbStatic');
const appDynamicBase1 = initializeApp(mainBaseConfig.dynamicBase1,'dbDynamic1');
const appDynamicBase4 = initializeApp(mainBaseConfig.dynamicBase4,'dbDynamic4');
const appDynamicBase5 = initializeApp(mainBaseConfig.dynamicBase5,'dbDynamic5');

const appCharZ0 = initializeApp(teamCoordsConfig.Z0,'CharZ0');
const appCharZ1 = initializeApp(teamCoordsConfig.Z1,'CharZ1');
const appCharZ2 = initializeApp(teamCoordsConfig.Z2,'CharZ2');
const appCharZ3 = initializeApp(teamCoordsConfig.Z3,'CharZ3');
const appCharZ4 = initializeApp(teamCoordsConfig.Z4,'CharZ4');
const appCharZ5 = initializeApp(teamCoordsConfig.Z5,'CharZ5');
const appCharZ6 = initializeApp(teamCoordsConfig.Z6,'CharZ6');
const appCharZ7 = initializeApp(teamCoordsConfig.Z7,'CharZ7');
const appTeamA = initializeApp(teamCoordsConfig.A,'TeamA');
const appTeamB = initializeApp(teamCoordsConfig.B,'TeamB');
const appTeamC = initializeApp(teamCoordsConfig.C,'TeamC');
const appTeamD = initializeApp(teamCoordsConfig.D,'TeamD');
const appTeamE = initializeApp(teamCoordsConfig.E,'TeamE');
const appTeamF = initializeApp(teamCoordsConfig.F,'TeamF');
const appTeamG = initializeApp(teamCoordsConfig.E,'TeamG');
const appTeamH = initializeApp(teamCoordsConfig.H,'TeamH');

export const db = getFirestore(app);
// export const dbMain = getFirestore(appMain);
export const dbStatic = getFirestore(appStaticBase);
export const dbDynamic1 = getFirestore(appDynamicBase1);
export const dbDynamic4 = getFirestore(appDynamicBase4);    
export const dbDynamic5 = getFirestore(appDynamicBase5);    
export const dbTeams = {
    Z0: getFirestore(appCharZ0),
    Z1: getFirestore(appCharZ1),
    Z2: getFirestore(appCharZ2),
    Z3: getFirestore(appCharZ3),
    Z4: getFirestore(appCharZ4),
    Z5: getFirestore(appCharZ5),
    Z6: getFirestore(appCharZ6),
    Z7: getFirestore(appCharZ7),
    A: getFirestore(appTeamA),
    B: getFirestore(appTeamB),
    C: getFirestore(appTeamC),
    D: getFirestore(appTeamD),
    E: getFirestore(appTeamE),
    F: getFirestore(appTeamF),
    G: getFirestore(appTeamG),
    H: getFirestore(appTeamH)
}