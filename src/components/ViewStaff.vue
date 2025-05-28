<script>
    import db from "./firebaseInit";

    export default {
        name: "view-staff",
        data() {
            return {
                staff_id: null,
                name: null,
                department: null,
                position: null,
            };
        },
        beforeRouteEnter(to, from, next) {
            db.collection("staffs")
                .where("staff_id", "==", to.params.staff_id)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        next((vm) => {
                            vm.staff_id = doc.data().staff_id;

                            vm.name = doc.data().name;

                            vm.department = doc.data().department;

                            vm.position = doc.data().position;
                        });
                    });
                });
        },
        watch: {
            $route: "fetchData",
        },
        methods: {
            fetchData() {
                db.collection("staffs")
                    .where("staff_id", "==", this.$route.params.staff_id)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            this.staff_id = doc.data().staff_id;

                            this.name = doc.data().name;

                            this.department = doc.data().department;

                            this.position = doc.data().position;
                        });
                    });
            },
            deleteStaff() {
                if (confirm("Are you sure?")) {
                    db.collection("staffs")
                        .where("staff_id", "==", this.$route.params.staff_id)
                        .get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                doc.ref.delete();

                                this.$router.push("/");
                            });
                        });
                }
            },
        },
    };
</script>

<template>
    <div id="view-staff">
        <ul class="collection with-header">
            <li class="collection-header">
                <h4>{{ name }}</h4>
            </li>

            <li class="collection-item">Staff ID#: {{ staff_id }}</li>

            <li class="collection-item">Department: {{ department }}</li>

            <li class="collection-item">Position: {{ position }}</li>
        </ul>

        <router-link
            to="/"
            class="btn grey"
            >Back</router-link
        >

        <button
            @click="deleteStaff"
            class="btn red"
        >
            Delete
        </button>

        <div class="fixed-action-btn">
            <router-link
                v-bind:to="{
                    name: 'edit-staff',
                    params: { staff_id: staff_id },
                }"
                class="btn-floating btn-large red"
            >
                <i class="fa fa-pencil"></i>
            </router-link>
        </div>
    </div>
</template>
