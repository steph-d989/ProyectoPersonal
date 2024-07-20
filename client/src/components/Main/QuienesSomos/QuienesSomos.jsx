import React from "react";
import logo from '../../../../public/Frame_9.svg';

const QuienesSomos = () => {
  return (
    <div className="quienes-somos">
      <img src={logo} alt="Logo de BorrowGames" />
      <p>Bienvenido a <span className="negrita">BorrowGames</span>, tu destino para el préstamo de boardgames premium. Nos especializamos en ofrecer una amplia selección de juegos de mesa de alta calidad para satisfacer todas tus necesidades de entretenimiento. Ya seas un jugador casual que busca descubrir nuevos juegos o un entusiasta experimentado en busca de desafíos más complejos, tenemos algo para todos.</p>

      <p>Nuestra misión es proporcionar acceso fácil y conveniente a una variedad de juegos de mesa, fomentando así la diversión, el aprendizaje y la conexión social a través del juego. Creemos en la importancia de compartir experiencias de juego únicas y enriquecedoras con amigos y familiares, y nos comprometemos a hacer que cada experiencia con nosotros sea memorable.</p>

      <p><span className="negrita">Normas y políticas</span>:</p>

      <p><span className="negrita">Cantidad de juegos prestados</span>: Cada cliente puede retirar hasta 3 juegos de mesa por vez.</p>

      <p><span className="negrita">Duración del préstamo</span>: Los juegos se pueden llevar prestados por un período máximo de 5 días.</p>

      <p><span className="negrita">Devolución y cuidado de los juegos</span>: Es responsabilidad del cliente devolver los juegos en el mismo estado en que fueron prestados. Cualquier daño o pérdida deberá ser reportado de inmediato. Se pueden aplicar cargos por daños.</p>

      <p><span className="negrita">Reservas y disponibilidad</span>: Recomendamos reservar los juegos con anticipación para garantizar su disponibilidad. Las reservas se mantendrán durante 24 horas desde el momento acordado para la recogida.</p>

      <p><span className="negrita">Política de renovación</span>: Los juegos pueden renovarse por un período adicional si no hay reservas pendientes para los mismos juegos y si se solicita antes de la fecha de vencimiento.</p>

      <p><span className="negrita">Multas por retraso</span>: Se aplicará una tarifa por cada día de retraso en la devolución de los juegos prestados.</p>

      <p><span className="negrita">Limpieza e higiene</span>: Todos los juegos se limpian y desinfectan adecuadamente antes y después de cada préstamo para garantizar la salud y seguridad de nuestros clientes.</p>

      <p>Además de nuestro servicio de préstamo de juegos, ofrecemos eventos y talleres regulares para la comunidad de jugadores, así como recomendaciones personalizadas según tus intereses y preferencias. En <span className="negrita">BorrowGames</span>, estamos aquí para hacer que tu experiencia con los juegos de mesa sea inolvidable y sin complicaciones. ¡Ven y descubre el mundo del juego con nosotros!</p>
    </div>
  );
};

export default QuienesSomos;
