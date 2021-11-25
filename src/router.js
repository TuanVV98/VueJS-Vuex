import Vue from "vue";
import VueRouter from "vue-router";

import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import NotFound from './pages/NotFound.vue';

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', redirect: '/coaches' },
        { path: '/coaches', component: CoachesList },
        {
            path: '/coaches/:id',
            component: CoachDetail,
            props: true,
            children: [
                { path: 'contact', component: ContactCoach }, // /coaches/id/contact
            ]
        },
        {
            path: '/coaches/:id/edit',
            component: CoachRegistration,
            props: true
        },
        { path: '/register', component: CoachRegistration },
        { path: '/requests', component: RequestsReceived },
        { path: '/:notFound(.*)', component: NotFound },
    ]
});
export default router;
