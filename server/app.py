import uuid
import os

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from datetime import datetime
from itertools import chain


# configuration
DEBUG = True

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
db = SQLAlchemy(app)
ma = Marshmallow(app)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

class Question(db.Model):
    __tablename__ = 'question'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question = db.Column(db.String(500), unique=True)
    question_category_id = db.Column(db.Integer, db.ForeignKey('question_category.id'))
    question_subcategory_id = db.Column(db.Integer, db.ForeignKey('question_subcategory.id'))
    question_chapter = db.Column(db.Integer)
    question_class_id = db.Column(db.Integer, db.ForeignKey('question_class.id'))
    answer = db.Column(db.JSON)
    image_url = db.Column(db.String(500))
    created_by = db.Column(db.String(200))
    created_date = db.Column(db.DateTime)
    updated_by = db.Column(db.String(200))
    updated_date = db.Column(db.DateTime)

    def __init__(self, question, question_category_id, question_subcategory_id, question_chapter, question_class_id, answer, image_url, created_by, created_date, updated_by, updated_date):
        self.question = question
        self.question_category_id = question_category_id
        self.question_subcategory_id = question_subcategory_id
        self.question_chapter = question_chapter
        self.question_class_id = question_class_id
        self.answer = answer
        self.image_url = image_url
        self.created_by = created_by
        self.created_date = created_date
        self.updated_by = updated_by
        self.updated_date = updated_date

    def __repr__(self):
        return '<Question %r>' % self.question

class QuestionSchema(ma.ModelSchema):
    class Meta:
        model = Question
        include_fk = True


class QuestionCategory(db.Model):
    __tablename__ = 'question_category'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), unique=True)
    children = db.relationship("Question")

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<Name %r>' % self.name

class QuestionCategorySchema(ma.ModelSchema):
    class Meta:
        model = QuestionCategory

class QuestionSubcategory(db.Model):
    __tablename__ = 'question_subcategory'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), unique=True)
    question_category_id = db.Column(db.Integer, db.ForeignKey('question_category.id'))

    children = db.relationship("QuestionCategory")

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<Name %r>' % self.name

class QuestionSubcategorySchema(ma.ModelSchema):
    class Meta:
        model = QuestionSubcategory

class QuestionClass(db.Model):
    __tablename__ = 'question_class'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), unique=True)
    children = db.relationship("Question")

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<Name %r>' % self.name

class QuestionClassSchema(ma.ModelSchema):
    class Meta:
        model = QuestionClass

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), unique=True)
    email = db.Column(db.String(100), unique=True)
    created_by = db.Column(db.String(200))
    created_date = db.Column(db.DateTime)
    updated_by = db.Column(db.String(200))
    updated_date = db.Column(db.DateTime)

    def __init__(self, name, email, created_by, created_date, updated_by, updated_date):
        self.name = name
        self.email = email
        self.created_by = created_by
        self.created_date = created_date
        self.updated_by = updated_by
        self.updated_date = updated_date

    def __repr__(self):
        return '<Name %r>' % self.name

class UserSchema(ma.ModelSchema):
    class Meta:
        model = User

class UserScore(db.Model):
    __tablename__ = 'user_score'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    score = db.Column(db.Integer)
    updated_by = db.Column(db.String(200))
    updated_date = db.Column(db.DateTime)

    def __init__(self, user_id, score, updated_by, updated_date):
        self.user_id = user_id
        self.score = score

        self.updated_by = updated_by
        self.updated_date = updated_date

    def __repr__(self):
        return '<user_id %r>' % self.user_id

class UserScoreSchema(ma.ModelSchema):
    class Meta:
        model = UserScore


class UserQuestionAnswered(db.Model):
    __tablename__ = 'user_question_answered'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'), primary_key=True)
    times_answered = db.Column(db.Integer)
    times_correct = db.Column(db.Integer)

    created_by = db.Column(db.String(200))
    created_date = db.Column(db.DateTime)
    updated_by = db.Column(db.String(200))
    updated_date = db.Column(db.DateTime)

    def __init__(self, user_id, question_id, times_answered, times_correct, created_by, created_date, updated_by, updated_date):
        self.user_id = user_id
        self.question_id = question_id
        self.times_answered = times_answered
        self.times_correct = times_correct

        self.created_by = created_by
        self.created_date = created_date
        self.updated_by = updated_by
        self.updated_date = updated_date

    def __repr__(self):
        return '<user_id %r>' % self.user_id

class UserQuestionAnsweredSchema(ma.ModelSchema):
    class Meta:
        model = UserQuestionAnswered


@app.route('/api/questions', methods=['GET', 'POST'])
def all_questions():
    response_object = {'status': 'success'}
    if request.method == 'POST':
        post_data = request.get_json()
        question = Question(post_data.get('question'), post_data.get('question_category_id'), post_data.get('question_subcategory_id'),\
                            post_data.get('question_chapter'), post_data.get('question_class_id'), post_data.get('answer'), \
                            post_data.get('image_url'), post_data.get('created_by'), post_data.get('created_date'), post_data.get('updated_by'), \
                            post_data.get('updated_date'))
        db.session.add(question)
        db.session.commit()
        response_object['message'] = 'Question added!'
    else:
        question_schema = QuestionSchema()
        response_object['questions'] = question_schema.dump(Question.query.all(), many= True)
    return jsonify(response_object)

@app.route('/api/questions/<question_id>', methods=['GET', 'PUT', 'DELETE'])
def single_question(question_id):
    response_object = {'status': 'success'}
    question = Question.query.get(question_id)
    if question == None:
        response_object['message'] = 'Question does not exist!'
        return jsonify(response_object)
    if request.method == 'GET':
        question_schema = QuestionSchema()
        response_object['questions'] = question_schema.dump(question)
    if request.method == 'PUT':
        post_data = request.get_json()
        question.question = post_data.get('question')
        question.question_category_id = post_data.get('question_category_id')
        question.question_subcategory_id = post_data.get('question_subcategory_id')
        question.question_chapter = post_data.get('question_chapter')
        question.question_class_id = post_data.get('question_class_id')
        question.answer = post_data.get('answer')
        question.image_url = post_data.get('image_url')
        question.updated_by = post_data.get('updated_by')
        question.updated_date = post_data.get('updated_date')

        db.session.commit()
        response_object['message'] = 'Question updated!'
    if request.method == 'DELETE':
        db.session.delete(question)
        db.session.commit()
        response_object['message'] = 'Question removed!'
    return jsonify(response_object)

@app.route('/api/questions/category/<category_id>', methods=['GET'])
def questions_by_category(category_id):
    response_object = {'status': 'success'}
    questions = Question.query.filter_by(question_category_id=category_id).all()
    if questions == None:
        response_object['message'] = 'Category does not exist!'
        return jsonify(response_object)
    if request.method == 'GET':
        question_schema = QuestionSchema()
        response_object['questions'] = question_schema.dump(questions, many=True)
    return jsonify(response_object)

@app.route('/api/questions/subcategory/<subcategory_id>', methods=['GET'])
def questions_by_subcategory(subcategory_id):
    response_object = {'status': 'success'}
    questions = Question.query.filter_by(question_subcategory_id=subcategory_id).all()
    if questions == None:
        response_object['message'] = 'subCategory does not exist!'
        return jsonify(response_object)
    if request.method == 'GET':
        question_schema = QuestionSchema()
        response_object['questions'] = question_schema.dump(questions, many=True)
    return jsonify(response_object)

@app.route('/api/questions/class/<class_id>', methods=['GET'])
def questions_by_class(class_id):
    response_object = {'status': 'success'}
    questions = Question.query.filter_by(question_class_id=class_id).all()
    if questions == None:
        response_object['message'] = 'class does not exist!'
        return jsonify(response_object)
    if request.method == 'GET':
        question_schema = QuestionSchema()
        response_object['questions'] = question_schema.dump(questions, many=True)
    return jsonify(response_object)

@app.route('/api/questions/filter', methods=['POST'])
def questions_filter():
    response_object = {'status': 'success'}
    post_data = request.get_json()
    class_id = post_data.get('class_id')
    category_id = post_data.get('category_id')
    subcategory_id = post_data.get('subcategory_id')
    chapter_id = post_data.get('chapter_id')
    if class_id != None:
        questions = set(Question.query.filter_by(question_class_id=class_id).all())
    if category_id != None:
        q_category = set(Question.query.filter_by(question_category_id=category_id).all())
        if questions != None:
            questions = questions.intersection(q_category)
        else:
            questions = q_category
    if subcategory_id != None:
        q_subcategory = set(Question.query.filter_by(question_subcategory_id=subcategory_id).all())
        if questions != None:
            questions = questions.intersection(q_subcategory)
        else:
            questions = q_subcategory

    if chapter_id != None:
        q_chapter = set(Question.query.filter_by(question_chapter=chapter_id).all())
        if questions != None:
            questions = questions.intersection(q_chapter)
        else:
            questions = q_chapter

    if questions == None:
        response_object['message'] = 'class,category,subcategory does not exist!'
        return jsonify(response_object)

    question_schema = QuestionSchema()
    response_object['questions'] = question_schema.dump(questions, many=True)
    return jsonify(response_object)


@app.route('/api/questionCategories', methods=['GET'])
def all_question_categories():
    response_object = {'status': 'success'}
    question_category_schema = QuestionCategorySchema()
    response_object['question_categories'] = question_category_schema.dump(QuestionCategory.query.all(), many= True)
    return jsonify(response_object)

@app.route('/api/questionSubcategories', methods=['GET'])
def all_question_subcategories():
    response_object = {'status': 'success'}
    question_subcategory_schema = QuestionSubcategorySchema()
    response_object['question_subcategories'] = question_subcategory_schema.dump(QuestionSubcategory.query.all(), many= True)
    return jsonify(response_object)

@app.route('/api/questionSubcategories/<question_category_id>', methods=['GET'])
def category_question_subcategories(question_category_id):
    response_object = {'status': 'success'}
    question_subcategory_schema = QuestionSubcategorySchema()
    response_object['question_subcategories'] = question_subcategory_schema.dump(QuestionSubcategory.query.filter_by(question_category_id=question_category_id).all(), many= True)
    return jsonify(response_object)

@app.route('/api/questionChapters/<category_id>/<subcategory_id>', methods=['GET'])
def category_subcategory_question_chapters(category_id, subcategory_id):
    response_object = {'status': 'success'}
    chapters = []
    for q in Question.query.filter_by(question_category_id=category_id).filter_by(question_subcategory_id=subcategory_id).distinct(Question.question_chapter):
        chapters.append(q.question_chapter)

    response_object['question_chapters'] = chapters

    return jsonify(response_object)

@app.route('/api/questionClasses', methods=['GET'])
def all_question_classes():
    response_object = {'status': 'success'}
    question_class_schema = QuestionClassSchema()
    response_object['question_classes'] = question_class_schema.dump(QuestionClass.query.all(), many= True)
    return jsonify(response_object)

@app.route('/auth/login', methods=['POST'])
def login():
    response_object = {'status': 'success'}
    question_categories_schema = QuestionCategorySchema()
    response_object['question_categories'] = question_categories_schema.dump(QuestionCategory.query.all(), many= True)
    return jsonify(response_object)

@app.route('/api/managementAuthorization', methods=['POST'])
def questionsManagement():
    post_data = request.get_json()
    user_id = post_data.get('user_id')

    authorized_users = ['gkollias13@gmail.com', 'pelagiakorre@gmail.com']
    auth = False
    if user_id in authorized_users:
        auth = True
    response_object = {'result':  auth}
    return jsonify(response_object)

@app.route('/api/user/info', methods=['POST'])
def user():
    response_object = {'status': 'success'}
    post_data = request.get_json()

    email = post_data.get('email')
    name = post_data.get('name')
    now = datetime.now()

    user_schema = UserSchema()
    user_info = user_schema.dump(User.query.filter_by(email=email).first())

    if user_info == {}:
        user_info = User(name, email, 'dbo', now, 'dbo', now)
        db.session.add(user_info)
        db.session.commit()
        response_object['message_user'] = 'User added!'
        user_info = user_schema.dump(user_info)


    user_score_schema = UserScoreSchema()
    user_score = user_score_schema.dump(UserScore.query.filter_by(user_id=user_info['id']).first())
    if user_score == {}:
        user_score = UserScore(user_info['id'], 0, 'dbo', now)
        db.session.add(user_score)
        db.session.commit()
        response_object['message_score'] = 'User score added!'
        user_score = user_score_schema.dump(user_score)

    response_object['user_info'] = user_info
    response_object['user_score'] = user_score['score']

    return jsonify(response_object)

@app.route('/api/user/score/increment', methods=['PUT'])
def score_increment():
    response_object = {'status': 'success'}
    post_data = request.get_json()

    score_increment = post_data.get('score_increment')
    user_id = post_data.get('user_id')
    now = datetime.now()

    user_score = UserScore.query.get(user_id)
    if user_score != {}:
        user_score.score += score_increment
        user_score.updated_date = now
        db.session.commit()
        response_object['message_score'] = 'User score updated!'
        response_object['score'] = user_score.score

    return jsonify(response_object)

@app.route('/api/user/questions/answered/<user_id>', methods=['GET'])
def questions_answered(user_id):
    response_object = {'status': 'success'}
    user_question_answered_schema = UserQuestionAnsweredSchema()
    response_object['questions_answered'] = user_question_answered_schema.dump(UserQuestionAnswered.query.filter_by(user_id=user_id).all(), many= True)

    return jsonify(response_object)

@app.route('/api/user/questions/answered/<user_id>/<question_id>', methods=['GET'])
def question_answered(user_id, question_id):
    response_object = {'status': 'success'}
    user_question_answered_schema = UserQuestionAnsweredSchema()
    response_object['questions_answered'] = user_question_answered_schema.dump(UserQuestionAnswered.query.filter_by(user_id=user_id).filter_by(question_id=question_id).all(), many= True)

    return jsonify(response_object)

@app.route('/api/user/questions/answered/add', methods=['POST'])
def questions_answered_add():
    response_object = {'status': 'success'}
    post_data = request.get_json()
    times_correct = 0
    user_id = post_data.get('user_id')
    question_id = post_data.get('question_id')
    now = datetime.now()

    question_answered = UserQuestionAnswered.query.filter_by(user_id=user_id, question_id=question_id).first()

    if question_answered != {} and question_answered != None:
        question_answered.times_correct += 1 if post_data.get('is_correct') == True else 0
        question_answered.times_answered += 1
        question_answered.updated_date = now
        db.session.commit()
        response_object['message'] = 'Question answered updated!'
    else:    
        times_correct = 1 if post_data.get('is_correct') == True else 0
        times_answered = 1
        question_answered = UserQuestionAnswered(user_id, question_id, times_answered, times_correct, 'dbo', now, 'dbo', now)
        db.session.add(question_answered)
        db.session.commit()
        response_object['message'] = 'Question answered added!'

    return jsonify(response_object)


if __name__ == '__main__':
    app.run()