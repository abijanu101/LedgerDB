SELECT * FROM Users;

USE master;

---- MASTER DB SCHEMA ----
GO
CREATE DATABASE serverDB;
GO
USE serverDB;
GO

CREATE TABLE Users (
	usr_id int IDENTITY (1,1),
	usr_fname varchar(16) NOT NULL,
	usr_lname varchar(16) NOT NULL,
	usr_email varchar(42) UNIQUE NOT NULL,
	usr_pw varchar(128) NOT NULL,

	CONSTRAINT pk_usr PRIMARY KEY (usr_id)
);

CREATE TABLE UserDBs (
	udb_id int IDENTITY(1,1),
	udb_name varchar (32),
	udb_owner int,
	udb_img varchar(64),

	CONSTRAINT pk_udb PRIMARY KEY (udb_id),
	CONSTRAINT udb_owner FOREIGN KEY (udb_owner) REFERENCES Users(usr_id)
);

CREATE TABLE Rights(
	usr_id int,
	udb_id int,
	udb_rights char,

	CONSTRAINT pk_rights PRIMARY KEY (usr_id, udb_id),
	CONSTRAINT fk_rights_usr FOREIGN KEY (usr_id) REFERENCES Users(usr_id),
	CONSTRAINT fk_rights_udb FOREIGN KEY (udb_id) REFERENCES UserDBs(udb_id),
	CONSTRAINT ch_rights CHECK (udb_rights = 'R' or udb_rights = 'A')	-- Regular or Admin
);


---- USER GENERATED DB SCHEMA ----

GO
CREATE DATABASE UserDB;
GO
USE UserDB;
GO

-- Products

CREATE TABLE Products(
	prod_id INT IDENTITY(1,1),
	prod_name VARCHAR(20) NOT NULL,

	CONSTRAINT pk_prods PRIMARY KEY (prod_id)
);

CREATE TABLE Prices (
	prod_id INT,
	update_time DATETIME2(0),
	prod_price INT,

	CONSTRAINT pk_prices PRIMARY KEY (prod_id, update_time),
	CONSTRAINT fk_prices_prod FOREIGN KEY (prod_id) REFERENCES Products(prod_id)
);

-- Places

CREATE TABLE Addresses (
	addr_id int IDENTITY(0,1),
	city varchar (20) NOT NULL, 
	town varchar (20) NOT NULL,
	street varchar (20) NOT NULL,
	details varchar(50),
	
	CONSTRAINT pk_addr PRIMARY KEY (addr_id)
);

INSERT INTO Addresses VALUES		-- Default Value, ID: 0
('Unknown', 'Unknown', 'Unknown', 'Unknown');

CREATE TABLE Storages (
	store_id int IDENTITY (0,1),
	store_name varchar(30) NOT NULL,
	addr_id int DEFAULT 0,

	CONSTRAINT pk_store PRIMARY KEY (store_id),
	CONSTRAINT fk_store_addr FOREIGN KEY (addr_id) REFERENCES Addresses(addr_id),
);

INSERT INTO Storages VALUES			-- Default Value, ID: 0
('Main Branch', 0);

-- People (Customers, Retailers)

CREATE TABLE People (
	pers_id int CONSTRAINT id_pers IDENTITY(0,1),
	pers_fname varchar(25) NOT NULL,
	pers_lname varchar(25) NOT NULL,
	pers_phone char(10) NOT NULL,
	pers_email varchar(32) NOT NULL,
	addr_id int CONSTRAINT df_pers_addr DEFAULT 0,

	CONSTRAINT pk_pers PRIMARY KEY (pers_id),
	CONSTRAINT fk_pers_addr FOREIGN KEY (addr_id) REFERENCES Addresses(addr_id),
);


INSERT INTO People VALUES			-- Default Value, ID: 0
('John', 'Doe', NULL, NULL, NULL);

CREATE TABLE Suppliers_Products (
	pers_id int DEFAULT 0,
	prod_id int,

	CONSTRAINT pk_supp PRIMARY KEY(pers_id, prod_id),
	CONSTRAINT fk_supp_prod FOREIGN KEY (prod_id) REFERENCES Products(prod_id),
	CONSTRAINT fk_supp_pers FOREIGN KEY (pers_id) REFERENCES People(pers_id),
);

-- Employees 

CREATE TABLE Departments (
	dept_id int IDENTITY(0,1),
	store_id int,
	dept_name varchar(25) NOT NULL,

	CONSTRAINT pk_dept PRIMARY KEY (dept_id),
	CONSTRAINT fk_dept_store FOREIGN KEY (store_id) REFERENCES Storages(store_id),
	CONSTRAINT df_dept_store FOREIGN KEY (store_id) REFERENCES Storages(store_id),
);

INSERT INTO Departments				-- Default Value, ID: 0
(dept_name) VALUES ('Unnamed Department');

CREATE TABLE Employees (
	pers_id int,
	dept_id int DEFAULT 0,
	doj date,

	CONSTRAINT pk_emp PRIMARY KEY (pers_id),
	CONSTRAINT fk_emp_pers FOREIGN KEY (pers_id) REFERENCES People(pers_id),
	CONSTRAINT fk_emp_dept FOREIGN KEY (dept_id) REFERENCES Departments(dept_id),
);

-- Item Flow

CREATE TABLE Stock (
	prod_id int,
	store_id int,
	prod_quantity int,

	CONSTRAINT pk_stock PRIMARY KEY (prod_id, store_id),
	CONSTRAINT fk_stock_prod FOREIGN KEY (prod_id) REFERENCES Products(prod_id),
	CONSTRAINT fk_stock_store FOREIGN KEY (store_id) REFERENCES Storages(store_id)
);

-- Transactions

CREATE TABLE Sales (
	sale_time datetime2(0),
	prod_id int,
	cust_id int DEFAULT 0,
	emp_id int,		-- can be used to trace which store this sale took place at and performance measurement
	prod_quantity int,
	sale_status char,

	CONSTRAINT pk_sale PRIMARY KEY (sale_time, prod_id, cust_id),
	CONSTRAINT fk_sale_prod FOREIGN KEY (prod_id) REFERENCES Products(prod_id),
	CONSTRAINT fk_sale_cust FOREIGN KEY (cust_id) REFERENCES People(pers_id),
	CONSTRAINT fk_sale_emp FOREIGN KEY (emp_id) REFERENCES Employees(pers_id),
	CONSTRAINT ch_sale_status CHECK (sale_status = 'P' or sale_status = 'U')	-- paid or unpaid
);

CREATE TABLE Purchases (
	purc_time datetime2(0),
	prod_id int,
	supp_id int DEFAULT 0,
	emp_id int,
	prod_quantity int,
	purc_status char,

	CONSTRAINT pk_purc PRIMARY KEY (purc_time, prod_id, supp_id, emp_id),
	CONSTRAINT fk_purc_emp FOREIGN KEY (emp_id) REFERENCES Employees(pers_id),
	CONSTRAINT fk_purc_supp_prod FOREIGN KEY (supp_id, prod_id) REFERENCES Suppliers_Products(pers_id, prod_id),
	CONSTRAINT ch_purc_status CHECK (purc_status = 'P' or purc_status = 'U')	-- paid or unpaid
);

-- Audit Log

CREATE TABLE Deletion_History (
	del_email varchar(42),
	del_time datetime2(3),
	del_table int,
	del_count int
);

CREATE TABLE Updation_History (
	upd_email varchar(42),
	upd_time datetime2(3),
	upd_table int,
	upd_row int,
	upd_oldv varchar(256),
	upd_newv varchar(256)
);

-- We will be enumerating each table
	--('Products'), 
	--('Prices'), 
	--('Addresses'), 
	--('Storages'), 
	--('People'), 
	--('Suppliers'), 
	--('Departments'), 
	--('Employees'), 
	--('Stock'), 
	--('Sales'), 
	--('Purchases');