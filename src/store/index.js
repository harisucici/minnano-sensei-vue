import { createStore } from 'vuex'

const store = createStore({
  state: {
    user: null, // Initially no user is logged in
    isAuthenticated: false,
    authToken: null,
    lessons: [
      {
        id: 1,
        title: "はじめまして - Introduction",
        textbook: "Minna no Nihongo",
        chapter: "Lesson 1",
        content: "Basic greetings and introductions in Japanese. Learn to say hello, goodbye, and introduce yourself.",
        grammarPoints: [
          {
            id: 'gr-1',
            pattern: "です (desu)",
            explanation: "The copula verb used to end sentences formally",
            examples: [
              'これは本です (This is a book)',
              '私は学生です (I am a student)'
            ],
            usageNotes: 'Used in formal situations and written language'
          },
          {
            id: 'gr-2',
            pattern: "は (wa)",
            explanation: "Topic particle marking the topic of the sentence",
            examples: [
              '私は田中です (I am Tanaka)',
              'これは何ですか？(What is this?)'
            ],
            usageNotes: 'Pronounced as "wa" when used as a particle'
          }
        ],
        vocabulary: [
          { id: 'voc-1', word: "こんにちは", reading: "konnichiwa", meaning: "Hello", level: "N5", exampleSentences: ['こんにちは、元気ですか？(Hello, how are you?)'] },
          { id: 'voc-2', word: "さようなら", reading: "sayōnara", meaning: "Goodbye", level: "N5", exampleSentences: ['じゃあ、また明日。さようなら。(Well, see you tomorrow. Goodbye.)'] },
          { id: 'voc-3', word: "ありがとう", reading: "arigatō", meaning: "Thank you", level: "N5", exampleSentences: ['どうもありがとう。(Thank you very much.)'] }
        ],
        exercises: [
          {
            id: 'ex-1',
            type: 'vocabulary',
            question: 'What does こんにちは mean?',
            options: ['Good morning', 'Hello', 'Good night', 'See you later'],
            correctAnswer: 'Hello',
            explanation: 'こんにちは is a greeting used during the day'
          }
        ]
      },
      {
        id: 2,
        title: "家族 - Family Members",
        textbook: "Minna no Nihongo",
        chapter: "Lesson 2",
        content: "Learn about family members and relationships in Japanese culture.",
        grammarPoints: [
          {
            id: 'gr-3',
            pattern: "の (no)",
            explanation: "Possessive particle connecting nouns",
            examples: [
              '私の本 (My book)',
              '田中さんの車 (Tanaka\'s car)'
            ],
            usageNotes: 'Used to show possession or relation between nouns'
          },
          {
            id: 'gr-4',
            pattern: "が (ga)",
            explanation: "Subject particle marking the subject of the sentence",
            examples: [
              '猫がいます (There is a cat/I have a cat)',
              '彼が先生です (He is the teacher)'
            ],
            usageNotes: 'Often used with existence verbs (aru, iru) and certain adjectives'
          }
        ],
        vocabulary: [
          { id: 'voc-4', word: "家族", reading: "かぞく", meaning: "Family", level: "N5", exampleSentences: ['家族は大切です。(Family is important.)'] },
          { id: 'voc-5', word: "父", reading: "ちち", meaning: "Father", level: "N5", exampleSentences: ['父は医者です。(My father is a doctor.)'] },
          { id: 'voc-6', word: "母", reading: "はは", meaning: "Mother", level: "N5", exampleSentences: ['母は料理が得意です。(My mother is good at cooking.)'] }
        ],
        exercises: []
      },
      {
        id: 3,
        title: "数字と時間 - Numbers and Time",
        textbook: "Minna no Nihongo",
        chapter: "Lesson 3",
        content: "Numbers, counting, and telling time in Japanese.",
        grammarPoints: [
          {
            id: 'gr-5',
            pattern: "時 (ji)",
            explanation: "Counter for hours",
            examples: [
              '三時 (Three o\'clock)',
              '午後七時 (Seven PM)'
            ],
            usageNotes: 'Used with numbers to indicate hours'
          },
          {
            id: 'gr-6',
            pattern: "分 (fun/bun)",
            explanation: "Counter for minutes",
            examples: [
              '十五分 (Fifteen minutes)',
              '三分 (Three minutes)'
            ],
            usageNotes: 'Has irregular pronunciations for certain numbers (1, 4, 6, 8, 10)'
          }
        ],
        vocabulary: [
          { id: 'voc-7', word: "一", reading: "いち", meaning: "One", level: "N5", exampleSentences: ['一つのりんご。(One apple.)'] },
          { id: 'voc-8', word: "二", reading: "に", meaning: "Two", level: "N5", exampleSentences: ['二冊の本。(Two books.)'] },
          { id: 'voc-9', word: "三", reading: "さん", meaning: "Three", level: "N5", exampleSentences: ['三人の友達。(Three friends.)'] }
        ],
        exercises: []
      }
    ],
    conversation: [
      {
        id: 1,
        sender: 'ai',
        message: "Kon'nichiwa! こんにちは！ Welcome to your AI practice session. Ask me anything about Japanese grammar, vocabulary, or conversation. What would you like to practice today?",
        timestamp: new Date()
      }
    ]
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_AUTH_STATUS(state, { isAuthenticated, authToken = null }) {
      state.isAuthenticated = isAuthenticated;
      state.authToken = authToken;
    },
    ADD_MESSAGE(state, message) {
      state.conversation.push(message);
    },
    UPDATE_USER_LESSON_PROGRESS(state, lessonId) {
      if (state.user) {
        const lessonIndex = state.lessons.findIndex(lesson => lesson.id === lessonId);
        if (lessonIndex !== -1) {
          state.user.completedLessons += 1;
        }
      }
    },
    SET_USER(state, userData) {
      state.user = { ...state.user, ...userData };
    },
    LOGOUT(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.authToken = null;
    }
  },
  actions: {
    login({ commit }, loginData) {
      return new Promise((resolve, reject) => {
        // Simulate API call delay
        setTimeout(() => {
          // Mock validation - in a real app, this would be server-side
          const { identifier, password } = loginData;
          
          // Simulate login failure for certain test cases
          if (identifier === 'fail@test.com' || password === 'wrong') {
            reject(new Error('Invalid credentials. Please try again.'));
            return;
          }
          
          // Create mock user on successful login
          const mockUser = {
            id: Date.now(),
            name: identifier.includes('@') ? identifier.split('@')[0] : identifier,
            email: identifier.includes('@') ? identifier : `${identifier}@example.com`,
            nativeLanguage: 'English',
            learningGoal: 'General Conversation',
            level: 'Beginner (N5-N4)',
            completedLessons: 0,
            totalLessons: 20,
            totalStudyTime: 0,
            currentStreak: 0,
            achievements: [],
            authToken: `mock_login_token_${Date.now()}`
          };
          
          commit('SET_USER', mockUser);
          commit('SET_AUTH_STATUS', { isAuthenticated: true, authToken: mockUser.authToken });
          resolve(mockUser);
        }, 500);
      });
    },
    register({ commit }, registrationData) {
      return new Promise((resolve, reject) => {
        // Simulate API call delay
        setTimeout(() => {
          // Mock validation - in a real app, this would be server-side
          const { email, phone, password, name, nativeLanguage, learningGoal } = registrationData;
          
          // Simulate registration failure for certain test cases
          if (email === 'duplicate@test.com') {
            reject(new Error('Email already registered. Please use a different email.'));
            return;
          }
          
          // Create mock user on successful registration
          const mockUser = {
            id: Date.now(),
            name: name || (email ? email.split('@')[0] : phone),
            email: email,
            phone: phone,
            nativeLanguage: nativeLanguage,
            learningGoal: learningGoal,
            level: 'Beginner (N5-N4)',
            completedLessons: 0,
            totalLessons: 20,
            totalStudyTime: 0,
            currentStreak: 0,
            achievements: [],
            authToken: `mock_register_token_${Date.now()}`
          };
          
          commit('SET_USER', mockUser);
          commit('SET_AUTH_STATUS', { isAuthenticated: true, authToken: mockUser.authToken });
          resolve(mockUser);
        }, 1000);
      });
    },
    async sendMessage({ commit }, { message, userId }) {
      // Add user message to conversation
      const userMessage = {
        id: Date.now(),
        sender: 'user',
        message: message,
        timestamp: new Date(),
        userId: userId
      };
      
      commit('ADD_MESSAGE', userMessage);
      
      // In a real app, this would call the backend API
      // For now, we'll return the user message to simulate the flow
      return userMessage;
    },
    async getAIResponse({ commit }, { userInput, context = '', conversationHistory = [] }) {
      // This would typically call the backend which would then call the AI API
      // For now, we'll return a promise that simulates the API call
      return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
          // In a real implementation, this would be replaced with an actual API call to get AI response
          const mockAIResponse = `This is a simulated response from the AI for your input: "${userInput}". In a real application, this would be generated by the Qwen AI model based on the provided context and conversation history.`;
          resolve(mockAIResponse);
        }, 1000);
      });
    },
    loginSuccess({ commit }, userData) {
      // Directly set user data after successful social login or other auth methods
      const user = {
        ...userData,
        authToken: userData.authToken || `mock_token_${Date.now()}`
      };
      commit('SET_USER', user);
      commit('SET_AUTH_STATUS', { isAuthenticated: true, authToken: user.authToken });
      return Promise.resolve(user);
    },
    logout({ commit }) {
      // Clear user data and authentication status
      commit('LOGOUT');
    },
    addMessage({ commit }, message) {
      commit('ADD_MESSAGE', message);
    },
    completeLesson({ commit }, lessonId) {
      commit('UPDATE_USER_LESSON_PROGRESS', lessonId);
    },
    updateUser({ commit }, userData) {
      commit('SET_USER', userData);
    }
  },
  getters: {
    getUser: state => state.user,
    isAuthenticated: state => state.isAuthenticated,
    getAuthToken: state => state.authToken,
    getLessons: state => state.lessons,
    getConversation: state => state.conversation,
    getLessonById: state => id => {
      return state.lessons.find(lesson => lesson.id === id);
    },
    getUserStats: state => {
      if (!state.user) {
        return {
          completedLessons: 0,
          totalLessons: 20,
          totalStudyTime: 0,
          currentStreak: 0,
          progressPercentage: 0
        };
      }
      const { completedLessons, totalLessons, totalStudyTime, currentStreak } = state.user;
      return {
        completedLessons,
        totalLessons,
        totalStudyTime,
        currentStreak,
        progressPercentage: Math.round((completedLessons / totalLessons) * 100)
      };
    }
  }
})

export default store