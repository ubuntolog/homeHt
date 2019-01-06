# Base image: Minimal Alpine Linux image with Java
FROM anapsix/alpine-java:8

RUN mkdir /root/homeHt
ADD target/appassembler /root/homeHt
RUN chmod a+x /root/homeHt/bin/homeht
ADD homeHt.yaml /root/

# run the application
CMD ["/root/homeHt/bin/homeht",  "server", "/root/homeHt.yaml"]
