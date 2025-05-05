<template>
    <DashboardLayout>
        <div class="dashboard-container">
            <!-- Sidebar -->
            <nav class="sidebar">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/dashboard">
                            <i class="bi bi-speedometer2"></i> Overview
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/analytics">
                            <i class="bi bi-bar-chart"></i> Analytics
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/schedule">
                            <i class="bi bi-calendar-check"></i> Schedule
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/reports">
                            <i class="bi bi-file-earmark-text"></i> Reports
                        </router-link>
                    </li>
                </ul>
            </nav>

            <!-- Main Content -->
            <main class="main-content">
                <h2 class="neon-text">Welcome, {{ user?.role }}</h2>
                <p class="subtext">This is your personalized dashboard.</p>

                <div class="dashboard-widgets">
                    <div class="card" v-for="(widget, index) in widgets" :key="index">
                        <div class="card-body">
                            <h5 class="card-title">
                                <i :class="widget.icon"></i> {{ widget.title }}
                            </h5>
                            <p class="card-text">{{ widget.description }}</p>
                            <a href="#" class="btn" :class="widget.buttonClass">Go</a>
                        </div>
                    </div>
                </div>

                <div class="container">
                    <h1 class="text-center mt-4 text-light">Admin Panel</h1>
                    <UsersTable />
                </div>
            </main>
        </div>
    </DashboardLayout>
</template>

<script>

import UsersTable from "../components/UserTable.vue";

export default {
    components: {
        UsersTable,
    },
    computed: {
        user() {
            return this.$store.getters.getUser;
        },
    },
    data() {
        return {
            widgets: [
                { title: "Analytics", description: "View your stats and reports.", icon: "bi bi-bar-chart", buttonClass: "btn-primary" },
                { title: "Schedule", description: "Manage your events.", icon: "bi bi-calendar", buttonClass: "btn-success" },
                { title: "Reports", description: "Access your data reports.", icon: "bi bi-file-earmark-text", buttonClass: "btn-info" }
            ]
        };
    }
};
</script>

<style scoped>
/* Sidebar */
.sidebar {
    width: 250px;
    background: rgba(33, 33, 33, 0.95);
    padding-top: 20px;
    position: fixed;
    height: 100vh;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.5);
}

.main-content p {
    color: #fff;
}

.sidebar .nav-link {
    color: #00eaff;
    display: flex;
    align-items: center;
    padding: 12px;
    transition: 0.3s;
}

.sidebar .nav-link:hover {
    background: rgba(0, 234, 255, 0.2);
    border-left: 4px solid #00eaff;
}

/* Main Content */
.main-content {
    flex-grow: 1;
    margin-left: 250px;
    padding: 40px;
    text-align: center;
}

.neon-text {
    font-size: 2rem;
    color: #00eaff;
    text-shadow: 0 0 8px #00eaff, 0 0 16px #00eaff, 0 0 32px #00eaff;
}
</style>