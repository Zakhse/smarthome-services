FROM alpine:3.12

ARG NUT_VERSION=2.7.4

RUN set -ex; \
	# run dependencies
	apk add --no-cache \
		openssh-client \
		libusb-compat \
	; \
	# build dependencies
	apk add --no-cache --virtual .build-deps \
		libusb-compat-dev \
		build-base \
	; \
	# download and extract
	cd /tmp; \
	wget http://www.networkupstools.org/source/2.7/nut-$NUT_VERSION.tar.gz; \
	tar xfz nut-$NUT_VERSION.tar.gz; \
	cd nut-$NUT_VERSION \
	; \
	# build and install
	./configure \
		--sysconfdir=/etc/nut \
		--disable-dependency-tracking \
		--enable-strip \
		--disable-static \
		--with-all=no \
		--with-usb=yes \
	; \
    make install; \
    mkdir -p /var/state/ups; \
	# cleanup
	rm -rf /tmp/nut-$NUT_VERSION.tar.gz /tmp/nut-$NUT_VERSION; \
	apk del .build-deps

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 3493
