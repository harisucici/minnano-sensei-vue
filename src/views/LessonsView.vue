<template>
  <div class="lessons">
    <div v-if="isAuthenticated">
      <h1>Japanese Lessons</h1>
      <div class="lessons-container">
        <div 
          v-for="lesson in lessons" 
          :key="lesson.id" 
          class="lesson-card"
          @click="viewLesson(lesson)"
        >
          <h3>{{ lesson.title }}</h3>
          <p><strong>Textbook:</strong> {{ lesson.textbook }}</p>
          <p><strong>Chapter:</strong> {{ lesson.chapter }}</p>
          <p>{{ lesson.content }}</p>
          <p><strong>Grammar Points:</strong> {{ lesson.grammarPoints.length }} items</p>
          <p><strong>Vocabulary:</strong> {{ lesson.vocabulary.length }} words</p>
        </div>
      </div>
    </div>
    <div v-else class="auth-required">
      <h2>Access Denied</h2>
      <p>Please sign in to access lessons.</p>
      <router-link to="/login" class="cta-button">Sign In</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'LessonsView',
  computed: {
    ...mapGetters(['getLessons', 'isAuthenticated']),
    lessons() {
      return this.getLessons;
    }
  },
  methods: {
    viewLesson(lesson) {
      // In a real app, this would navigate to a detailed lesson view
      alert(`Lesson: ${lesson.title}\n\n${lesson.content}`);
    }
  }
}
</script>

<style scoped>
.lessons {
  width: 100%;
}

.lessons-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.lesson-card {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 3px 10px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.lesson-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.lesson-card h3 {
  color: #1a73e8;
  margin-bottom: 0.5rem;
}

.lesson-card p {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
}

.auth-required {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.08);
}

.auth-required h2 {
  color: #1a73e8;
  margin-bottom: 1rem;
}

.auth-required p {
  margin-bottom: 1.5rem;
  color: #666;
}

.cta-button {
  background-color: #1a73e8;
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 1.1rem;
  border-radius: 30px;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  display: inline-block;
  transition: transform 0.3s, box-shadow 0.3s;
}
</style>