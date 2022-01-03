--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: trades; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.trades (
    email character varying(200) NOT NULL,
    coin character varying(200) NOT NULL,
    price numeric,
    amount_of_coins integer,
    id bigint NOT NULL,
    date timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT positive_amount CHECK ((amount_of_coins > 0)),
    CONSTRAINT positive_price CHECK ((price > (0)::numeric))
);


ALTER TABLE public.trades OWNER TO me;

--
-- Name: trades_id_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.trades_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.trades_id_seq OWNER TO me;

--
-- Name: trades_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.trades_id_seq OWNED BY public.trades.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(200) NOT NULL,
    email character varying(200) NOT NULL,
    password character varying(200) NOT NULL
);


ALTER TABLE public.users OWNER TO me;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO me;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: trades id; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.trades ALTER COLUMN id SET DEFAULT nextval('public.trades_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: trades; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.trades (email, coin, price, amount_of_coins, id, date) FROM stdin;
arielchoum@gmail.com	btc	1.234	1	3	2021-12-27 23:47:09.387558
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.users (id, name, email, password) FROM stdin;
1	test	test@gmail.com	password
2	a	a@gmail.com	password
3	test	arielchxoum@gmail.com	$2b$10$yD7rw3G4neJZtoDbBI43tOW4FXG839eIwvw.ccZehuv7GK9ZzX49C
4	test	aa@gmail.com	$2b$10$GBT1EtCdThPaRp18F5.rvuUajMNPeI.nVGmkO65TOsmeAz49jhkky
5	test	aas@gmail.com	$2b$10$0gQ7BZoVfJDWbhBVEyfN3uJ4C/l.J1hgZWvl1YjIH7SS0/i1VEcU2
6	ariel	arielchoum@gmail.com	$2b$10$lTi3WTwedUiDA3ivDcYNNu.js/pKrHb/OtpASqVSmBsSKRQA5uIOK
\.


--
-- Name: trades_id_seq; Type: SEQUENCE SET; Schema: public; Owner: me
--

SELECT pg_catalog.setval('public.trades_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: me
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- Name: trades trades_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.trades
    ADD CONSTRAINT trades_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

