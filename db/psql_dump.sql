-- Adminer 4.7.6 PostgreSQL dump

\connect "ecom";

DROP TABLE IF EXISTS "Category";
DROP SEQUENCE IF EXISTS "Category_Id_seq";
CREATE SEQUENCE "Category_Id_seq" INCREMENT BY 1 START 5 ;

CREATE TABLE "public"."Category" (
    "Id" integer DEFAULT nextval('"Category_Id_seq"') NOT NULL,
    "Name" character varying(50) NOT NULL,
    "ParentId" integer,
    CONSTRAINT "Category_Id" PRIMARY KEY ("Id"),
    CONSTRAINT "Category_ParentId_fkey" FOREIGN KEY ("ParentId") REFERENCES "Category"("Id") ON UPDATE RESTRICT ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

INSERT INTO "Category" ("Id", "Name", "ParentId") VALUES
(1,	'Auto',	NULL),
(2,	'Auto Parts',	1),
(3,	'Software',	NULL),
(4,	'Software Development Company',	3);

DROP TABLE IF EXISTS "Service";
DROP SEQUENCE IF EXISTS "Service_id_seq";
CREATE SEQUENCE "Service_id_seq" INCREMENT BY 1  START 2;

CREATE TABLE "public"."Service" (
    "id" integer DEFAULT nextval('"Service_id_seq"') NOT NULL,
    "name" character varying(50) NOT NULL,
    "category" integer NOT NULL,
    "keywords" character varying(100) NOT NULL,
    CONSTRAINT "Service_id" PRIMARY KEY ("id"),
    CONSTRAINT "Service_category_fkey" FOREIGN KEY (category) REFERENCES "Category"("Id") ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);

INSERT INTO "Service" ("id", "name", "category", "keywords") VALUES
(1,	'SIA C.T.Co',	4,	'Software agile')

-- 2020-03-11 09:44:57.266065+00