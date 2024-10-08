PGDMP      .                |           proyectopersonal_borrowgames    16.3 (Debian 16.3-1.pgdg120+1)    16.0     '           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            (           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            )           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            *           1262    16389    proyectopersonal_borrowgames    DATABASE     �   CREATE DATABASE proyectopersonal_borrowgames WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF8';
 ,   DROP DATABASE proyectopersonal_borrowgames;
                stephdamiani    false            +           0    0    proyectopersonal_borrowgames    DATABASE PROPERTIES     E   ALTER DATABASE proyectopersonal_borrowgames SET "TimeZone" TO 'utc';
                     stephdamiani    false            �            1259    16438    juegos    TABLE     �  CREATE TABLE public.juegos (
    juego_id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text,
    genero character varying(50),
    numero_jugadores_min integer NOT NULL,
    numero_jugadores_max integer NOT NULL,
    edad_recomendada integer,
    tiempo_juego character varying(50),
    disponibilidad boolean DEFAULT true NOT NULL,
    video_url character varying(1000),
    imagen character varying(1000)
);
    DROP TABLE public.juegos;
       public         heap    stephdamiani    false            �            1259    16444    juegos_juego_id_seq    SEQUENCE     �   CREATE SEQUENCE public.juegos_juego_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.juegos_juego_id_seq;
       public          stephdamiani    false    215            ,           0    0    juegos_juego_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.juegos_juego_id_seq OWNED BY public.juegos.juego_id;
          public          stephdamiani    false    216            �           2604    16458    juegos juego_id    DEFAULT     r   ALTER TABLE ONLY public.juegos ALTER COLUMN juego_id SET DEFAULT nextval('public.juegos_juego_id_seq'::regclass);
 >   ALTER TABLE public.juegos ALTER COLUMN juego_id DROP DEFAULT;
       public          stephdamiani    false    216    215            #          0    16438    juegos 
   TABLE DATA           �   COPY public.juegos (juego_id, nombre, descripcion, genero, numero_jugadores_min, numero_jugadores_max, edad_recomendada, tiempo_juego, disponibilidad, video_url, imagen) FROM stdin;
    public          stephdamiani    false    215   �       -           0    0    juegos_juego_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.juegos_juego_id_seq', 58, true);
          public          stephdamiani    false    216            �           2606    16462    juegos juegos_nombre_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.juegos
    ADD CONSTRAINT juegos_nombre_key UNIQUE (nombre);
 B   ALTER TABLE ONLY public.juegos DROP CONSTRAINT juegos_nombre_key;
       public            stephdamiani    false    215            �           2606    16464    juegos juegos_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.juegos
    ADD CONSTRAINT juegos_pkey PRIMARY KEY (juego_id);
 <   ALTER TABLE ONLY public.juegos DROP CONSTRAINT juegos_pkey;
       public            stephdamiani    false    215            #      x��[�n�H�]����y�����ג,k�dY� �d����4�ozY�^4z�[�؋Lj��[V5^]�qE1i�Ɉ'"�*�N�eq�J� ^̹�s� v���+��8#9Ϊ�k���ӊTQ+zEV��r�y�U��<ϓ�ϯV��&.��&U'y����:dS�7����O���-���E���<�[�~uX��c�C�G�~�=������w����V�a�{�*V�%�~���G+H��8'��������j���\�+JE*��L��v���*P�v~S;:a�03�nɫ�ݟ&�Վ	�e�F��<����g��R��y���`Q,v�_?�*� �n�;�8-2�����/�*�o�[�(j��q��Z���$�喃S�*0|���w$�����vG�I��7<-`��I�x	���{�"H�>f��^�v3�	���UH��WC�5��o��j[4Y6�j�|��"�J�jN�|��$H/h|�LCy�R0��G��q��%aG�(C�,	kQ�K@���\��
'���/,�r����%ىI�]��m+tD�>U(��ݴ��YO^Շ���,�7YD��x��~X�Xԭ�P��f�^i�.�pH��.'8�v
���p;>�7�r��
�(U���2������^Y�E[�Bg��u��R��OV�,I���Gn]F6���%�]A�,�&�R�A�$�r�[�+��o)c�����&i�ڐ��Ջܡ&��ݙ4���r~=x���}���A�Ӽd'����LLGƎ��	)�� [�������ѵĪ��k
�9s�
!�)ڦ��XqD� ����Yѹ�@H�����K������ �S�< �%qʽv��w���^Ϟ��e�?�`L��f-l�bg�yK�c�Ū�{���l��-W�<_��������^R5a�'i�N��!�d�2���G8�,�fQ�������)3? [��&���<O"�����ܘ�AN�h͐�8��O�)	'�!�b
H���&����t�+yRd2����q�1���w�v�L5�ǉ?۔�0��x�LI�uY(<�I�ƍ�ݴ�ڀ�����t�2JƳ8����>>v�#�S��q��.	0�	��r����?�z�ŝl6�_Ւv"�D���P��b�8�(���d�R��km]>�.��)���%��c^�ٖ$�������!;���� y���K �J+��p���F�wf�j^�I��O��c���f8����\�ԶK A�"�]�D�?�H�v�� >M�����5M�3���,�*X��A񢦨��h���"�����V�LV@�<��@�<��$�Z���N�209O	�lV�� |}?�?0�D����u^�|�ݽ�d��+k#c<��#4φ���FЀ�3x��C�쌴vFZ�Ϭ2�NpBccsğ{���o�R�A�A��b�C��s.H.䉗��]��q�d��
5����7��z�گvIRDΜiu��.(Y~�Đ�>ߚQ�bnN��r���g\�H=p�͗"�KL=�Xդ�)�.��t�1p3�hP�%>gR�������t��ƒ��Td�1��X����и�j}���iS\��e���O��
kU�n�V'>�	������Kf$*c���Β(���҂�Me�wxE�Xʇ��H�ͷ�"��2�ӻ~a-���n��رOV�G>��LD�X�%��̾��c��0$	�b�;K<��8�A Z!���Z�3�s�O�6��R�FU>�����'�Q9�L�
�_�ז���L=Y��ʓ)Ϻ�.�x��Tg2%���K �d��#�.��`��x�VL������l�2��|k/�U��oy�;�ʿh��V�0�g�9'�/�q|���n���N���4��Ff���	��rY�4�r��������i$^��[m�<���+F�F�$� �R��>l:v�P����O���a��B���u�W�F�m0�����1o�f�Ċb5N�|�X��+A��*C�.#��t���E�N����@9�ܓ�.	�VJp�=���&)����(�mHk��N(?(K]��S?��Wb�,�h������3��Z�41QFIc�B����o7��M����j(�Ȃl�Q�E�+�ķ'5��(�ꃧ�r��J�L����L�q�ń�����8�l�y��ۆ�$�E�<~�p��0�G���.U?o���֣�f��֍�wk֚��g'v��@FJװ������1��y�c'��-��;��}��H����q��5�dN�=�Z|���R�_��>��$΁��9���=���9�̲��<�����Q���s4�`�U=Bn��
�,���><zA�}�c��%nL�+�L	�� ��a������ш%�����u�ߍiY&�MAXS�J�(��V�0������X����/|�;������ʕ>��&�"숅�S5M���|��ԍ�]SS�u#b�y�����)�I�&s�o��9�D�� ���!�fĂ�vTT�7 pNvtT��v�9K���ߒmt�ԭ�v@���]J��H �T��H���=+.6A�qc��}��R<Y������t#�� �7�Y�񒤥2��� ���Iâl��j����i5�
#˫��۫xڸ�$�G�7�u�d�O:R 1@�e�(.�$�e��ϮK���vҥ�4��i\xs���y��ms`�����gU������ݣ�.��VV]�k{:I4�Y��x��_IT�AmT��T�䥡��0�#�m>Jz��~��hN��8�ZJ�Sҝ���L�vlpI�y=o{�4xZ��Iű���x��P[6����Uu4(��`���y/J�y�E���v���骿,�E�^*�u:m���W��
�f�~�TUI�DsK�F��. �q��%��5�e�H8�<_��q�>l��-������=��]��A�:)��'�+��<^57����k�?>�z���߼��C��c�0#J�C?�-fF�93� �ۑKPin)��K���8�)���-�T�e}�"�o�g����M��g �?�V]���O��,~b$�����v#v�O'ׇf�χ^��Y����v���j�v�%T�H��+��|�i�#�@	��pv.���[B��sr�"!o��4!��z�z�{j}}��nغNfjG�è�t
�vpJ\(��ZAӴ�%ai/ZRs�o3�7e�vA0M��.1�"(�(���S�Ǡ��s���+�����Q�QM���n5j)1��ȸ�y���,��Ͻ�R���S!n��tXZ},��訞Z'�̀`��"I�*�WH�Q|`��K�ʨ���$�/G3����.	�K��z�������bl��h�^c#�6���S��q�%�Wq�EQ%��7N�k��Ǡ	R��\6�R����0g����\�	�c~�0$����;���(\����F���ꤷ���ټ� R� AA�e{˾v{�쇺��%�wp��$0��\ُM�����	��?������Y����n�sU�]1G��=���.&���g%�v:��HF��g�F��Zt�8��c���q���ktO�������B�R����$I�]WZPI�^׌5�_�� �"T�l�-Z(`hA�Q�P)�d���p�k�}_-~]F}��c���77�a�}
�k�>/o��-������`k�n����)�i S1L$�:�%S�,TA�(��EWmM�[�EY�eI�T�P���!kHĔ���Aa���;}�.8pv��AC���?�Y���Z�C!rvb~Q�{�	
����0�}�)������V��iu�����Ti�eI\֝�yԚ���>�����˙�����΂��ox][��"������t���b}۹�W#��s�|&�
ގ�Ρ ���;� `6����ޜ��"��x䧳�݈���!�����I��G���Ʒ�4|�P�ԣ�2�"�^u!ɥ�ą�Z�U(�>��~�R�(� aM��3��?����##� ��^��9�wq��_ިi�M�DR�Y+���:�P]%e�~A���S�3   ��{	�Yi����D���Ȇ)�|�8TT�K̘|�(���ͨH�?Tr���n��Kh�G�!���Ӫ�>[89�C!�����ȡ��m;��Μ�ⶪ7ݙnl˲*��`�Qg��J�(k�T�9��9�c��
ذ��?�>��~fK$]˰6F�~���Ő���$����	+B�腺|���E��b�?.6��z&$�^����'xН=͟o/�YC�+�j�cC��������w����+��bh�E�[�.���=�E9�`�++R���p��[h�˸�Nc0�M��8a
p�;��]��x;mNܓ���(+�#�I[6G����N-��=T8�����R�JK�
M����R��K��s�i�ΩXjٞ�Cv �s��	����n;\)9n��H�:�
���Q�C<��mT:Ҳ)ϺW���d�]ٿ���4���w�zwP�Tq�'t����Y��X{�-�v��I𷿉��*B)�2.��ϵ�?�K.)q��L�n�n���?�C	T��9����=s����i�t��Ɲ�S�)=��tS�����A�0|��L�Cm��;-C�ʷ�yA�y�4A�h�"�O�y�O6	-U����L��lqW	>a��T:�g�6MPr���(���ӔV:=�����ܐ^m������!�|>[=�3e$��!є�nE�P�t������hJ���$�� �!};�͐��(@!m�#U�TA�LI�L�DIX��:ޟO<IA_TĢ��"���n9��5�e��0~������#��iV��\��hPF�o�(��m5n\��b2�����}F��`�uV}"
<E���tQ��ֵ4G���f���}_v�f`J������E0/./�(�w�	�D�ı^>�q|�h������a���di��/��z+���jڊ�N�X�;�ш�^D���b� C�!�r�K���g���m����";MSVY>�^��	��*���>^���&56�^�$����ǭq-��s��e���396���]��� ,8�$���J�� ���rUDh>��ogu�A���k�1�z,ڝ�#L���[J?R�'���%��ǻ�<�]�6�C*n�׉Џ��)����+�������5�B�NV-�&���</���-pD�\m	�1:���r����I�Mv_dC"S%�����ֹ�(�s�],��J��|)���jkv�����p\ίoNNf���Zm0^�M�Y��|�u��Xi@��}r�"N
���A�B�t�ˣ7�2�h���� \p�=�6堧��v�5�]^�{���Ѧ�_M��O���K����f�O�� ��5��MdJ���*U(�q=����v��x��@��˱F�f���Y�%���>E�E����F���k1 ��I���>��4�U�p����(����+$)�旴�	H��*@.@������Te�6�|��|��ܲ.�S��B��b>$��s�z6���UiL��p���Ҹlp�[�l�N���U��q�K�X>�z�0���U=�\����C���(�%�:c[$%7�����K�fY�>;ꭆ?��j���뻛�9��=�����0dg��?�����(�JYS��ǩ_y��+�?��PtR����r�vfO�߲C�����f->�N����w	�5�=�;k��h��٢�a�D�;r�I25WG��ڒLE�ɇS�q�o������?b��s����j�/�teɲ_�w��{��K
��:�2)(%���V�����     