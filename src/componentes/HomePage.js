import React from 'react';

const HomePage = () => {
  return (
    <div className="container py-5">
      <header className="text-center mb-5">
        <h1 className="display-4"><strong>Bienvenido a la Venta de Vehículos</strong></h1>
        <p className="lead">donde podrás encontrar una amplia selección de vehículos segun tus gustos y tus necesidades.</p>
      </header>
      <main>
        <section className="about mb-5">
          <h2 className="text-center mb-4">Sobre Nosotros</h2>
          <p className="text-center">
            Somos una plataforma comprometida con la calidad y variedad de vehículos para satisfacer tus preferencias.
            Ofrecemos una amplia gama de opciones para cubrir tus necesidades de movilidad.
          </p>
          <p className="text-center">
            Nuestro objetivo es brindar soluciones confiables y encontrar el vehículo ideal que se ajuste a tus requerimientos.
            Nos esforzamos por ser tu mejor aliado en la adquisición de tu próximo vehículo.
          </p>
        </section>
        <section className="images text-center mb-5">
          <div className="row">
            <div className="col-md-4">
              <img src="/img/img1.png" className="img-fluid mb-3" alt="Descripción del vehículo 1" />
            </div>
            <div className="col-md-4">
              <img src="/img/img2.png" className="img-fluid mb-3" alt="Descripción del vehículo 2" />
            </div>
            <div className="col-md-4">
              <img src="/img/img4.jpg" className="img-fluid mb-3" alt="Descripción del vehículo 3" />
            </div>
          </div>
        </section>
      </main>
      <footer className="text-center">
        <p>¡Síguenos en nuestras redes sociales para conocer nuestras últimas ofertas y novedades!</p>
        {/* Agrega los íconos de redes sociales de Bootstrap */}
        <div>
          <i className="bi bi-facebook me-3"></i>
          <i className="bi bi-twitter me-3"></i>
          <i className="bi bi-instagram"></i>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
