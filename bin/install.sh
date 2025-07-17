#!/bin/bash

SRC_DIR="$(realpath "$(dirname "$0")/..")"

########################################################################
# prerequisites

[[ "$USER" == "" ]] && echo "error: environment variable USER not set" && exit 1
[[ "$CLASS" == "" ]] && echo "error: environment variable CLASS not set" && exit 1
[[ "$GIVEPERIOD" == "" ]] && echo "error: environment variable GIVEPERIOD not set" && exit 1

TUTORS_DIR="/web/$USER/$GIVEPERIOD/tutors"
[[ ! -d "$TUTORS_DIR" ]] && echo "error: directory $TUTORS_DIR does not exist" && exit 1

########################################################################

COURSE_CODE="$CLASS"

OUT_DIR="$TUTORS_DIR/marking-hours"

URL_DOMAIN="https://cgi.cse.unsw.edu.au"
URL_PATH="/~$USER/$GIVEPERIOD/tutors/marking-hours"

main()
{
	mkdir -p "$OUT_DIR"

	install_client

	install_api

	chmod o+x "$OUT_DIR"
}

########################################################################
# client

install_client()
{
	TEMP_DIR="$(mktemp -d)"
	cp -r "$SRC_DIR/client/marking-hours" "$TEMP_DIR"

	cd "$TEMP_DIR/marking-hours"

	npm install

	cat <<END_HEREDOC > ".env.production"
NEXT_PUBLIC_COURSE_CODE=$COURSE_CODE
NEXT_PUBLIC_API_URL=$URL_DOMAIN$URL_PATH/api
END_HEREDOC

	sed -i "s|basePath:.*|basePath: '$URL_PATH',|" next.config.ts
	npm run build

	rm -r out/404*
	find out -type f -exec chmod 644 {} \;
	find out -type d -exec chmod 755 {} \;
	cp -pr out/* "$OUT_DIR"

	cd "$SRC_DIR"

	rm -r "$TEMP_DIR"
}

########################################################################
# API

install_api()
{
	API_DIR="$OUT_DIR/api"

	cd "$SRC_DIR/api"

	mkdir -p "$API_DIR"
	chmod o+x "$API_DIR"
	cp -r index.cgi requirements.txt src "$API_DIR"

	cd "$API_DIR"

	python3 -m venv venv
	. venv/bin/activate
	pip3 install -r requirements.txt

	flask --app src setup

	deactivate

	# .htaccess file
	cat <<END_HEREDOC > "$API_DIR/.htaccess"
<IfModule mod_ssl.c>
	SSLRequireSSL

	<IfModule mod_headers.c>
	    Header set WWW-Authenticate "Basic realm=\"CSE Login ($COURSE_CODE Staff Only)\""
	</IfModule>

	AuthType Basic
	AuthName "CSE Login ($COURSE_CODE Staff Only)"

	<IfModule !mod_authz_netgroup.c>
	    AuthYP On
	    Require group @${COURSE_CODE}_Teacher
	    Order allow,deny
	    Allow from all
	</IfModule>
	<IfModule mod_authz_netgroup.c>
	    Require netgroup ${COURSE_CODE}_Teacher
	</IfModule>
</IfModule>

<IfModule !mod_ssl.c>
	RedirectMatch /(.*)$ https://cgi.cse.unsw.edu.au/\$1
</IfModule>

<IfModule !mod_suexec.c>
	AddType application/x-setuid-cgi .py
</IfModule>

<IfModule mod_suexec.c>
	<FilesMatch ".+\.(cgi|py)$">
	    SetHandler cgi-script
	</FilesMatch>
</IfModule>

RewriteEngine On

RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.*)$ ./index.cgi/\$1 [L]
END_HEREDOC

	chmod o+r "$API_DIR/.htaccess"
}

########################################################################

main

