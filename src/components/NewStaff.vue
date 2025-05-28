<script>
    import db from "./firebaseInit";

    export default {
        name: "new-staff",
        data() {
            return {
                staff_id: null,
                name: null,
                department: null,
                position: null,
            };
        },
        methods: {
            saveStaff() {
                db.collection("staffs")
                    .add({
                        staff_id: this.staff_id,
                        name: this.name,
                        department: this.department,
                        position: this.position,
                    })
                    .then((docRef) => {
                        console.log("Staff added: ", docRef.id);

                        this.$router.push("/");
                    })
                    .catch((error) => {
                        console.error("Staff NOT added: ", error);
                    });
            },
        },
    };
</script>

<template>
    <div id="new-staff">
        <h3>New Staff</h3>

        <div class="row">
            <form
                @submit.prevent="saveStaff"
                class="col s12"
            >
                <div class="row">
                    <div class="input-field col s12">
                        <input
                            type="text"
                            v-model="staff_id"
                            required
                        />

                        <label>Staff ID#</label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12">
                        <input
                            type="text"
                            v-model="name"
                            required
                        />

                        <label>Name</label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12">
                        <input
                            type="text"
                            v-model="department"
                            required
                        />

                        <label>Department</label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12">
                        <input
                            type="text"
                            v-model="position"
                            required
                        />

                        <label>Position</label>
                    </div>
                </div>

                <button
                    type="submit"
                    class="btn"
                >
                    Add
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
