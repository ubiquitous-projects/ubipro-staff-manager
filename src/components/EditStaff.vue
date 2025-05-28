<script>
    import db from "./firebaseInit";

    export default {
        name: "edit-staff",
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
            updateStaff() {
                db.collection("staffs")
                    .where("staff_id", "==", this.$route.params.staff_id)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            doc.ref
                                .update({
                                    staff_id: this.staff_id,
                                    name: this.name,
                                    department: this.department,
                                    position: this.position,
                                })
                                .then(() => {
                                    this.$router.push({
                                        name: "view-staff",
                                        params: { staff_id: this.staff_id },
                                    });
                                });
                        });
                    });
            },
        },
    };
</script>

<template>
    <div id="new-staff">
        <h3>Edit Staff</h3>

        <div class="row">
            <form
                @submit.prevent="updateStaff"
                class="col s12"
            >
                <div class="row">
                    <div class="input-field col s12">
                        <input
                            type="text"
                            v-model="staff_id"
                            required
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12">
                        <input
                            type="text"
                            v-model="name"
                            required
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12">
                        <input
                            type="text"
                            v-model="department"
                            required
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12">
                        <input
                            type="text"
                            v-model="position"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    class="btn"
                >
                    Submit
                </button>

                <router-link
                    to="/"
                    class="btn grey"
                    >Cancel</router-link
                >
            </form>
        </div>
    </div>
</template>
