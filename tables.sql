-- MY SQL

create table users (
	id integer primary key auto_increment,
    firstName varchar(255) not null,
    lastName varchar(255),
    email varchar(255) not null,
    password varchar(255) not null,
    captcha_id INT references captchas_1(id),
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    deleted_at DATETIME(6) DEFAULT NULL
);

create table captchas (
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
    captchaId VARCHAR(255) NOT NULL,
    value VARCHAR(255),
	isPassed BOOLEAN DEFAULT 0,
    createdAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updatedAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    deletedAt DATETIME(6) DEFAULT NULL
);