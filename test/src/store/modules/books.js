// books.js (Vuex module)

import axios from "axios";

export default {
  namespaced: true, // Enable namespacing
  state: {
    books: JSON.parse(localStorage.getItem("books")) || [],
  },
  getters: {
    getBooks: (state) => state.books,
    getBookById: (state) => (id) => state.books.find((book) => book.id === id),
  },
  mutations: {
    SET_BOOKS(state, books) {
      state.books = books;
      localStorage.setItem("books", JSON.stringify(state.books));
    },
    ADD_BOOK(state, book) {
      state.books.push(book);
      localStorage.setItem("books", JSON.stringify(state.books));
    },
    UPDATE_BOOK(state, updatedBook) {
      const index = state.books.findIndex((book) => book.id === updatedBook.id);
      if (index !== -1) {
        state.books[index] = updatedBook;
        localStorage.setItem("books", JSON.stringify(state.books));
      }
    },
    DELETE_BOOK(state, bookId) {
      state.books = state.books.filter((book) => book.id !== bookId);
      localStorage.setItem("books", JSON.stringify(state.books));
    },
  },
  actions: {
    fetchBooks({ commit }) {
      axios.get("http://127.0.0.1:8000/api/books/")
        .then((response) => {
          commit("SET_BOOKS", response.data);
        })
        .catch((error) => {
          console.error("Error fetching books:", error);
        });
    },
    addBook({ commit }, book) {
      axios.post("http://127.0.0.1:8000/api/books/", book)
        .then((response) => {
          commit("ADD_BOOK", response.data);
        })
        .catch((error) => {
          console.error("Error adding book:", error);
        });
    },
    updateBook({ commit }, updatedBook) {
      axios.put(`http://127.0.0.1:8000/api/books/${updatedBook.id}/`, updatedBook)
        .then((response) => {
          commit("UPDATE_BOOK", response.data);
        })
        .catch((error) => {
          console.error("Error updating book:", error);
        });
    },
    deleteBook({ commit }, bookId) {
      axios.delete(`http://127.0.0.1:8000/api/books/${bookId}/`)
        .then(() => {
          commit("DELETE_BOOK", bookId);
        })
        .catch((error) => {
          console.error("Error deleting book:", error);
        });
    },
  },
};
