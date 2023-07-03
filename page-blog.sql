-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-07-2023 a las 11:36:30
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `page-blog`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posts`
--

CREATE TABLE `posts` (
  `id` bigint(20) NOT NULL,
  `post_title` varchar(100) NOT NULL,
  `post_content` varchar(250) NOT NULL,
  `image_url` varchar(250) NOT NULL,
  `date` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `posts`
--

INSERT INTO `posts` (`id`, `post_title`, `post_content`, `image_url`, `date`) VALUES
(1, 'Mi primer post', 'Este es mi primer post de prueba', 'blog_post-750x406.jpg', NULL),
(2, 'Prueba de metodo post y put', 'Hola, soy un metodo post creando una publicación desde postman, y me han actualizado', 'codigo.jpg', NULL),
(56, 'Hola amigos', 'Más cositas de mi post... no sé qué poner... Lorem ipsum siqum... no me acuerdo como sigue! suerte que estudié latin! semper ubi sub ubi ubique, si vis pacem para bellum, tace lucretia ego sum sexto tarquinius...', '1688315907041_romanos.jpg', '2023-07-02 22:11:12.641000'),
(57, 'Post de relleno', 'Hoolaaaa, soy puro relleno!!!', '1688376539483_IMG-20220701-WA0028.jpeg', '2023-07-03 09:29:18.775000'),
(58, 'Más post de relleno', 'Solo quiero que la paginación se veaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '1688376940810_nubes.jpg', '2023-07-03 09:35:40.813000');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `posts`
--
ALTER TABLE `posts`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
