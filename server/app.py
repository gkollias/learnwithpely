import uuid
import os

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow


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

class QuestionType(db.Model):
    __tablename__ = 'question_type'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), unique=True)
    children = db.relationship("Question")

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<Name %r>' % self.name

class QuestionClass(db.Model):
    __tablename__ = 'question_class'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), unique=True)
    children = db.relationship("Question")

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<Name %r>' % self.name

class Question(db.Model):
    __tablename__ = 'question'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question = db.Column(db.String(500), unique=True)
    question_type_id = db.Column(db.Integer, db.ForeignKey('question_type.id'))
    question_class_id = db.Column(db.Integer, db.ForeignKey('question_class.id'))
    answer = db.Column(db.JSON)
    image_url = db.Column(db.String(500))
    created_by = db.Column(db.String(200))
    created_date = db.Column(db.DateTime)
    updated_by = db.Column(db.String(200))
    updated_date = db.Column(db.DateTime)

    def __init__(self, question, question_type_id, question_class_id, answer, image_url, created_by, created_date, updated_by, updated_date):
        self.question = question
        self.question_type_id = question_type_id
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

class QuestionTypeSchema(ma.ModelSchema):
    class Meta:
        model = QuestionType

class QuestionClassSchema(ma.ModelSchema):
    class Meta:
        model = QuestionClass

# sanity check route
@app.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify('pong!')


@app.route('/api/questions', methods=['GET', 'POST'])
def all_questions():
    response_object = {'status': 'success'}
    if request.method == 'POST':
        post_data = request.get_json()
        question = Question(post_data.get('question'), post_data.get('question_type_id'), post_data.get('question_class_id'), post_data.get('answer'), \
            post_data.get('image_url'), post_data.get('created_by'), post_data.get('created_date'), post_data.get('updated_by'), post_data.get('updated_date'))
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
        question.question_type_id = post_data.get('question_type_id')
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

@app.route('/api/questionTypes', methods=['GET'])
def all_question_types():
    response_object = {'status': 'success'}
    question_type_schema = QuestionTypeSchema()
    response_object['question_types'] = question_type_schema.dump(QuestionType.query.all(), many= True)
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
    question_type_schema = QuestionTypeSchema()
    response_object['question_types'] = question_type_schema.dump(QuestionType.query.all(), many= True)
    return jsonify(response_object)

if __name__ == '__main__':
    app.run()