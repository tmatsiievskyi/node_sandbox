CREATE TABLE system_user (
    id  integer GENERATED ALWAYS AS IDENTITY NOT NULL,
    login varchar(64) NOT NULL,
    password varchar(64) NOT NULL
);

ALTER TABLE system_user
ADD CONSTRAINT pk_system_user PRIMARY KEY (id);

CREATE UNIQUE INDEX ak_system_user_login ON system_user (login);

CREATE TABLE system_group (
    id serial,
    name varchar(64) NOT NULL
);

ALTER TABLE system_group ADD CONSTRAINT pk_system_group PRIMARY KEY (id);

CREATE UNIQUE INDEX ak_system_group_name ON system_group (name);

CREATE TABLE group_user (
    group_id integer NOT NULL,
    user_id integer NOT NULL
);

ALTER TABLE group_user ADD CONSTRAINT pk_group_user PRIMARY KEY (group_id, user_id);
ALTER TABLE group_user ADD CONSTRAINT fk_group_user_group_id FOREIGN KEY (group_id) REFERENCES system_group (id) ON DELETE CASCADE;
ALTER TABLE group_user ADD CONSTRAINT fk_group_user_user_id FOREIGN KEY (user_id) REFERENCES system_user (id) ON DELETE CASCADE;

CREATE TABLE session (
    id serial NOT NULL,
    user_id integer NOT NULL,
    token varchar(64) NOT NULL,
    ip varchar(45) NOT NULL,
    data text
);

ALTER TABLE session ADD CONSTRAINT pk_session PRIMARY KEY (id);
CREATE UNIQUE INDEX ak_session ON session (token);

ALTER TABLE session ADD CONSTRAINT fk_session_user_id FOREIGN KEY (user_id) REFERENCES session (id) ON DELETE CASCADE;