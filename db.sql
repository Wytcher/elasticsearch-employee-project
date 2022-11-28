CREATE TABLE tb_regions(
    id SERIAL NOT NULL,
    region_name VARCHAR(30) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,

    CONSTRAINT PK_tb_regions PRIMARY KEY (id)
);

CREATE TABLE tb_countries(
    id SERIAL NOT NULL,
    region_id  INT NOT NULL,
    country_name VARCHAR(30) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,

    CONSTRAINT PK_tb_countries PRIMARY KEY (id),
    CONSTRAINT FK_tb_countries_regions FOREIGN KEY (region_id) REFERENCES tb_regions (id)
);

CREATE TABLE tb_locations(
    id SERIAL NOT NULL,
    country_id INT NOT NULL,
    street_address VARCHAR(120) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    city VARCHAR(120) NOT NULL,
    state VARCHAR(30) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,

    CONSTRAINT PK_tb_locations PRIMARY KEY (id),
    CONSTRAINT FK_tb_locations_countries FOREIGN KEY (country_id) REFERENCES tb_countries (id)
);

CREATE TABLE tb_departments(
    id SERIAL NOT NULL,
    location_id INT NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,

    CONSTRAINT PK_tb_departments PRIMARY KEY (id),
    CONSTRAINT FK_tb_departments_locations FOREIGN KEY (location_id) REFERENCES tb_locations (id)
);

CREATE TABLE tb_jobs(
    id SERIAL NOT NULL,
    job_title VARCHAR(50) NOT NULL,
    min_salary DECIMAL(10,2) NOT NULL,
    max_salary DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,

    CONSTRAINT PK_tb_jobs PRIMARY KEY (id)
);

CREATE TABLE tb_employees(
    id SERIAL NOT NULL,
    job_id INT NOT NULL,
    department_id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name varchar(80) NOT NULL,
    email VARCHAR(120) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    hire_date DATE NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,

    CONSTRAINT PK_tb_employees PRIMARY KEY (id),
    CONSTRAINT FK_tb_employees_jobs FOREIGN KEY (job_id) REFERENCES tb_jobs (id),
    CONSTRAINT FK_tb_employees_departments FOREIGN KEY (department_id) REFERENCES tb_departments (id)
);
