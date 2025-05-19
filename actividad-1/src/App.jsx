import { useState, useEffect } from 'react';
import Modal from './components/modal';
import './App.css';


function App() {
  const [opcion, setOpcion] = useState(1);
  const [mostrar, setMostrar] = useState(false);
  const [modalTexto, setModalTexto] = useState('');
  const [contenidoServidor, setContenidoServidor] = useState('');

  useEffect(() => {
    const coloresFondo = {
      1: '#c7c2c2',
      2: 'rgb(175, 63, 63)',
      3: 'rgb(157, 177, 170)',
      4: 'rgb(93, 129, 91)',
      5: 'rgb(132, 93, 7)',
    };

    document.body.style.backgroundColor = coloresFondo[opcion] || '#ffffff';
  }, [opcion]);

  const contenidos = {
    1: {
      titulo: "La Sangre",
      texto: `La sangre es un tejido líquido vital que circula por todo el cuerpo a través de los vasos sanguíneos. 
        Su función principal es transportar oxígeno, nutrientes, hormonas y desechos, además de participar en la defensa inmunológica y 
        la regulación de la temperatura corporal. Está compuesta por células (glóbulos rojos, blancos y plaquetas) suspendidas en un líquido
        llamado plasma`,
      imagen: "assets/blood.png",
      extra: "Más detalles sobre la sangre: transporta oxígeno, regula la temperatura y defiende el cuerpo. Está compuesta por plasma, glóbulos rojos, glóbulos blancos y plaquetas"
    },
    2: {
      titulo: "Glóbulos Rojos",
      texto: `Los glóbulos rojos, también llamados eritrocitos, son células en forma de disco que transportan oxígeno desde los pulmones 
        hacia los tejidos y dióxido de carbono de regreso para ser eliminado. Contienen hemoglobina, una proteína rica en hierro que les da su color 
        rojo característico y permite el transporte eficiente de gases.`,
      imagen: "assets/rbc.png",
      extra: `Los glóbulos rojos son las células más numerosas de la sangre, con unos 4.5 a 5.5 millones por microlitro en adultos sanos.
        Son células sin núcleo en su forma madura y tienen una vida media de aproximadamente 120 días. Su principal función es transportar
        oxígeno desde los pulmones hacia los tejidos, y dióxido de carbono de vuelta a los pulmones para ser exhalado. Esto lo logran gracias
        a la hemoglobina, una proteína que contiene hierro y le da a la sangre su color rojo.`
    },
    3: {
      titulo: "Glóbulos Blancos",
      texto: `Los glóbulos blancos o leucocitos son las células encargadas de defender al cuerpo contra infecciones, virus, bacterias y otros agentes extraños. 
        Existen varios tipos, como los neutrófilos, linfocitos y monocitos, y cada uno cumple funciones específicas en el sistema inmunológico. Aunque son menos 
        numerosos que los glóbulos rojos, son esenciales para mantener la salud`,
      imagen: "assets/wbc.png",
      extra: `Los glóbulos blancos forman parte del sistema inmunológico y representan menos del 1% del volumen total de sangre, 
          pero son fundamentales para la defensa del organismo. Se producen en la médula ósea y se dividen en dos grandes grupos: 
          Granulocitos: como los neutrófilos (primeros en responder a infecciones), eosinófilos (defienden contra parásitos) y basófilos (participan en reacciones alérgicas).
          Agranulocitos: linfocitos (B, T y NK, claves para la inmunidad adaptativa) y monocitos (que se convierten en macrófagos para "devorar" patógenos).`
    },
    4: {
      titulo: "Plaquetas",
      texto: `Las plaquetas, o trombocitos, son fragmentos celulares que intervienen en la coagulación de la sangre. Cuando ocurre una herida, se agrupan en el sitio del daño 
      y ayudan a formar un coágulo para detener el sangrado. Aunque son las células más pequeñas de la sangre, su función es crucial para evitar hemorragias excesivas`,
      imagen: "assets/plat.png",
      extra: `Las plaquetas no son células completas, sino fragmentos celulares producidos por unas células gigantes llamadas megacariocitos en la médula ósea.
        Tienen un tamaño muy pequeño y una vida útil de 7 a 10 días. Su función es vital en el proceso de hemostasia, es decir, en detener hemorragias:
        1) Se adhieren al sitio de la lesión. 2) Se activan y agregan para formar un tapón. 3)Liberan sustancias que ayudan a formar un coágulo estable junto
        con proteínas como el fibrinógeno. Un número anormalmente bajo de plaquetas puede causar moretones fáciles o sangrados excesivos.`
    },
    5: {
      titulo: "Plasma",
      texto: `El plasma es el componente líquido de la sangre, de color amarillento, que constituye alrededor del 55% de su volumen. Está formado principalmente por agua, 
        pero también contiene proteínas, sales minerales, hormonas, nutrientes y productos de desecho. Sirve como medio de transporte para las células sanguíneas y otras 
        sustancias vitales por todo el organismo`,
      imagen: "assets/plas.png",
      extra: `El plasma es el componente líquido de la sangre, de aspecto amarillento claro, compuesto en un 90-92% por agua. El resto está formado por:
        1) Proteínas plasmáticas: como la albúmina (regula la presión osmótica), globulinas (defensa inmunológica) y fibrinógeno (coagulación).
        2)Electrolitos: sodio, potasio, cloruro, etc. 3) Nutrientes: glucosa, lípidos, aminoácidos. 4) Hormonas y enzimas. 5) Productos de desecho: como urea o ácido úrico.
        El plasma actúa como medio de transporte para todas estas sustancias, y también ayuda a mantener el equilibrio hídrico del cuerpo.`
    }
  };

  const actual = contenidos[opcion];

    useEffect(() => {
      fetch(`http://localhost:3000/info/${contenidos[opcion].titulo.toLowerCase().replace(/\s+/g, '-')}`)
        .then(res => res.json())
        .then(data => setContenidoServidor(data.mensaje))
        .catch(() => setContenidoServidor('No se pudo obtener información del servidor.'));
    }, [opcion]);

  return (
    <div className="container">
      <div className="image-box">
        <img src={actual.imagen} alt="contenido" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
      </div>
      <div className="info-box">
        <nav className="tabs">
          {Object.keys(contenidos).map((key) => (
            <button
              key={key}
              onClick={() => setOpcion(Number(key))}
              className={opcion === Number(key) ? 'tab active' : 'tab'}
            >
              {contenidos[key].titulo}
            </button>
          ))}
        </nav>
        <div className="description">
          <h3>{actual.titulo}</h3>
          <p>{actual.texto}</p>
          <button className="ver-mas" onClick={() => { setModalTexto(actual.extra); setMostrar(true); }}>
            Ver más
          </button>
        </div>
      </div>
      {mostrar && <Modal texto={modalTexto} onClose={() => setMostrar(false)} />}
    </div>
  );
}

export default App; // src/components/Modal.jsx