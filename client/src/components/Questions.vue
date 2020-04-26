<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Questions test hot reload15</h1>
        <hr><br><br>
        <alert :message=message v-if="showMessage"></alert>
        <button type="button" class="btn btn-success btn-sm" v-b-modal.question-modal>Add Question</button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Question</th>
              <th scope="col">Type</th>
              <th scope="col">Answer</th>
              <th scope="col">Image</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(question, index) in questions" :key="index">
              <td>{{ question.question }}</td>
              <td>{{ question.question_type }}</td>
              <td>{{ question.answer }}</td>
              <td>{{ question.image_url }}</td>
              <td>
                <div class="btn-group" role="group">
                  <button
                          type="button"
                          class="btn btn-warning btn-sm"
                          v-b-modal.question-update-modal
                          @click="editQuestion(question)">
                      Update
                  </button>
                  <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          @click="onDeleteQuestion(question)">
                      Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <b-modal ref="addQuestionModal"
            id="question-modal"
            title="Add a new question"
            hide-footer>
      <b-form @submit="onSubmit" @reset="onReset" class="w-100">
      <b-form-group id="form-question-group"
                    label="Question:"
                    label-for="form-question-input">
          <b-form-input id="form-question-input"
                        type="text"
                        v-model="addQuestionForm.question"
                        required
                        placeholder="Enter question">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-qyestion-type-group"
                      label="Author:"
                      label-for="form-qyestion-type-input">
            <b-form-input id="form-qyestion-type-input"
                          type="text"
                          v-model="addQuestionForm.qyestion_type"
                          required
                          placeholder="Enter qyestion_type">
            </b-form-input>
          </b-form-group>
        <b-form-group id="form-answer-group">
          <b-form-checkbox-group v-model="addQuestionForm.answer" id="form-checks">
            <b-form-checkbox value="true">Read?</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-button-group>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-button-group>
      </b-form>
    </b-modal>
    <b-modal ref="editQuestionModal"
            id="question-update-modal"
            title="Update"
            hide-footer>
      <b-form @submit="onSubmitUpdate" @reset="onResetUpdate" class="w-100">
      <b-form-group id="form-question-edit-group"
                    label="Question:"
                    label-for="form-question-edit-input">
          <b-form-input id="form-question-edit-input"
                        type="text"
                        v-model="editForm.question"
                        required
                        placeholder="Enter question">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-type-edit-group"
                      label="Question Type:"
                      label-for="form-type-edit-input">
            <b-form-input id="form-type-edit-input"
                          type="text"
                          v-model="editForm.question_type"
                          required
                          placeholder="Enter question type">
            </b-form-input>
        </b-form-group>
        <b-form-group id="form-answer-edit-group"
                      label="Answer:"
                      label-for="form-answer-edit-input">
            <b-form-input id="form-answer-edit-input"
                          type="text"
                          v-model="editForm.answer"
                          required
                          placeholder="Enter answer">
            </b-form-input>
        </b-form-group>
        <b-button-group>
          <b-button type="submit" variant="primary">Update</b-button>
          <b-button type="reset" variant="danger">Cancel</b-button>
        </b-button-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import Alert from './Alert.vue';

export default {
  data() {
    return {
      questions: [],
      addQuestionForm: {
        question: '',
        question_type: '',
        answer: [],
      },
      message: '',
      showMessage: false,
      editForm: {
        id: '',
        question: '',
        question_type: '',
        answer: [],
      },
    };
  },
  components: {
    alert: Alert,
  },
  methods: {
    getQuestions() {
      const path = '/questions';
      axios.get(path)
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log(res.data.questions);
          this.questions = res.data.questions;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    addQuestion(payload) {
      const path = '/questions';
      axios.post(path, payload)
        .then(() => {
          this.getQuestions();
          this.message = 'Question added!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.getQuestions();
        });
    },
    initForm() {
      this.addQuestionForm.question = '';
      this.addQuestionForm.qyestion_type = '';
      this.addQuestionForm.answer = [];
      this.editForm.id = '';
      this.editForm.question = '';
      this.editForm.qyestion_type = '';
      this.editForm.answer = [];
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addQuestionModal.hide();
      let answer = false;
      if (this.addQuestionForm.answer[0]) answer = true;
      const payload = {
        question: this.addQuestionForm.question,
        qyestion_type: this.addQuestionForm.qyestion_type,
        answer, // property shorthand
      };
      this.addQuestion(payload);
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addQuestionModal.hide();
      this.initForm();
    },
    editQuestion(question) {
      this.editForm = question;
    },
    onSubmitUpdate(evt) {
      evt.preventDefault();
      this.$refs.editQuestionModal.hide();
      let answer = false;
      if (this.editForm.answer[0]) answer = true;
      const payload = {
        question: this.editForm.question,
        qyestion_type: this.editForm.qyestion_type,
        answer,
      };
      this.updateQuestion(payload, this.editForm.id);
    },
    updateQuestion(payload, questionID) {
      const path = `/questions/${questionID}`;
      axios.put(path, payload)
        .then(() => {
          this.getQuestions();
          this.message = 'Question updated!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
          this.getQuestions();
        });
    },
    onResetUpdate(evt) {
      evt.preventDefault();
      this.$refs.editQuestionModal.hide();
      this.initForm();
      this.getQuestions(); // why?
    },
    removeQuestion(questionID) {
      const path = `/questions/${questionID}`;
      axios.delete(path)
        .then(() => {
          this.getQuestions();
          this.message = 'Question removed!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
          this.getQuestions();
        });
    },
    onDeleteQuestion(question) {
      this.removeQuestion(question.id);
    },
  },
  created() {
    this.getQuestions();
  },
};
</script>
