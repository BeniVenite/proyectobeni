-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-08-2025 a las 01:13:16
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mascotas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adopciones`
--

CREATE TABLE `adopciones` (
  `ID_Adopcion` int(11) NOT NULL,
  `ID_Animal` int(11) NOT NULL,
  `ID_Persona` int(11) NOT NULL,
  `Fecha_Adopcion` date NOT NULL,
  `Observaciones` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `adopciones`
--

INSERT INTO `adopciones` (`ID_Adopcion`, `ID_Animal`, `ID_Persona`, `Fecha_Adopcion`, `Observaciones`) VALUES
(1, 2, 1, '2025-02-15', 'Adopción sin incidencias'),
(2, 5, 2, '2025-05-30', 'Adopción exitosa'),
(3, 9, 3, '2025-08-06', 'Animal bien adaptado'),
(4, 2, 4, '2025-02-20', 'Reubicación temporal'),
(5, 5, 5, '2025-06-10', 'Adopción definitiva'),
(6, 9, 6, '2025-08-08', 'Seguimiento en curso'),
(7, 2, 7, '2025-03-01', 'Adopción con visita previa'),
(8, 5, 8, '2025-05-15', 'Adopción express'),
(9, 9, 9, '2025-08-10', 'Animal en excelente estado'),
(10, 2, 10, '2025-02-25', 'Adopción con compromiso de cuidado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `animales`
--

CREATE TABLE `animales` (
  `ID_Animal` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Especie` varchar(50) NOT NULL,
  `Raza` varchar(50) DEFAULT NULL,
  `Edad` int(11) DEFAULT NULL,
  `Estado` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `animales`
--

INSERT INTO `animales` (`ID_Animal`, `Nombre`, `Especie`, `Raza`, `Edad`, `Estado`) VALUES
(1, 'Luna', 'Perro', 'Labrador', 3, 'En adopción'),
(2, 'Milo', 'Gato', 'Siames', 2, 'Adoptado'),
(3, 'Rocky', 'Perro', 'Pastor Alemán', 5, 'En tratamiento'),
(4, 'Nala', 'Gato', 'Persa', 1, 'En adopción'),
(5, 'Toby', 'Perro', 'Beagle', 4, 'Adoptado'),
(6, 'Simba', 'Gato', 'Maine Coon', 6, 'En adopción'),
(7, 'Coco', 'Perro', 'Poodle', 2, 'En tratamiento'),
(8, 'Bella', 'Gato', 'Bengalí', 3, 'En adopción'),
(9, 'Max', 'Perro', 'Bulldog', 4, 'Adoptado'),
(10, 'Misha', 'Gato', 'Común Europeo', 5, 'En adopción');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `donaciones`
--

CREATE TABLE `donaciones` (
  `ID_Donacion` int(11) NOT NULL,
  `ID_Persona` int(11) NOT NULL,
  `Donante` varchar(100) DEFAULT NULL,
  `Tipo_Donacion` varchar(100) DEFAULT NULL,
  `Monto` decimal(10,2) DEFAULT NULL,
  `Fecha` date NOT NULL,
  `Cantidad_Descripcion` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `donaciones`
--

INSERT INTO `donaciones` (`ID_Donacion`, `ID_Persona`, `Donante`, `Tipo_Donacion`, `Monto`, `Fecha`, `Cantidad_Descripcion`) VALUES
(1, 1, 'Juan Pérez', 'Efectivo', 100.00, '2025-01-10', NULL),
(2, 2, 'María López', 'Alimento', NULL, '2025-02-12', '20 kg croquetas'),
(3, 3, 'Carlos Gómez', 'Medicamentos', NULL, '2025-03-15', 'Antibióticos'),
(4, 4, 'Ana Ruiz', 'Efectivo', 50.00, '2025-04-18', NULL),
(5, 5, 'Pedro Martínez', 'Alimento', NULL, '2025-05-20', '10 kg croquetas'),
(6, 6, 'Lucía Fernández', 'Accesorios', NULL, '2025-06-22', 'Camas y juguetes'),
(7, 7, 'Miguel Torres', 'Efectivo', 200.00, '2025-07-24', NULL),
(8, 8, 'Laura Romero', 'Alimento', NULL, '2025-08-01', '15 kg croquetas'),
(9, 9, 'Sofía García', 'Efectivo', 75.00, '2025-08-05', NULL),
(10, 10, 'Andrés Silva', 'Medicamentos', NULL, '2025-08-08', 'Vitaminas y suplementos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_medico`
--

CREATE TABLE `historial_medico` (
  `ID_Historial` int(11) NOT NULL,
  `ID_Animal` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Diagnostico` varchar(200) DEFAULT NULL,
  `Tratamiento` varchar(200) DEFAULT NULL,
  `Veterinario` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historial_medico`
--

INSERT INTO `historial_medico` (`ID_Historial`, `ID_Animal`, `Fecha`, `Diagnostico`, `Tratamiento`, `Veterinario`) VALUES
(1, 1, '2025-01-05', 'Vacunación', 'Vacuna antirrábica', 'Dr. Pérez'),
(2, 2, '2025-02-10', 'Esterilización', 'Cirugía exitosa', 'Dra. López'),
(3, 3, '2025-03-15', 'Fractura pata', 'Inmovilización y reposo', 'Dr. García'),
(4, 4, '2025-04-20', 'Desparasitación', 'Tratamiento oral', 'Dra. Ruiz'),
(5, 5, '2025-05-25', 'Otitis', 'Gotas óticas', 'Dr. Martínez'),
(6, 6, '2025-06-30', 'Vacunación', 'Vacuna triple felina', 'Dra. Gómez'),
(7, 7, '2025-07-10', 'Alergia piel', 'Antihistamínicos', 'Dr. Pérez'),
(8, 8, '2025-08-01', 'Resfriado', 'Antibióticos', 'Dr. Romero'),
(9, 9, '2025-08-05', 'Vacunación', 'Vacuna séxtuple', 'Dr. López'),
(10, 10, '2025-08-12', 'Chequeo general', 'Sin problemas', 'Dra. Fernández');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `ID_Persona` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Direccion` varchar(200) DEFAULT NULL,
  `Telefono` varchar(20) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`ID_Persona`, `Nombre`, `Direccion`, `Telefono`, `Email`) VALUES
(1, 'Juan Pérez', 'Av. Siempre Viva 123', '76543210', 'juanp@example.com'),
(2, 'María López', 'Calle Rosas 45', '71234567', 'maria@example.com'),
(3, 'Carlos Gómez', 'Av. Libertad 890', '78901234', 'carlos@example.com'),
(4, 'Ana Ruiz', 'Calle Sol 56', '74561234', 'ana@example.com'),
(5, 'Pedro Martínez', 'Av. Central 101', '73450123', 'pedro@example.com'),
(6, 'Lucía Fernández', 'Calle Luna 67', '76549812', 'lucia@example.com'),
(7, 'Miguel Torres', 'Av. Pinos 78', '75678901', 'miguel@example.com'),
(8, 'Laura Romero', 'Calle Verde 89', '79876543', 'laura@example.com'),
(9, 'Sofía García', 'Av. Mar 90', '71239876', 'sofia@example.com'),
(10, 'Andrés Silva', 'Calle Azul 12', '73456789', 'andres@example.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `adopciones`
--
ALTER TABLE `adopciones`
  ADD PRIMARY KEY (`ID_Adopcion`),
  ADD KEY `ID_Animal` (`ID_Animal`),
  ADD KEY `ID_Persona` (`ID_Persona`);

--
-- Indices de la tabla `animales`
--
ALTER TABLE `animales`
  ADD PRIMARY KEY (`ID_Animal`);

--
-- Indices de la tabla `donaciones`
--
ALTER TABLE `donaciones`
  ADD PRIMARY KEY (`ID_Donacion`),
  ADD KEY `ID_Persona` (`ID_Persona`);

--
-- Indices de la tabla `historial_medico`
--
ALTER TABLE `historial_medico`
  ADD PRIMARY KEY (`ID_Historial`),
  ADD KEY `ID_Animal` (`ID_Animal`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`ID_Persona`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `adopciones`
--
ALTER TABLE `adopciones`
  MODIFY `ID_Adopcion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `animales`
--
ALTER TABLE `animales`
  MODIFY `ID_Animal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `donaciones`
--
ALTER TABLE `donaciones`
  MODIFY `ID_Donacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `historial_medico`
--
ALTER TABLE `historial_medico`
  MODIFY `ID_Historial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `personas`
--
ALTER TABLE `personas`
  MODIFY `ID_Persona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `adopciones`
--
ALTER TABLE `adopciones`
  ADD CONSTRAINT `adopciones_ibfk_1` FOREIGN KEY (`ID_Animal`) REFERENCES `animales` (`ID_Animal`),
  ADD CONSTRAINT `adopciones_ibfk_2` FOREIGN KEY (`ID_Persona`) REFERENCES `personas` (`ID_Persona`);

--
-- Filtros para la tabla `donaciones`
--
ALTER TABLE `donaciones`
  ADD CONSTRAINT `donaciones_ibfk_1` FOREIGN KEY (`ID_Persona`) REFERENCES `personas` (`ID_Persona`);

--
-- Filtros para la tabla `historial_medico`
--
ALTER TABLE `historial_medico`
  ADD CONSTRAINT `historial_medico_ibfk_1` FOREIGN KEY (`ID_Animal`) REFERENCES `animales` (`ID_Animal`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
