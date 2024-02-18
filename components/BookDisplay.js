app.component('book-display', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: 
  /*html*/
  `<div class="book-display">
    <div class="book-container">
      <div class="book-image">
        <img v-bind:src="image">
      </div>
      <div class="book-info">
        <h1>{{ title }}</h1>

        <p v-if="inStock">Copies Available</p>
        <p v-else>No Copies Available</p>

        <p>Shipping: {{ shipping }}</p>

        <div 
        v-for="(book, index) in books" 
        :key="book.id" 
        @mouseover="updateBook(index)" 
        class="book-select">
        <div class="circle"></div>
        <p>{{ book.name }}</p>
      </div>

      <p>Genre: {{ genre }}</p>

        <button 
          class="button" 
          :class="{ disabledButton: !inStock }" 
          :disabled="!inStock" 
          v-on:click="addToCart">
          Place on Hold
        </button>
      </div>
    </div>
    <review-list v-if="reviews.length" :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview"></review-form>
  </div>`,
  data() {
    return {
        product: 'Books',
        brand: 'Fahmid\'s',
        selectedBook: 0,
        premium: true,
        books: [
          { id: 1234, author: 'Paulo Coelho', name: "The Alchemist", genre: 'Drama, Quest, Fantasy Fiction',  image: './assets/images/alchemist.jpg', quantity: 15 },
          { id: 1235, author: 'Paulo Coelho', name: "Aleph", genre: 'Alleogry, Metaphysical, Fantasy Fiction', image: './assets/images/aleph.jpg', quantity: 10 },
          { id: 1236, author: 'Paulo Coelho', name: "The Archer", genre: 'Philosophical, Mystery, Fantasy Fiction', image: './assets/images/archer.jpg', quantity: 5 },
          { id: 1237, author: 'Matt Haig', name: "The Midnight Library", genre: 'Philosophical, Thriller, Fantasy Fiction', image: './assets/images/midnight-library.jpg', quantity: 0 },
        ],
        reviews: []
    }
  },
  methods: {
      addToCart() {
          this.$emit('add-to-cart', this.books[this.selectedBook].id)
      },
      updateBook(index) {
          this.selectedBook = index
      },
      addReview(review) {
        this.reviews.push(review)
      }
  },
  computed: {
      title() {
          return this.brand + ' ' + this.product
      },
      image() {
          return this.books[this.selectedBook].image
      },
      inStock() {
          return this.books[this.selectedBook].quantity
      },
      shipping() {
        if (this.premium) {
          return 'Free'
        }
        return 2.99
      },
      genre() {
        return this.books[this.selectedBook].genre
      }
  }
})