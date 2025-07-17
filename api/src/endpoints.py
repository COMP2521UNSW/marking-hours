
from collections import UserDict

from flask import abort, Blueprint, g, jsonify, request

from .auth import admin_required
from .db import get_db
from .config import get_assessments, get_tutors

bp = Blueprint('hours', __name__)

########################################################################

@bp.get('/assessments')
def get_assessments_endpoint():
	assessments = get_assessments()

	return jsonify(assessments)

########################################################################

@bp.get('/hours')
def get_hours_endpoint():
	return jsonify(get_entries(g.user))

def get_entries(zid):
	db = get_db()

	res = db.execute('''
		SELECT assessment_id, hours
		FROM (
			SELECT assessment_id, hours
			FROM Submissions
			WHERE zid = ?
			GROUP BY assessment_id
			HAVING timestamp = MAX(timestamp)
		)
		WHERE hours > 0
	''', [zid]).fetchall()

	assessment_map = get_assessment_map()

	return list(map(
		lambda row: {
			'assessment': assessment_map[row['assessment_id']],
			'hours': row['hours'],
		}, res
	))

########################################################################

@bp.post('/hours')
def post_hours_endpoint():
	db = get_db()

	data = request.json

	zid = g.user
	assessment_id = data.get('assessmentId')
	hours = data.get('hours')
	note = data.get('note')

	if not validate_post_hours(assessment_id, hours, note):
		abort(400)

	db.execute('''
		INSERT INTO Submissions(zid, assessment_id, hours, note)
		VALUES (?, ?, ?, ?)
	''', [zid, assessment_id, hours, note])

	db.commit()

	return '', 200

def validate_post_hours(assessment_id, hours, note):
	assessment_map = get_assessment_map()

	if assessment_id not in assessment_map:
		return False

	if not isinstance(hours, (int, float)) or hours < 0:
		return False

	if not isinstance(note, str) or len(note) > 256:
		return False

	return True

########################################################################

@bp.get('/hours/submissions')
@admin_required
def get_hours_submissions_endpoint():
	db = get_db()

	res = db.execute('''
		SELECT zid, assessment_id, hours, note, timestamp
		FROM Submissions
		ORDER BY timestamp
	''').fetchall()

	tutor_map = get_tutor_map()
	assessment_map = get_assessment_map()

	return jsonify(list(map(
		lambda row: {
			'marker': tutor_map[row['zid']],
			'assessment': assessment_map[row['assessment_id']],
			'hours': row['hours'],
			'note': row['note'],
			'timestamp': row['timestamp'].isoformat() + 'Z',
		}, res
	)))

########################################################################

class KeyDefaultDict(UserDict):
	def __init__(self, default_factory, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.default_factory = default_factory

	def __missing__(self, key):
		return self.default_factory(key)

def get_assessment_map():
	assessments = get_assessments()
	return KeyDefaultDict(lambda id: {'id': id, 'name': 'Unknown'},
			{a['id']: a for a in assessments})

def get_tutor_map():
	tutors = get_tutors()
	return KeyDefaultDict(lambda zid: {'zid': zid, 'name': 'Unknown'},
			{t['zid']: t for t in tutors})

########################################################################
