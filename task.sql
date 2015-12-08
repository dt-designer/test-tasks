-- phpMyAdmin SQL Dump
-- version 4.0.10.6
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Ноя 29 2015 г., 11:00
-- Версия сервера: 5.5.41-log
-- Версия PHP: 5.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `task`
--

-- --------------------------------------------------------

--
-- Структура таблицы `payinfo`
--

CREATE TABLE IF NOT EXISTS `payinfo` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `service` int(11) NOT NULL,
  `date` text NOT NULL,
  `sum` int(11) NOT NULL,
  `course` text NOT NULL,
  `comment` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Дамп данных таблицы `payinfo`
--

INSERT INTO `payinfo` (`id`, `service`, `date`, `sum`, `course`, `comment`) VALUES
(1, 1, '1448745886102', 100, 'RUB', ''),
(2, 3, '1448781490', 650, 'RUB', '123'),
(3, 3, '1448783936', 4, 'USD', 'Бонус');

-- --------------------------------------------------------

--
-- Структура таблицы `services`
--

CREATE TABLE IF NOT EXISTS `services` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `login` text NOT NULL,
  `idp` int(11) NOT NULL,
  `dlr` text NOT NULL,
  `dir` text NOT NULL,
  `sms` text NOT NULL,
  `rate` int(11) NOT NULL,
  `bank` text NOT NULL,
  `notif` int(11) NOT NULL,
  `balance` text NOT NULL,
  `credit` int(11) NOT NULL,
  `email` text NOT NULL,
  `deleted` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_2` (`id`),
  KEY `id` (`id`),
  KEY `id_3` (`id`),
  KEY `id_4` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=20 ;

--
-- Дамп данных таблицы `services`
--

INSERT INTO `services` (`id`, `login`, `idp`, `dlr`, `dir`, `sms`, `rate`, `bank`, `notif`, `balance`, `credit`, `email`, `deleted`) VALUES
(1, 'mtint', 1, 'get', 'smpp', 'http://test-url.com/', 1, 'cbrf', 10, '-1.9', 0, 'test@test.com', 'false'),
(2, 'int', 1, 'post', 'smpp', 'http://test-url.com/', 2, 'cbrf', 5, '-102', 0, 'int@test.com', 'false'),
(3, 'Tim', 2, 'post', 'smpp', 'http://sms.tim-test.ru', 1, 'cbrf', 10, '14.15', 200, 'tim@test.ru', 'false'),
(4, 'rty', 3, 'get', 'smpp', '', 1, 'cbrf', 0, '0', 0, '', 'false');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `login` text NOT NULL,
  `pass` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `pass`) VALUES
(1, 'admin', '8eddcb8c87601bcb7f5fccb6cde7ea62');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
