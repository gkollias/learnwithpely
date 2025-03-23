<template>
  <div class="landing_wrap">
    <Header />
    <Intro />
    <div
      v-if="hasAccess"
      class="managementTable"
    >
      <div class="row">
        <div class="col-sm-10">
          <h1>Questions Management</h1>
          <hr><br><br>
          <Alert
            v-if="showMessage"
            :message="message"
          />
          <button
            v-b-modal.question-modal
            type="button"
            class="btn btn-success btn-sm"
          >
            Add Question
          </button>
          <br><br>
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">
                  Question
                </th>
                <th scope="col">
                  Category
                </th>
                <th scope="col">
                  Subcategory
                </th>
                <th scope="col">
                  Chapter
                </th>
                <th scope="col">
                  Class
                </th>
                <th scope="col">
                  Answer 1
                </th>
                <th scope="col">
                  Correct?
                </th>
                <th scope="col">
                  Answer 2
                </th>
                <th scope="col">
                  Correct?
                </th>
                <th scope="col">
                  Answer 3
                </th>
                <th scope="col">
                  Correct?
                </th>
                <th scope="col">
                  Image
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(question, index) in questions"
                :key="index"
              >
                <td>{{ question.question }}</td>
                <td>{{ getQuestionCategoryDescription(question.question_category_id) }}</td>
                <td>{{ getQuestionSubcategoryDescription(question.question_subcategory_id) }}</td>
                <td>{{ question.question_chapter }}</td>
                <td>{{ getQuestionClassDescription(question.question_class_id) }}</td>
                <td>{{ getAnswerDescription(question.answer, 0) }}</td>
                <td>
                  <input
                    type="checkbox"
                    disabled
                    :checked="isAnswerCorrect(question.answer, 0)"
                  >
                </td>
                <td>{{ getAnswerDescription(question.answer, 1) }}</td>
                <td>
                  <input
                    type="checkbox"
                    disabled
                    :checked="isAnswerCorrect(question.answer, 1)"
                  >
                </td>
                <td>{{ getAnswerDescription(question.answer, 2) }}</td>
                <td>
                  <input
                    type="checkbox"
                    disabled
                    :checked="isAnswerCorrect(question.answer, 2)"
                  >
                </td>
                <td>
                  <!-- {{ question.image_url }} -->
                  <b-img
                    v-bind="imageProps"
                    :src="question.image_url"
                  />
                  <!-- <div>
                    Icons made by
                    <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a>
                    from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
                  </div> -->
                </td>
                <td>
                  <div
                    class="btn-group"
                    role="group"
                  >
                    <button
                      v-b-modal.question-update-modal
                      type="button"
                      class="btn btn-warning btn-sm"
                      @click="editQuestion(question)"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="onDeleteQuestion(question)"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <b-modal
        id="question-modal"
        ref="addQuestionModal"
        title="Add a new question"
        hide-footer
      >
        <b-form
          class="w-100"
          @submit="onSubmit"
          @reset="onReset"
        >
          <b-form-group
            id="form-question-group"
            label="Question:"
            label-for="form-question-input"
          >
            <b-form-input
              id="form-question-input"
              v-model="addQuestionForm.question"
              type="text"
              required
              placeholder="Enter question"
            />
          </b-form-group>
          <b-form-group
            id="form-question-category-group"
            label="Question Category:"
            label-for="form-question-category-input"
          >
            <b-form-select
              id="form-question-category-input"
              v-model="addQuestionForm.question_category_id"
              required
              placeholder="Enter question category"
            >
              <option
                v-for="qc in questionCategories"
                :key="qc.id"
                :value="qc.id"
              >
                {{ qc.name }}
              </option>
            </b-form-select>
          </b-form-group>
          <b-form-group
            id="form-question-subcategory-group"
            label="Question Subcategory:"
            label-for="form-question-subcategory-input"
          >
            <b-form-select
              id="form-question-subcategory-input"
              v-model="addQuestionForm.question_subcategory_id"
              required
              placeholder="Enter question subcategory"
            >
              <option
                v-for="qs in questionSubcategories"
                :key="qs.id"
                :value="qs.id"
              >
                {{ qs.name }}
              </option>
            </b-form-select>
          </b-form-group>
          <b-form-group
            id="form-chapter-group"
            label="Chapter:"
            label-for="form-chapter-input"
          >
            <b-form-input
              id="form-chapter-input"
              v-model="addQuestionForm.question_chapter"
              type="number"
              required
              placeholder="Enter chapter"
            />
          </b-form-group>
          <b-form-group
            id="form-question-class-group"
            label="Question Class:"
            label-for="form-question-class-input"
          >
            <b-form-select
              id="form-question-class-input"
              v-model="addQuestionForm.question_class_id"
              required
              placeholder="Enter question class"
            >
              <option
                v-for="qt in questionClasses"
                :key="qt.id"
                :value="qt.id"
              >
                {{ qt.name }}
              </option>
            </b-form-select>
          </b-form-group>
          <b-form-group
            id="form-answer-group"
            label="Answer:"
            label-for="form-answer-input"
          >
            <b-form-input
              id="form-answer-input-1"
              v-model="addQuestionForm.answer_1"
              type="text"
              required
              placeholder="Answer 1"
            />
            <b-form-checkbox v-model="addQuestionForm.answer_1_correct">
              Correct?
            </b-form-checkbox>
            <br>
            <b-form-input
              id="form-answer-input-2"
              v-model="addQuestionForm.answer_2"
              type="text"
              required
              placeholder="Answer 2"
            />
            <b-form-checkbox v-model="addQuestionForm.answer_2_correct">
              Correct?
            </b-form-checkbox>
            <br>
            <b-form-input
              id="form-answer-input-3"
              v-model="addQuestionForm.answer_3"
              type="text"
              placeholder="Answer 3"
            />
            <b-form-checkbox v-model="addQuestionForm.answer_3_correct">
              Correct?
            </b-form-checkbox>
            <br>
          </b-form-group>
          <b-form-group
            id="form-image-class-group"
            label="Image URL:"
            label-for="form-image-class-input"
          >
            <b-form-input
              id="form-image-input"
              v-model="addQuestionForm.image_url"
              type="url"
              placeholder="Image URL"
            />
          </b-form-group>
          <b-button-group>
            <b-button
              type="submit"
              variant="primary"
            >
              Submit
            </b-button>
            <b-button
              type="reset"
              variant="danger"
            >
              Reset
            </b-button>
          </b-button-group>
        </b-form>
      </b-modal>
      <b-modal
        id="question-update-modal"
        ref="editQuestionModal"
        title="Update"
        hide-footer
      >
        <b-form
          class="w-100"
          @submit="onSubmitUpdate"
          @reset="onResetUpdate"
        >
          <b-form-group
            id="form-question-group"
            label="Question:"
            label-for="form-question-input"
          >
            <b-form-input
              id="form-question-input"
              v-model="editQuestionForm.question"
              type="text"
              required
              placeholder="Enter question"
            />
          </b-form-group>
          <b-form-group
            id="form-question-category-group"
            label="Question Category:"
            label-for="form-question-category-input"
          >
            <b-form-select
              id="form-question-category-input"
              v-model="editQuestionForm.question_category_id"
              required
              placeholder="Enter question category"
            >
              <option
                v-for="qc in questionCategories"
                :key="qc.id"
                :value="qc.id"
              >
                {{ qc.name }}
              </option>
            </b-form-select>
          </b-form-group>
          <b-form-group
            id="form-question-subcategory-group"
            label="Question Subcategory:"
            label-for="form-question-subcategory-input"
          >
            <b-form-select
              id="form-question-subcategory-input"
              v-model="editQuestionForm.question_subcategory_id"
              required
              placeholder="Enter question subcategory"
            >
              <option
                v-for="qs in questionSubcategories"
                :key="qs.id"
                :value="qs.id"
              >
                {{ qs.name }}
              </option>
            </b-form-select>
          </b-form-group>
          <b-form-group
            id="form-chapter-group"
            label="Chapter:"
            label-for="form-chapter-input"
          >
            <b-form-input
              id="form-chapter-input"
              v-model="editQuestionForm.question_chapter"
              type="number"
              required
              placeholder="Enter chapter"
            />
          </b-form-group>
          <b-form-group
            id="form-question-class-group"
            label="Question Class:"
            label-for="form-question-class-input"
          >
            <b-form-select
              id="form-question-class-input"
              v-model="editQuestionForm.question_class_id"
              required
              placeholder="Enter question class"
            >
              <option
                v-for="qt in questionClasses"
                :key="qt.id"
                :value="qt.id"
              >
                {{ qt.name }}
              </option>
            </b-form-select>
          </b-form-group>
          <b-form-group
            id="form-answer-group"
            label="Answer:"
            label-for="form-answer-input"
          >
            <b-form-input
              id="form-answer-input-1"
              v-model="editQuestionForm.answer_1"
              type="text"
              required
              placeholder="Answer 1"
            />
            <b-form-checkbox v-model="editQuestionForm.answer_1_correct">
              Correct?
            </b-form-checkbox>
            <br>
            <b-form-input
              id="form-answer-input-2"
              v-model="editQuestionForm.answer_2"
              type="text"
              required
              placeholder="Answer 2"
            />
            <b-form-checkbox v-model="editQuestionForm.answer_2_correct">
              Correct?
            </b-form-checkbox>
            <br>
            <b-form-input
              id="form-answer-input-3"
              v-model="editQuestionForm.answer_3"
              type="text"
              placeholder="Answer 3"
            />
            <b-form-checkbox v-model="editQuestionForm.answer_3_correct">
              Correct?
            </b-form-checkbox>
            <br>
          </b-form-group>
          <b-form-group
            id="form-image-class-group"
            label="Image URL:"
            label-for="form-image-class-input"
          >
            <b-form-input
              id="form-image-input"
              v-model="editQuestionForm.image_url"
              type="url"
              placeholder="Image URL"
            />
          </b-form-group>
          <b-button-group>
            <b-button
              type="submit"
              variant="primary"
            >
              Update
            </b-button>
            <b-button
              type="reset"
              variant="danger"
            >
              Cancel
            </b-button>
          </b-button-group>
        </b-form>
      </b-modal>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import axios from 'axios';
import Swal from 'sweetalert2';
import Alert from './Alert.vue';
import Header from './common/Header.vue';
import Footer from './common/Footer.vue';
import Intro from './intros/introCut.vue';

export default {
  metaInfo: {
    bodyAttrs: {
      class: ['landing-gradient-slight-ocean'],
    },
  },
  components: {
    Alert,
    Header,
    Intro,
    Footer,
  },
  data() {
    return {
      questions: [],
      questionCategories: [],
      questionSubcategories: [],
      questionClasses: [],
      addQuestionForm: {
        question: '',
        question_category_id: '',
        question_subcategory_id: '',
        chapter: '',
        class_id: '',
        answers: [],
      },
      message: '',
      hasAccess: false,
      showMessage: false,
      editQuestionForm: {
        id: '',
        question: '',
        question_category_id: '',
        question_subcategory_id: '',
        chapter: '',
        class_id: '',
        answers: [],
      },
      imageProps: {
        width: 75,
        height: 75,
        class: 'imgClass',
      },

    };
  },
  computed: {
    ...mapState(['user']),
  },
  watch: {
    user() {
      this.checkAuthorization(this.user && this.user.email);
    },
  },
  mounted() {
    this.checkAuthorization(this.user && this.user.email);
    this.getQuestionCategories();
    this.getQuestionSubcategories();
    this.getQuestionClasses();
    this.getQuestions();
  },
  updated() {
    this.checkAuthorization(this.user && this.user.email);
  },
  methods: {
    getQuestions() {
      const path = process.env.VUE_APP_API_URL + '/api/questions';
      axios.get(path)
        .then((res) => {
          this.questions = res.data.questions;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    getQuestionCategories() {
      const path = process.env.VUE_APP_API_URL + '/api/questionCategories';
      axios.get(path)
        .then((res) => {
          this.questionCategories = res.data.question_categories;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    getQuestionSubcategories() {
      const path = process.env.VUE_APP_API_URL + '/api/questionSubcategories';
      axios.get(path)
        .then((res) => {
          this.questionSubcategories = res.data.question_subcategories;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    getQuestionClasses() {
      const path = process.env.VUE_APP_API_URL + '/api/questionClasses';
      axios.get(path)
        .then((res) => {
          this.questionClasses = res.data.question_classes;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    getQuestionCategoryDescription(id) {
      const qt = this.questionCategories.find((x) => x.id === id);
      return qt ? qt.name : '';
    },
    getQuestionSubcategoryDescription(id) {
      const qt = this.questionSubcategories.find((x) => x.id === id);
      return qt ? qt.name : '';
    },
    getQuestionClassDescription(id) {
      const qt = this.questionClasses.find((x) => x.id === id);
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
      const path = process.env.VUE_APP_API_URL + '/api/questions';
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
      this.addQuestionForm.question_category_id = '';
      this.addQuestionForm.question_subcategory_id = '';
      this.addQuestionForm.question_chapter = '';
      this.addQuestionForm.question_class_id = '';
      this.addQuestionForm.answer_1 = '';
      this.addQuestionForm.answer_2 = '';
      this.addQuestionForm.answer_3 = '';
      this.addQuestionForm.answer_1_correct = false;
      this.addQuestionForm.answer_2_correct = false;
      this.addQuestionForm.answer_3_correct = false;
      this.addQuestionForm.image_url = '';

      this.editQuestionForm.id = '';
      this.editQuestionForm.question = '';
      this.editQuestionForm.question_category_id = '';
      this.editQuestionForm.question_subcategory_id = '';
      this.editQuestionForm.question_chapter = '';
      this.editQuestionForm.question_class_id = '';
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

      const payload = {
        question: this.addQuestionForm.question,
        question_category_id: this.addQuestionForm.question_category_id,
        question_subcategory_id: this.addQuestionForm.question_subcategory_id,
        question_chapter: this.addQuestionForm.question_chapter,
        question_class_id: this.addQuestionForm.question_class_id,
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

      const payload = {
        question: this.editQuestionForm.question,
        question_category_id: this.editQuestionForm.question_category_id,
        question_subcategory_id: this.editQuestionForm.question_subcategory_id,
        question_chapter: this.editQuestionForm.question_chapter,
        question_class_id: this.editQuestionForm.question_class_id,
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
      const path = process.env.VUE_APP_API_URL + `/api/questions/${questionID}`;
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
      const path = process.env.VUE_APP_API_URL + `/api/questions/${questionID}`;
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
    checkAuthorization(userID) {
      const path = process.env.VUE_APP_API_URL + '/api/managementAuthorization';
      const payload = {
        user_id: userID,
      };
      axios.post(path, payload)
        .then((res) => {
          this.hasAccess = res.data.result;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
  },
};
</script>

<style>
.managementTable {
  margin-left: 40px;
}
</style>
