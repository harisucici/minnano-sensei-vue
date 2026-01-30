<template>
  <div id="app">
    <header v-if="showHeader">
      <nav class="navbar">
        <div class="nav-brand">
          <router-link to="/" class="brand-link">
            <h1>📚 Minnano Sensei</h1>
          </router-link>
        </div>
        <ul class="nav-menu">
          <li><router-link to="/" class="nav-link" active-class="active">Home</router-link></li>
          <li v-if="isAuthenticated">
            <router-link to="/lessons" class="nav-link" active-class="active">Lessons</router-link>
          </li>
          <li v-if="isAuthenticated">
            <router-link to="/practice" class="nav-link" active-class="active">Practice</router-link>
          </li>
          <li v-if="isAuthenticated">
            <router-link to="/profile" class="nav-link" active-class="active">Profile</router-link>
          </li>
          <li v-if="isAuthenticated">
            <button @click="logout" class="logout-btn">Logout</button>
          </li>
          <li v-if="!isAuthenticated">
            <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
          </li>
        </ul>
        <div class="hamburger" @click="toggleMobileMenu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
      </nav>
    </header>

    <main>
      <router-view :isAuthenticated="isAuthenticated" />
    </main>

    <footer v-if="showFooter">
      <p>&copy; 2025 Minnano Sensei - AI-Powered Japanese Learning</p>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters(['isAuthenticated']),
    showHeader() {
      // Don't show header on login page
      return this.$route.name !== 'login';
    },
    showFooter() {
      // Don't show footer on login page
      return this.$route.name !== 'login';
    }
  },
  methods: {
    ...mapActions(['logout']),
    toggleMobileMenu() {
      const navMenu = document.querySelector('.nav-menu');
      navMenu.classList.toggle('active');
    }
  },
  mounted() {
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.remove('active');
      });
    });
  }
}
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.brand-link {
  text-decoration: none;
  color: inherit;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #1a73e8;
  color: white;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 1.5rem;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover, .nav-link.active {
  background-color: rgba(255, 255, 255, 0.2);
}

.logout-btn {
  background: none;
  border: none;
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: inherit;
}

.logout-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.bar {
  width: 25px;
  height: 3px;
  background-color: white;
  margin: 3px 0;
  transition: 0.3s;
}

main {
  flex: 1;
  padding: 2rem 0;
}

footer {
  text-align: center;
  padding: 1.5rem;
  background-color: #f5f5f5;
  color: #666;
  margin-top: auto;
}

@media (max-width: 768px) {
  .nav-menu {
    position: fixed;
    left: -100%;
    top: 70px;
    flex-direction: column;
    background-color: #1a73e8;
    width: 100%;
    text-align: center;
    transition: 0.3s;
    box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
    padding: 2rem 0;
  }

  .nav-menu.active {
    left: 0;
  }

  .hamburger {
    display: flex;
  }
}
</style>