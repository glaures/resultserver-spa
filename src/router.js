import Vue from 'vue'
import VueRouter from 'vue-router'
import TeamStrengthView from "./views/TeamStrengthView";
import LoginView from "./views/LoginView";
import MatchesView from "@/views/MatchesView";

Vue.use(VueRouter)

const routes = [
    {
        path: "/spiele",
        alias: "/",
        name: "matches",
        component: MatchesView
    },
    {
        path: "/mannschaftsstaerken",
        name: "strenghts",
        component: TeamStrengthView
    },
    {
        path: '/anmelden',
        name: 'login',
        component: LoginView
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;