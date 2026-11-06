FROM amazon/aws-cli:2.27.41

COPY make-bucket-public.sh /usr/local/bin/make-bucket-public.sh

ENTRYPOINT ["/bin/sh", "/usr/local/bin/make-bucket-public.sh"]