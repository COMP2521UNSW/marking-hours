
import functools

from flask import abort, g

from .config import get_admins

def admin_required(view):
	@functools.wraps(view)
	def wrapped_view(**kwargs):
		if g.user not in get_admins():
			abort(403)

		return view(**kwargs)

	return wrapped_view
