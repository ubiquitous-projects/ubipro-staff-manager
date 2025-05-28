<script>
    import db from "./firebaseInit";

    export default {
        name: "home",
        data() {
            return {
                staffs: [],
                loading: true,
            };
        },
        created() {
            db.collection("staffs")
                .orderBy("department")
                .get()
                .then((querySnapshot) => {
                    this.loading = false;
                    querySnapshot.forEach((doc) => {
                        const data = {
                            id: doc.id,
                            staff_id: doc.data().staff_id,
                            name: doc.data().name,
                            department: doc.data().department,
                            position: doc.data().position,
                        };

                        this.staffs.push(data);
                    });
                });
        },
    };
</script>

<template>
    <div id="home">
        <ul class="collection with-header">
            <li class="collection-header"><h4>Staffs</h4></li>

            <li
                v-for="staff in staffs"
                v-bind:key="staff.id"
                class="collection-item"
            >
                <div class="chip">{{ staff.department }}</div>

                {{ staff.staff_id }}: {{ staff.name }}

                <router-link
                    class="secondary-content"
                    v-bind:to="{
                        name: 'view-staff',
                        params: { staff_id: staff.staff_id },
                    }"
                    ><i class="fa fa-eye"></i
                ></router-link>
            </li>
        </ul>

        <div class="fixed-action-btn">
            <router-link
                to="/new"
                class="btn-floating btn-large red"
            >
                <i class="fa fa-plus"></i>
            </router-link>
        </div>
    </div>
</template>
