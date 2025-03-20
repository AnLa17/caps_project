from flask import Flask, request, render_template, redirect, url_for, session, flash
from db import db, User

app = Flask(__name__)
app.secret_key = 'dein_geheimes_schlüssel'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///shop.db'
db.init_app(app)

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        session['user_id'] = user.id
        flash('Login erfolgreich!')
        return redirect(url_for('shop'))
    flash('Ungültiger Benutzername oder Passwort!')
    return redirect(request.referrer)

@app.route('/register', methods=['POST'])
def register():
    username = request.form['username']
    password = request.form['password']
    if User.query.filter_by(username=username).first():
        flash('Benutzername existiert bereits!')
        return redirect(request.referrer)
    new_user = User(username=username)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
    flash('Registrierung erfolgreich!')
    return redirect(url_for('login'))


@app.route('/logout')
def logout():
    session.pop('user_id', None)
    flash('Erfolgreich ausgeloggt!')
    return redirect(url_for('login'))


@app.route('/shop')
def shop():
    user_id = session.get('user_id')
    if user_id:
        user = User.query.get(user_id)
        return f"<h1>Willkommen, {user.username}!</h1><p>Das ist dein Shop-Bereich.</p><a href='/logout'>Logout</a>"
    return "<h1>Du bist nicht eingeloggt.</h1><p>Bitte <a href='/login'>einloggen</a>.</p>"


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
