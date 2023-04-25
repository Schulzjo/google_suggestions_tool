docker-rotating-proxy
=====================
"IP-Switching Proxy Server" by using Tor-Network.
You can find the original source of this rotating proxy on [github](https://github.com/mattes/rotating-proxy).
Where possible the components got updated to up to date elements.

```
               Docker Container
               -------------------------------------
                        <-> Polipo 1 <-> Tor Proxy 1
Client <---->  HAproxy  <-> Polipo 2 <-> Tor Proxy 2
                        <-> Polipo n <-> Tor Proxy n
```

__Why:__ Lots of IP addresses. One single endpoint for your client.
Load-balancing by HAproxy.

Usage
-----

```bash
# build docker container for test
docker build -t rproxy .

# start docker container
docker run -d -p 5566:5566 -p 4444:4444 --env tors=25 rproxy

# test with ...
curl --proxy 127.0.0.1:5566 http://eth0.me/

# monitor
http://127.0.0.1:4444/haproxy?stats
```


Further Readings
----------------

 * [Tor Manual](https://www.torproject.org/docs/tor-manual.html.en)
 * [HAProxy Manual](http://cbonte.github.io/haproxy-dconv/)
 * [Polipo](http://www.pps.univ-paris-diderot.fr/~jch/software/polipo/)

--------------

Please note: Tor offers a SOCKS Proxy only. In order to allow communication
from HAproxy to Tor, Polipo is used to translate from HTTP proxy to SOCKS proxy.
HAproxy is able to talk to HTTP proxies only.
