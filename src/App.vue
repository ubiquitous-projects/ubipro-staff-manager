<script>
    import Navbar from "./components/Navbar";
    import NewStaff from "./components/NewStaff";

    export default {
        name: "app",
        components: {
            Navbar,
            NewStaff,
        },
    };
</script>

<style>
    nav {
        margin-bottom: 10px;
    }
</style>

<template>
    <div id="app">
        <Navbar />

        <div class="container">
            <router-view />
        </div>
    </div>
</template>
