<template>
    <div v-if="isVisible" class="modal-overlay">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Book Form</h5>
                <button type="button" class="close" @click="closeModal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="bookTitle">Title</label>
                    <input v-model="currentBook.title" type="text" class="form-control" id="bookTitle"
                        placeholder="Enter book title" required />
                </div>
                <div class="form-group">
                    <label for="bookAuthor">Author</label>
                    <input v-model="currentBook.author" type="text" class="form-control" id="bookAuthor"
                        placeholder="Enter author name" required />
                </div>
                <div class="form-group">
                    <label for="bookPublishedDate">Publish Date</label>
                    <input v-model="currentBook.published_date" type="date" class="form-control" id="bookPublishedDate"
                        required />
                </div>
                <div class="form-group">
                    <label for="bookDescription">Description</label>
                    <textarea v-model="currentBook.description" class="form-control" id="bookDescription"
                        placeholder="Enter book description" required></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                <button type="button" class="btn btn-primary" @click="saveBook">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isVisible: Boolean,
        book: Object,
    },
    data() {
        return {
            currentBook: { id: null, title: '', description: '', author: '', published_date: '' },
        };
    },
    watch: {
        book: {
            immediate: true,
            handler(newBook) {
                this.currentBook = { ...newBook };
            },
        },
    },
    methods: {
        saveBook() {
            this.$emit('save', this.currentBook);
            this.closeModal();
        },
        closeModal() {
            this.$emit('close');
        },
    },
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    /* Dark background */
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.3s ease-in-out;
}

.modal-content {
    background: rgba(44, 62, 80, 0.6);
    /* Glassmorphism background */
    padding: 20px;
    border-radius: 12px;
    width: 500px;
    border: 4px solid transparent;
    /* Thicker border */
    position: relative;
    backdrop-filter: blur(10px);
    /* Glassmorphism blur */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
    transition: all 0.4s ease;
}

.modal-content:focus-within {
    border-color: #3498db;
    /* Border color on focus */
    box-shadow: 0px 4px 15px rgba(52, 152, 219, 0.3);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.modal-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
    /* White title text */
}

.close {
    font-size: 1.5rem;
    color: white;
    background: none;
    border: none;
    cursor: pointer;
}

.close:hover {
    color: #e74c3c;
}

.form-group {
    margin-bottom: 20px;
}

label {
    font-size: 1rem;
    margin-bottom: 5px;
    color: #ecf0f1;
    /* Lighter color for text */
}

input.form-control,
textarea.form-control {
    width: 100%;
    padding: 12px;
    font-size: 1rem;
    border-radius: 6px;
    border: 1px solid #7f8c8d;
    background-color: #34495e;
    /* Dark input background */
    color: white;
    /* White text in inputs */
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input.form-control:focus,
textarea.form-control:focus {
    border-color: #3498db;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.3);
}

textarea.form-control {
    resize: vertical;
    height: 120px;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}

button.btn {
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 6px;
    transition: background-color 0.3s ease;
}

button.btn-secondary {
    background-color: #7f8c8d;
    color: white;
    border: none;
    margin-right: 10px;
    /* Spacing between buttons */
}

button.btn-secondary:hover {
    background-color: #95a5a6;
}

button.btn-primary {
    background-color: #3498db;
    color: white;
    border: none;
}

button.btn-primary:hover {
    background-color: #2980b9;
}

input.form-control::placeholder,
textarea.form-control::placeholder {
    color: white;
    opacity: 0.7;
    /* Adjust opacity if needed */
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>