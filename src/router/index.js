import EditStaff from "@/components/EditStaff";
import Home from "@/components/Home";
import NewStaff from "@/components/NewStaff";
import ViewStaff from "@/components/ViewStaff";
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home,
        },
        {
            path: "/new",
            name: "new-staff",
            component: NewStaff,
        },
        {
            path: "/:staff_id",
            name: "view-staff",
            component: ViewStaff,
        },
        {
            path: "/edit/:staff_id",
            name: "edit-staff",
            component: EditStaff,
        },
    ],
});
