FROM debian:buster-slim

RUN apt-get update && \
    apt-get install -y curl gpg polipo haproxy ruby-full netcat

RUN echo 'deb https://deb.torproject.org/torproject.org buster main' | tee -a /etc/apt/sources.list
RUN echo 'deb-src https://deb.torproject.org/torproject.org buster main' | tee -a /etc/apt/sources.list
RUN curl https://deb.torproject.org/torproject.org/A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89.asc | gpg --import
RUN gpg --export A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89 | apt-key add -

RUN apt-get update && \
    apt-get install -y tor deb.torproject.org-keyring

RUN update-rc.d -f tor remove
RUN update-rc.d -f polipo remove

RUN gem install excon -v 0.76.0

ADD start.rb /usr/local/bin/start.rb
RUN chmod +x /usr/local/bin/start.rb

ADD newnym.sh /usr/local/bin/newnym.sh
RUN chmod +x /usr/local/bin/newnym.sh

ADD haproxy.cfg.erb /usr/local/etc/haproxy.cfg.erb
ADD uncachable /etc/polipo/uncachable

EXPOSE 5566 4444

CMD /usr/local/bin/start.rb
