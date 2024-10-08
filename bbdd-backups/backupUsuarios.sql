PGDMP      /                |           proyectopersonal_borrowgames    16.3 (Debian 16.3-1.pgdg120+1)    16.0     (           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            )           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            *           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            +           1262    16389    proyectopersonal_borrowgames    DATABASE     �   CREATE DATABASE proyectopersonal_borrowgames WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF8';
 ,   DROP DATABASE proyectopersonal_borrowgames;
                stephdamiani    false            ,           0    0    proyectopersonal_borrowgames    DATABASE PROPERTIES     E   ALTER DATABASE proyectopersonal_borrowgames SET "TimeZone" TO 'utc';
                     stephdamiani    false            �            1259    16450    usuarios    TABLE     @  CREATE TABLE public.usuarios (
    usuario_id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    pass_hash character varying(255) NOT NULL,
    rol character varying(50) DEFAULT 'user'::character varying NOT NULL,
    is_logged boolean DEFAULT false NOT NULL
);
    DROP TABLE public.usuarios;
       public         heap    stephdamiani    false            �            1259    16457    usuarios_usuario_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.usuarios_usuario_id_seq;
       public          stephdamiani    false    219            -           0    0    usuarios_usuario_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.usuarios_usuario_id_seq OWNED BY public.usuarios.usuario_id;
          public          stephdamiani    false    220            �           2604    16460    usuarios usuario_id    DEFAULT     z   ALTER TABLE ONLY public.usuarios ALTER COLUMN usuario_id SET DEFAULT nextval('public.usuarios_usuario_id_seq'::regclass);
 B   ALTER TABLE public.usuarios ALTER COLUMN usuario_id DROP DEFAULT;
       public          stephdamiani    false    220    219            $          0    16450    usuarios 
   TABLE DATA           X   COPY public.usuarios (usuario_id, nombre, email, pass_hash, rol, is_logged) FROM stdin;
    public          stephdamiani    false    219   a       .           0    0    usuarios_usuario_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.usuarios_usuario_id_seq', 4, true);
          public          stephdamiani    false    220            �           2606    16468    usuarios usuarios_email_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);
 E   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_email_key;
       public            stephdamiani    false    219            �           2606    16470    usuarios usuarios_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (usuario_id);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public            stephdamiani    false    219            $   |   x�U���0Eg�+�PymLHL]��U����Q��?e��t��t�nVv�����;��3J2(�\*��%�d�F- �w~Mt>��
W�B����b�b�`?���ZSv5�1�ƺ%]��@4�     