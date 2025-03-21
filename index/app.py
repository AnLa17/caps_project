from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__, template_folder="index")
app.secret_key = 'geheim_schluessel'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db = SQLAlchemy(app)

# User-Modell
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

@app.route('/')
def home():
    return render_template('/index/index.html')

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    users = users.query.filter_by(username=username).first()
    if User and User.check_password(password):
        session['user_id'] = user.id
        flash('Login erfolgreich!')
        return redirect(url_for('home'))
    flash('Falscher Benutzername oder Passwort.')
    return redirect(url_for('home'))

@app.route('/register', methods=['POST'])
def register():
    username = request.form['username']
    password = request.form['password']

    # Überprüfen, ob der Benutzername bereits existiert
    if User.query.filter_by(username=username).first():
        return "Benutzername existiert bereits!", 400

    # Benutzer erstellen und speichern
    new_user = User(username=username)
    new_user.set_password(password)  # Passwort hashen
    db.session.add(new_user)
    db.session.commit()

    return "Registrierung erfolgreich!", 200




if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)