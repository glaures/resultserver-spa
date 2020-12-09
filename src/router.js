import Vue from 'vue'
import VueRouter from 'vue-router'
import TeamStrengthView from "./views/TeamStrengthView";

Vue.use(VueRouter)

const routes = [
    {
        path: "/mannschaftsstaerken",
        alias: "/",
        name: "strenghts",
        component: TeamStrengthView
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;