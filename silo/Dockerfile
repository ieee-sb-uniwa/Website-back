FROM pgsty/mc:RELEASE.2026-10-26T00-00-00Z

COPY . /data

RUN chmod +x /data/silo-init.sh

ENTRYPOINT ["/bin/bash", "/data/silo-init.sh"]
