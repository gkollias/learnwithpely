<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Questions Management</h1>
        <hr><br><br>
        <alert :message=message v-if="showMessage"></alert>
        <button type="button" class="btn btn-success btn-sm" v-b-modal.question-modal>
          Add Question
        </button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Question</th>
              <th scope="col">Type</th>
              <th scope="col">Answer 1</th>
              <th scope="col">Correct?</th>
              <th scope="col">Answer 2</th>
              <th scope="col">Correct?</th>
              <th scope="col">Answer 3</th>
              <th scope="col">Correct?</th>
              <th scope="col">Image</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(question, index) in questions" :key="index">
              <td>{{ question.question }}</td>
              <td>{{ getQuestionTypeDescription(question.question_type_id) }}</td>
              <td>{{ getAnswerDescription(question.answer, 0) }}</td>
              <td><input type="checkbox" disabled :checked="isAnswerCorrect(question.answer, 0)"/></td>
              <td>{{ getAnswerDescription(question.answer, 1) }}</td>
              <td><input type="checkbox" disabled :checked="isAnswerCorrect(question.answer, 1)"/></td>
              <td>{{ getAnswerDescription(question.answer, 2) }}</td>
              <td><input type="checkbox" disabled :checked="isAnswerCorrect(question.answer, 2)"/></td>
              <td>
                {{ question.image_url }}
                <b-img v-bind="imageProps" :src="question.image_url"></b-img>
                <!-- <div>
                  Icons made by
                  <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a>
                  from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
                </div> -->
              </td>
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
        <b-form-group id="form-question-type-group"
                      label="Question Type:"
                      label-for="form-question-type-input">
          <b-form-select
            id="form-question-type-input"
            v-model="addQuestionForm.question_type_id"
            required
            placeholder="Enter question type"
          >
          <option v-for="qt in questionTypes"
            :value="qt.id" :key="qt.id">{{ qt.name }}
            </option>
          </b-form-select>
        </b-form-group>
        <b-form-group id="form-answer-group"
                      label="Answer:"
                      label-for="form-answer-input">
          <b-form-input id="form-answer-input-1"
                        type="text"
                        v-model="addQuestionForm.answer_1"
                        required
                        placeholder="Answer 1">
          </b-form-input>
          <b-form-checkbox v-model="addQuestionForm.answer_1_correct">Correct?</b-form-checkbox>
          <br/>
          <b-form-input id="form-answer-input-2"
                        type="text"
                        v-model="addQuestionForm.answer_2"
                        required
                        placeholder="Answer 2">
          </b-form-input>
          <b-form-checkbox v-model="addQuestionForm.answer_2_correct">Correct?</b-form-checkbox>
          <br/>
          <b-form-input id="form-answer-input-3"
                        type="text"
                        v-model="addQuestionForm.answer_3"
                        placeholder="Answer 3">
          </b-form-input>
          <b-form-checkbox v-model="addQuestionForm.answer_3_correct">Correct?</b-form-checkbox>
          <br/>
          <b-form-input id="form-image-input"
                        type="text"
                        v-model="addQuestionForm.image_url"
                        placeholder="Image URL">
          </b-form-input>
          <br/>
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
      <b-form-group id="form-question-group"
                    label="Question:"
                    label-for="form-question-input">
          <b-form-input id="form-question-input"
                        type="text"
                        v-model="editQuestionForm.question"
                        required
                        placeholder="Enter question">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-question-type-group"
                      label="Question Type:"
                      label-for="form-question-type-input">
          <b-form-select
            id="form-question-type-input"
            v-model="editQuestionForm.question_type_id"
            required
            placeholder="Enter question type"
          >
          <option v-for="qt in questionTypes"
            :value="qt.id" :key="qt.id">{{ qt.name }}
            </option>
          </b-form-select>
        </b-form-group>
        <b-form-group id="form-answer-group"
                      label="Answer:"
                      label-for="form-answer-input">
          <b-form-input id="form-answer-input-1"
                        type="text"
                        v-model="editQuestionForm.answer_1"
                        required
                        placeholder="Answer 1">
          </b-form-input>
          <b-form-checkbox v-model="editQuestionForm.answer_1_correct">Correct?</b-form-checkbox>
          <br/>
          <b-form-input id="form-answer-input-2"
                        type="text"
                        v-model="editQuestionForm.answer_2"
                        required
                        placeholder="Answer 2">
          </b-form-input>
          <b-form-checkbox v-model="editQuestionForm.answer_2_correct">Correct?</b-form-checkbox>
          <br/>
          <b-form-input id="form-answer-input-3"
                        type="text"
                        v-model="editQuestionForm.answer_3"
                        placeholder="Answer 3">
          </b-form-input>
          <b-form-checkbox v-model="editQuestionForm.answer_3_correct">Correct?</b-form-checkbox>
          <br/>
          <b-form-input id="form-image-input"
                        type="text"
                        v-model="editQuestionForm.image_url"
                        placeholder="Image URL">
          </b-form-input>
          <br/>
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
import Swal from 'sweetalert2';
import Alert from './Alert.vue';

export default {
  data() {
    return {
      questions: [],
      questionTypes: [],
      addQuestionForm: {
        question: '',
        question_type_id: '',
        answers: [],
      },
      message: '',
      showMessage: false,
      editQuestionForm: {
        id: '',
        question: '',
        question_type_id: '',
        answers: [],
      },
      imageProps: {
        width: 75,
        height: 75,
        class: 'imgClass',
      },

    };
  },
  components: {
    alert: Alert,
  },
  methods: {
    log(message) {
      // eslint-disable-next-line no-alert
      // alert(message);
      // eslint-disable-next-line no-console
      console.log(message);
    },
    getQuestions() {
      const path = '/api/questions';
      axios.get(path)
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log(res.data.questions);
          this.log(JSON.stringify(res.data));
          this.questions = res.data.questions;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    getQuestionTypes() {
      const path = '/api/questionTypes';
      axios.get(path)
        .then((res) => {
          // eslint-disable-next-line no-console
          this.log(JSON.stringify(res.data));
          this.questionTypes = res.data.question_types;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    getQuestionTypeDescription(id) {
      const qt = this.questionTypes.find(x => x.id === id);
      return qt ? qt.name : '';
    },
    getAnswerDescription(answer, serialNumber) {
      if (!answer) { return ''; }
      const ans = Object.keys(answer)[serialNumber];
      return ans || '';
    },
    isAnswerCorrect(answer, serialNumber) {
      if (!answer) { return ''; }
      const ans = Object.values(answer)[serialNumber];
      return !!ans;
    },
    addQuestion(payload) {
      const path = '/api/questions';
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
      this.addQuestionForm.question_type_id = '';
      this.addQuestionForm.answer_1 = '';
      this.addQuestionForm.answer_2 = '';
      this.addQuestionForm.answer_3 = '';
      this.addQuestionForm.answer_1_correct = false;
      this.addQuestionForm.answer_2_correct = false;
      this.addQuestionForm.answer_3_correct = false;
      this.addQuestionForm.image_url = '';
      
      this.editQuestionForm.id = '';
      this.editQuestionForm.question = '';
      this.editQuestionForm.question_type_id = '';
      this.editQuestionForm.answer_1 = '';
      this.editQuestionForm.answer_2 = '';
      this.editQuestionForm.answer_3 = '';
      this.editQuestionForm.answer_1_correct = false;
      this.editQuestionForm.answer_2_correct = false;
      this.editQuestionForm.answer_3_correct = false;
      this.editQuestionForm.image_url = '';
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addQuestionModal.hide();
      const answer = {
        [this.addQuestionForm.answer_1]: this.addQuestionForm.answer_1_correct
          ? this.addQuestionForm.answer_1_correct : false,
        [this.addQuestionForm.answer_2]: this.addQuestionForm.answer_2_correct
          ? this.addQuestionForm.answer_2_correct : false,
        [this.addQuestionForm.answer_3]: this.addQuestionForm.answer_3_correct
          ? this.addQuestionForm.answer_3_correct : false,
      };
      this.log(answer);

      const payload = {
        question: this.addQuestionForm.question,
        question_type_id: this.addQuestionForm.question_type_id,
        answer,
        image_url: this.addQuestionForm.image_url,
        created_by: 'admin',
        created_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updated_by: '',
        updated_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
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
      this.editQuestionForm = question;
      // eslint-disable-next-line prefer-destructuring
      this.editQuestionForm.answer_1 = Object.keys(question.answer)[0];
      // eslint-disable-next-line prefer-destructuring
      this.editQuestionForm.answer_1_correct = Object.values(question.answer)[0];
      // eslint-disable-next-line prefer-destructuring
      this.editQuestionForm.answer_2 = Object.keys(question.answer)[1];
      // eslint-disable-next-line prefer-destructuring
      this.editQuestionForm.answer_2_correct = Object.values(question.answer)[1];
      // eslint-disable-next-line prefer-destructuring
      this.editQuestionForm.answer_3 = Object.keys(question.answer)[2];
      // eslint-disable-next-line prefer-destructuring
      this.editQuestionForm.answer_3_correct = Object.values(question.answer)[2];
    },
    onSubmitUpdate(evt) {
      evt.preventDefault();
      this.$refs.editQuestionModal.hide();

      const answer = {
        [this.editQuestionForm.answer_1]: this.editQuestionForm.answer_1_correct
          ? this.editQuestionForm.answer_1_correct : false,
        [this.editQuestionForm.answer_2]: this.editQuestionForm.answer_2_correct
          ? this.editQuestionForm.answer_2_correct : false,
        [this.editQuestionForm.answer_3]: this.editQuestionForm.answer_3_correct
          ? this.editQuestionForm.answer_3_correct : false,
      };
      this.log(answer);

      const payload = {
        question: this.editQuestionForm.question,
        question_type_id: this.editQuestionForm.question_type_id,
        answer,
        image_url: this.editQuestionForm.image_url,
        created_by: 'admin',
        created_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updated_by: '',
        updated_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
      };

      this.updateQuestion(payload, this.editQuestionForm.id);
      this.initForm();
    },
    updateQuestion(payload, questionID) {
      const path = `/api/questions/${questionID}`;
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
      const path = `/api/questions/${questionID}`;
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
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.value) {
          this.removeQuestion(question.id);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success',
          );
        }
      });
    },
  },
  created() {
    this.getQuestionTypes();
    this.getQuestions();
  },
};
</script>

<style scoped>
.imgClass {
  background-color:dimgrey;
}
</style>
