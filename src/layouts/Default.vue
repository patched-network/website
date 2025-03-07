<template>
  <div class="page-container">
    <header class="header">
      <!-- Header content stays the same -->
      <div class="header-content">
        <div class="logo-container">
          <g-link class="logo" to="/">
            <GraduationCapIcon class="logo-icon" height="25" />
            <span class="logo-text">{{ $static.metadata.siteName }}</span>
          </g-link>
        </div>
        <nav class="nav">
          <g-link class="nav__link" to="/contact/">Contact</g-link>
          <g-link class="nav__link" to="/blog/">Archive</g-link>
          <a
            href="https://github.com/patched-network"
            target="_blank"
            rel="noopener noreferrer"
            class="nav__link"
            aria-label="GitHub profile"
          >
            <GithubIcon class="github-icon" width="18" height="18" />
          </a>
        </nav>
      </div>
    </header>
    <div class="layout">
      <slot />
    </div>
    <footer class="footer">
      <div class="footer-content">
        <!-- Form with success/error messages -->
        <form
          name="subscribe"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          class="subscribe-form"
          @submit.prevent="handleSubmit"
        >
          <!-- Honeypot field to prevent spam -->
          <p class="hidden">
            <label>Don't fill this out: <input name="bot-field" /></label>
          </p>

          <div class="form-container" v-if="!submitted">
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              class="email-input"
              v-model="email"
              required
              :disabled="submitting"
            />
            <!-- Hidden input for Netlify form handling -->
            <input type="hidden" name="form-name" value="subscribe" />

            <button
              type="submit"
              class="subscribe-button"
              :disabled="submitting"
            >
              {{ submitting ? "Subscribing..." : "Subscribe for updates" }}
            </button>
          </div>

          <!-- Success message -->
          <div v-if="submitted" class="success-message">
            Thanks for subscribing! We'll be in touch soon.
          </div>

          <!-- Error message -->
          <div v-if="error" class="error-message">
            {{ error }}
          </div>
        </form>
      </div>
    </footer>
  </div>
</template>

<script>
import GraduationCapIcon from "../components/grad-cap.vue";
import GithubIcon from "../components/gh-icon.vue";

export default {
  components: {
    GraduationCapIcon,
    GithubIcon,
  },
  data() {
    return {
      email: "",
      submitted: false,
      submitting: false,
      error: null,
    };
  },
  methods: {
    async handleSubmit(e) {
      this.submitting = true;
      this.error = null;

      const formData = new FormData();
      formData.append("form-name", "subscribe");
      formData.append("email", this.email);

      try {
        const response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString(),
        });

        if (!response.ok) {
          throw new Error(`Form submission failed: ${response.status}`);
        }

        this.submitted = true;
        this.email = "";

        // Reset the success message after a delay if you want
        setTimeout(() => {
          this.submitted = false;
        }, 5000);
      } catch (error) {
        console.error("Form submission error:", error);
        this.error = "Something went wrong. Please try again later.";
      }

      this.submitting = false;
    },
  },
};
</script>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style>
@import "../assets/styles.css";
@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap");

body {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.5;
  min-height: 100vh;
}

.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout {
  max-width: 760px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
  flex: 1;
  padding-bottom: 60px; /* Space for footer */
}

.header {
  background-color: var(--primary-color);
  width: 100%;
  color: #ffffff;
  margin-bottom: 20px;
  min-height: 80px;
  display: flex;
  justify-content: center;
}

.header-content {
  max-width: 760px;
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
}

.logo-container {
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.logo {
  font-size: 30px;
  font-weight: bold;
  color: #ffffff;
  font-family: "Comfortaa", cursive;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.logo-icon {
  margin-right: 8px;
  flex-shrink: 0;
}

.nav {
  display: flex;
  align-items: center;
}

.nav__link {
  margin-left: 20px;
  color: #ffffff;
  text-decoration: none;
  font-family: "Comfortaa", cursive;
  white-space: nowrap;
}

.footer {
  background-color: var(--primary-color);
  position: fixed;
  bottom: 0;
  padding: 15px 0;
  width: 100%;
  color: #ffffff;
}

.footer-content {
  max-width: 760px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: center;
}

.subscribe-form {
  display: flex;
  align-items: center;
  max-width: 100%;
  flex-wrap: wrap;
  justify-content: center;
}

.email-input {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  margin-right: 10px;
  font-size: 16px;
  flex: 1;
  min-width: 200px;
}

.subscribe-button {
  padding: 10px 15px;
  background-color: #ffffff;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  font-family: "Comfortaa", cursive;
}

.subscribe-button:hover {
  background-color: #f0f0f0;
}

/* Media query for mobile responsiveness */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    padding: 15px 20px;
    align-items: center;
  }

  .logo-container {
    margin-bottom: 15px;
  }
  .layout {
    padding-bottom: 120px;
  }

  .nav {
    justify-content: center;
  }

  .nav__link:first-child {
    margin-left: 0;
  }

  .subscribe-form {
    flex-direction: column;
    align-items: stretch;
  }

  .email-input {
    margin-right: 0;
    margin-bottom: 10px;
    width: 100%;
  }
}

.hidden {
  display: none;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
  border-radius: 4px;
  padding: 10px 15px;
  text-align: center;
  width: 100%;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  border-radius: 4px;
  padding: 10px 15px;
  margin-top: 10px;
  text-align: center;
  width: 100%;
}

.form-container {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
}

/* Add responsive adjustments for the messages */
@media (max-width: 768px) {
  .success-message,
  .error-message {
    margin-bottom: 10px;
  }
}

/* For very small screens */
@media (max-width: 400px) {
  .nav {
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav__link {
    margin: 5px 10px;
  }
}
</style>
