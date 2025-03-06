<template>
  <Layout>
    <h1>Get in touch!</h1>

    <form name="contact" method="POST" data-netlify="true" class="contact-form">
      <div class="form-group">
        <label for="contact-method">Email or Telegram:</label>
        <input
          type="text"
          name="contact-method"
          id="contact-method"
          placeholder="Your email or Telegram username"
          required
        />
      </div>

      <div class="form-group">
        <label for="message">Message:</label>
        <textarea
          name="message"
          id="message"
          rows="5"
          placeholder="What would you like to tell us?"
          required
        ></textarea>
      </div>

      <!-- Hidden input for Netlify form handling -->
      <input type="hidden" name="form-name" value="contact" />

      <button type="submit" class="submit-button">Send Message</button>
    </form>

    <div class="form-info">
      <p>We'll get back to you as soon as possible!</p>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: "Contact Us",
  },
};
</script>

<style scoped>
.contact-form {
  max-width: 600px;
  margin: 2rem 0;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.submit-button {
  background-color: #4a5568;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #2d3748;
}

.form-info {
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #718096;
}
</style>
