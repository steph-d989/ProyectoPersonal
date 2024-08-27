PGDMP  9    .                |           proyectopersonal_borrowgames    16.3 (Debian 16.3-1.pgdg120+1)    16.0     %           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            &           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            '           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            (           1262    16389    proyectopersonal_borrowgames    DATABASE     �   CREATE DATABASE proyectopersonal_borrowgames WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF8';
 ,   DROP DATABASE proyectopersonal_borrowgames;
                stephdamiani    false            )           0    0    proyectopersonal_borrowgames    DATABASE PROPERTIES     E   ALTER DATABASE proyectopersonal_borrowgames SET "TimeZone" TO 'utc';
                     stephdamiani    false            �            1259    16445    reservas    TABLE     �   CREATE TABLE public.reservas (
    reserva_id integer NOT NULL,
    usuario_id integer NOT NULL,
    juego_id integer NOT NULL,
    fecha_reserva timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_devolucion date NOT NULL
);
    DROP TABLE public.reservas;
       public         heap    stephdamiani    false            �            1259    16449    reservas_reserva_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reservas_reserva_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.reservas_reserva_id_seq;
       public          stephdamiani    false    217            *           0    0    reservas_reserva_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.reservas_reserva_id_seq OWNED BY public.reservas.reserva_id;
          public          stephdamiani    false    218            �           2604    16459    reservas reserva_id    DEFAULT     z   ALTER TABLE ONLY public.reservas ALTER COLUMN reserva_id SET DEFAULT nextval('public.reservas_reserva_id_seq'::regclass);
 B   ALTER TABLE public.reservas ALTER COLUMN reserva_id DROP DEFAULT;
       public          stephdamiani    false    218    217            !          0    16445    reservas 
   TABLE DATA           e   COPY public.reservas (reserva_id, usuario_id, juego_id, fecha_reserva, fecha_devolucion) FROM stdin;
    public          stephdamiani    false    217   �       +           0    0    reservas_reserva_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.reservas_reserva_id_seq', 69, true);
          public          stephdamiani    false    218            �           2606    16466    reservas reservas_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.reservas
    ADD CONSTRAINT reservas_pkey PRIMARY KEY (reserva_id);
 @   ALTER TABLE ONLY public.reservas DROP CONSTRAINT reservas_pkey;
       public            stephdamiani    false    217            !   3   x�3��4�45�4202�50�52R04�20�21�333�4�@HYr��qqq ��     