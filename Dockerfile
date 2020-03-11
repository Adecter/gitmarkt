FROM postgres
ENV POSTGRES_DB ecom
COPY ./db/psql_dump.sql /docker-entrypoint-initdb.d/